#!/usr/bin/env bun
/**
 * Publish the next npm package version from Conventional Commits.
 *
 * The latest published npm version is the source of truth. We analyze commits
 * since its release tag, falling back to npm's recorded gitHead when the tag is
 * missing, then publish the computed next version and create a release tag.
 */

import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

type ReleaseType = 'patch' | 'minor' | 'major'

const ROOT = dirname(dirname(import.meta.path))
const DRY_RUN = process.argv.includes('--dry-run')
const RELEASE_ORDER: Record<ReleaseType, number> = {
	patch: 0,
	minor: 1,
	major: 2,
}

function run(
	command: string,
	args: string[],
	options: { allowFailure?: boolean; quiet?: boolean } = {},
) {
	const result = spawnSync(command, args, {
		cwd: ROOT,
		encoding: 'utf-8',
		env: process.env,
		stdio: options.quiet ? 'pipe' : 'inherit',
	})

	if (!options.allowFailure && result.status !== 0) {
		throw new Error(`${command} ${args.join(' ')} failed with exit code ${result.status}`)
	}

	return result
}

function read(command: string, args: string[], options: { allowFailure?: boolean } = {}) {
	const result = run(command, args, { ...options, quiet: true })
	return {
		ok: result.status === 0,
		stdout: result.stdout.trim(),
		stderr: result.stderr.trim(),
	}
}

function parseJson<T>(value: string): T {
	return JSON.parse(value) as T
}

function maxReleaseType(current: ReleaseType | undefined, next: ReleaseType) {
	if (!current) return next
	return RELEASE_ORDER[next] > RELEASE_ORDER[current] ? next : current
}

function releaseTypeForCommit(message: string): ReleaseType | undefined {
	const [subject = ''] = message.split('\n')
	const header = subject.match(/^[a-z]+(?:\([^)]+\))?(!)?:\s+/)
	const type = subject.match(/^([a-z]+)(?:\([^)]+\))?(!)?:\s+/)?.[1]
	const isBreaking = Boolean(header?.[1]) || /^BREAKING(?:-| )CHANGE:\s+/m.test(message)

	if (isBreaking) return 'major'
	if (type === 'feat') return 'minor'
	if (type === 'fix' || type === 'perf') return 'patch'

	return undefined
}

function incrementVersion(version: string, releaseType: ReleaseType) {
	const match = version.match(/^(\d+)\.(\d+)\.(\d+)$/)
	if (!match) {
		throw new Error(`Unsupported published version format: ${version}`)
	}

	const [, majorRaw, minorRaw, patchRaw] = match
	let major = Number(majorRaw)
	let minor = Number(minorRaw)
	let patch = Number(patchRaw)

	if (releaseType === 'major') {
		major += 1
		minor = 0
		patch = 0
	} else if (releaseType === 'minor') {
		minor += 1
		patch = 0
	} else {
		patch += 1
	}

	return `${major}.${minor}.${patch}`
}

function tagCommit(version: string) {
	const result = read(
		'git',
		['rev-parse', '--verify', '--quiet', `refs/tags/v${version}^{commit}`],
		{
			allowFailure: true,
		},
	)
	return result.ok && result.stdout ? result.stdout : undefined
}

function npmViewJson<T>(specifier: string, field: string) {
	const result = read('npm', ['view', specifier, field, '--json'], { allowFailure: true })
	if (!result.ok || !result.stdout) return undefined
	return parseJson<T>(result.stdout)
}

const packageJsonPath = join(ROOT, 'package.json')
const packageJson = parseJson<{ name: string; version: string }>(
	readFileSync(packageJsonPath, 'utf-8'),
)
const publishedVersion = npmViewJson<string>(packageJson.name, 'version') ?? packageJson.version
const publishedGitHead = npmViewJson<string>(`${packageJson.name}@${publishedVersion}`, 'gitHead')
const baseCommit = tagCommit(publishedVersion) ?? publishedGitHead

if (!baseCommit) {
	throw new Error(`Could not find a release baseline for ${packageJson.name}@${publishedVersion}`)
}

const ancestor = read('git', ['merge-base', '--is-ancestor', baseCommit, 'HEAD'], {
	allowFailure: true,
})

if (!ancestor.ok) {
	throw new Error(`Release baseline ${baseCommit} is not an ancestor of HEAD`)
}

const logRange = `${baseCommit}..HEAD`
const log = read('git', ['log', '--format=%B%x1e', logRange])
const commitMessages = log.stdout
	.split('\x1e')
	.map((message) => message.trim())
	.filter(Boolean)

let releaseType: ReleaseType | undefined

for (const message of commitMessages) {
	const commitReleaseType = releaseTypeForCommit(message)
	if (commitReleaseType) {
		releaseType = maxReleaseType(releaseType, commitReleaseType)
	}
}

if (!releaseType) {
	console.log(`No releasable Conventional Commits found in ${logRange}. Skipping npm publish.`)
	process.exit(0)
}

const nextVersion = incrementVersion(publishedVersion, releaseType)
const existingNextVersion = npmViewJson<string>(`${packageJson.name}@${nextVersion}`, 'version')

if (existingNextVersion) {
	console.log(`${packageJson.name}@${nextVersion} is already published. Skipping npm publish.`)
	process.exit(0)
}

console.log(`Release baseline: ${packageJson.name}@${publishedVersion} (${baseCommit})`)
console.log(`Detected ${releaseType} release from ${commitMessages.length} commit(s).`)
console.log(`Next version: ${nextVersion}`)

if (DRY_RUN) {
	console.log('Dry run complete. No package was published.')
	process.exit(0)
}

run('npm', ['version', nextVersion, '--no-git-tag-version'])
run('npm', ['publish', '--access', 'public', '--provenance'])

if (!tagCommit(nextVersion)) {
	run('git', ['tag', `v${nextVersion}`])
	run('git', ['push', 'origin', `refs/tags/v${nextVersion}`])
}

console.log(`Published ${packageJson.name}@${nextVersion}.`)
