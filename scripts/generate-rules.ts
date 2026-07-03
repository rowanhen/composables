#!/usr/bin/env bun
/**
 * generate-rules.ts
 *
 * Builds an AI-facing markdown guide from the package metadata, README
 * component descriptions, and public barrel exports.
 *
 * Usage:
 *   bun scripts/generate-rules.ts
 *   bun scripts/generate-rules.ts --check
 */

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { basename, join } from 'node:path'
import { format as formatWithOxfmt } from 'oxfmt'

const ROOT = join(import.meta.dir, '..')
const README_PATH = join(ROOT, 'README.md')
const PACKAGE_PATH = join(ROOT, 'package.json')
const OXFMT_CONFIG_PATH = join(ROOT, '.oxfmtrc.json')
const ROOT_BARREL_PATH = join(ROOT, 'src/index.ts')
const AI_DIR = join(ROOT, 'src/opinionated/ai')
const OUT_DIR = join(ROOT, 'rules')
const OUT_FILE = join(OUT_DIR, 'composables.md')
const CHECK_MODE = process.argv.includes('--check')

type ExportList = {
	values: string[]
	types: string[]
}

type ComponentEntry = {
	category: string
	module: string
	description: string
}

type PackageJson = {
	name: string
	exports?: Record<string, string>
}

function uniqueSorted(values: string[]): string[] {
	return [...new Set(values)].sort((a, b) => a.localeCompare(b))
}

function escapeTableCell(value: string): string {
	return value.replace(/\|/g, '\\|').replace(/\s+/g, ' ').trim()
}

function formatCodeList(values: string[]): string {
	return values.length > 0 ? values.map((value) => `\`${value}\``).join(', ') : '-'
}

function addExport(
	exportsByPath: Map<string, ExportList>,
	path: string,
	name: string,
	typeOnly: boolean,
) {
	const entry = exportsByPath.get(path) ?? { values: [], types: [] }
	if (typeOnly) {
		entry.types.push(name)
	} else {
		entry.values.push(name)
	}
	exportsByPath.set(path, entry)
}

function parseExportName(rawName: string): { name: string; typeOnly: boolean } | null {
	let value = rawName.trim()
	if (!value) return null

	const typeOnly = value.startsWith('type ')
	value = value.replace(/^type\s+/, '').trim()
	value =
		value
			.split(/\s+as\s+/)
			.at(-1)
			?.trim() ?? value
	value = value.replace(/[{};]/g, '').trim()

	if (!value) return null
	return { name: value, typeOnly }
}

function parseNamedReExports(source: string): Map<string, ExportList> {
	const exportsByPath = new Map<string, ExportList>()
	const re = /export\s*{([\s\S]*?)}\s*from\s*['"](.+?)['"]/g
	let match: RegExpExecArray | null

	while ((match = re.exec(source))) {
		const [, exportBlock, path] = match
		for (const rawName of exportBlock.split(',')) {
			const parsed = parseExportName(rawName)
			if (parsed) addExport(exportsByPath, path, parsed.name, parsed.typeOnly)
		}
	}

	for (const [path, entry] of exportsByPath) {
		entry.values = uniqueSorted(entry.values)
		entry.types = uniqueSorted(entry.types)
		exportsByPath.set(path, entry)
	}

	return exportsByPath
}

function parseLocalExportBlock(source: string): ExportList {
	const result: ExportList = { values: [], types: [] }
	const re = /export\s*{([\s\S]*?)}(?:\s*from\s*['"].+?['"])?/g
	let match: RegExpExecArray | null

	while ((match = re.exec(source))) {
		const [, exportBlock] = match
		for (const rawName of exportBlock.split(',')) {
			const parsed = parseExportName(rawName)
			if (!parsed) continue
			if (parsed.typeOnly) result.types.push(parsed.name)
			else result.values.push(parsed.name)
		}
	}

	const declarationRe = /export\s+(?:const|function|class|interface|type)\s+([A-Za-z0-9_]+)/g
	while ((match = declarationRe.exec(source))) {
		const [, name] = match
		if (source.slice(match.index, match.index + 20).includes('type')) result.types.push(name)
		else if (source.slice(match.index, match.index + 25).includes('interface'))
			result.types.push(name)
		else result.values.push(name)
	}

	return {
		values: uniqueSorted(result.values),
		types: uniqueSorted(result.types),
	}
}

function extractSection(markdown: string, heading: string): string {
	const start = markdown.indexOf(`${heading}\n`)
	if (start === -1) return ''

	const bodyStart = start + heading.length + 1
	const rest = markdown.slice(bodyStart)
	const nextHeading = rest.search(/\n## /)
	const nextDivider = rest.search(/\n---\n/)
	const endCandidates = [nextHeading, nextDivider].filter((value) => value >= 0)
	const end = endCandidates.length > 0 ? Math.min(...endCandidates) : rest.length

	return rest.slice(0, end).trim()
}

function parseComponentEntries(readme: string): ComponentEntry[] {
	const section = extractSection(readme, '## Components')
	const entries: ComponentEntry[] = []
	let category = ''

	for (const line of section.split('\n')) {
		if (line.startsWith('### ')) {
			category = line.replace(/^###\s+/, '').trim()
			continue
		}

		const match = line.match(/^\|\s*`([^`]+)`\s*\|\s*(.*?)\s*\|$/)
		if (!match || !category) continue
		const [, module, description] = match
		entries.push({ category, module, description: description.trim() })
	}

	return entries
}

function parseOptionalDependencyRows(readme: string): string[] {
	const section = extractSection(readme, '## Optional Dependencies')
	return section
		.split('\n')
		.filter((line) => line.startsWith('|'))
		.map((line) => line.trim())
}

function moduleFromPath(path: string): string | null {
	if (path.startsWith('./opinionated/')) return path.replace('./opinionated/', '')
	if (path.startsWith('./hooks/')) return path.replace('./hooks/', '')
	if (path.startsWith('./lib/')) return path.replace('./lib/', '')
	return null
}

function sourcePathForModule(module: string): string {
	const special: Record<string, string> = {
		styles: './styles.css',
		utils: './lib/utils',
		'numeric-input': './lib/numeric-input',
		'use-mobile': './hooks/use-mobile',
		'use-numeric-input': './hooks/use-numeric-input',
	}

	return special[module] ?? `./opinionated/${module}`
}

function aiDescription(module: string): string {
	const descriptions: Record<string, string> = {
		attachments:
			'Attachment previews, metadata, removal controls, and helpers for file/source UI parts.',
		'chain-of-thought': 'Expandable reasoning step display for AI traces and search results.',
		'code-block':
			'AI code block primitives, syntax highlighting, copy controls, and language selectors.',
		confirmation:
			'Approval request, accepted, rejected, and action components for tool confirmations.',
		conversation:
			'Conversation container, empty state, scroll affordance, and markdown download helper.',
		'inline-citation':
			'Inline citation badges, hover cards, source carousel, quotes, and source metadata.',
		message:
			'User/assistant message bubbles, streamed markdown response content, actions, and branches.',
		plan: 'Collapsible plan card with title, description, action, content, footer, and trigger slots.',
		'prompt-input':
			'Composable prompt form, textarea, submit button, action menu, model select, and hooks.',
		reasoning: 'Collapsible reasoning disclosure with streaming state and duration display.',
		shimmer: 'Animated shimmer text for pending or streaming AI states.',
		sources: 'Collapsible source list with trigger, content region, and source links.',
		suggestion: 'Horizontal suggestion rail and individual prompt suggestion buttons.',
		task: 'Collapsible task and task item components for multi-step agent work.',
		tool: 'Tool invocation shell with status header, input payload, output payload, and error display.',
	}

	return descriptions[module] ?? 'AI component exports.'
}

function buildEntryRows(
	componentEntries: ComponentEntry[],
	rootExports: Map<string, ExportList>,
	packageName: string,
): Map<string, string[]> {
	const rowsByCategory = new Map<string, string[]>()

	for (const entry of componentEntries) {
		const sourcePath = sourcePathForModule(entry.module)
		const exports = rootExports.get(sourcePath)
		const values =
			entry.module === 'styles'
				? ['styles.css']
				: (exports?.values ?? (rootExports.has(sourcePath) ? [] : []))
		const types = exports?.types ?? []
		const importFrom = entry.module === 'styles' ? `${packageName}/styles.css` : packageName

		const row = [
			`| \`${entry.module}\``,
			` \`${sourcePath}\``,
			` \`${importFrom}\``,
			` ${formatCodeList(values)}`,
			` ${formatCodeList(types)}`,
			` ${escapeTableCell(entry.description)} |`,
		].join(' |')

		const rows = rowsByCategory.get(entry.category) ?? []
		rows.push(row)
		rowsByCategory.set(entry.category, rows)
	}

	const documentedPaths = new Set(
		componentEntries.map((entry) => sourcePathForModule(entry.module)),
	)
	const otherRows: string[] = []
	for (const [path, exports] of rootExports) {
		if (documentedPaths.has(path)) continue
		const module = moduleFromPath(path)
		if (!module) continue
		otherRows.push(
			[
				`| \`${module}\``,
				` \`${path}\``,
				` \`${packageName}\``,
				` ${formatCodeList(exports.values)}`,
				` ${formatCodeList(exports.types)}`,
				' Public export not listed in the README component catalog. |',
			].join(' |'),
		)
	}
	if (otherRows.length > 0) rowsByCategory.set('Other Public Exports', otherRows.sort())

	return rowsByCategory
}

function buildAiRows(): string[] {
	const rows: string[] = []
	const files = readdirSync(AI_DIR)
		.filter((file) => file.endsWith('.tsx') && file !== 'index.tsx')
		.sort()

	for (const file of files) {
		const module = basename(file, '.tsx')
		const source = readFileSync(join(AI_DIR, file), 'utf-8')
		const exports = parseLocalExportBlock(source)
		rows.push(
			[
				`| \`${module}\``,
				' `@leitware/composables-cli/ai`',
				` ${formatCodeList(exports.values)}`,
				` ${formatCodeList(exports.types)}`,
				` ${escapeTableCell(aiDescription(module))} |`,
			].join(' |'),
		)
	}

	return rows
}

function buildMarkdown(): string {
	const readme = readFileSync(README_PATH, 'utf-8')
	const packageJson = JSON.parse(readFileSync(PACKAGE_PATH, 'utf-8')) as PackageJson
	const rootExports = parseNamedReExports(readFileSync(ROOT_BARREL_PATH, 'utf-8'))
	const componentEntries = parseComponentEntries(readme)
	const optionalDependencyRows = parseOptionalDependencyRows(readme)
	const rowsByCategory = buildEntryRows(componentEntries, rootExports, packageJson.name)
	const packageExports = Object.entries(packageJson.exports ?? {})

	const lines: string[] = []
	lines.push(`# ${packageJson.name} AI Usage Rules`)
	lines.push('')
	lines.push('Generated by `bun scripts/generate-rules.ts`. Do not hand-edit this file.')
	lines.push('')
	lines.push('## Package Rules')
	lines.push('')
	lines.push(`- Install with \`npm install ${packageJson.name}\`.`)
	lines.push(`- Import normal components, hooks, and utilities from \`${packageJson.name}\`.`)
	lines.push(`- Import AI components from \`${packageJson.name}/ai\`.`)
	lines.push(
		`- Import \`${packageJson.name}/styles.css\` once in root/global CSS before using components.`,
	)
	lines.push(
		`- Import at most one preset after the base styles, for example \`${packageJson.name}/presets/brutalist.css\`.`,
	)
	lines.push(
		'- Prefer `Form*` components when building labeled fields with description, validation, or error text.',
	)
	lines.push(
		'- Prefer array APIs where provided, such as `Tabs`, `Breadcrumb`, `Pagination`, `Accordion`, `Carousel`, and form selects.',
	)
	lines.push(
		'- Do not import from `src/_internal` or package-internal file paths in downstream apps.',
	)
	lines.push(
		'- Use semantic token utilities such as `bg-surface-*`, `text-*`, `border-*`, `stroke-*`, and `icon-*` rather than arbitrary colors.',
	)
	lines.push('- Use `cn` from the package when composing class names.')
	lines.push('')
	lines.push('## Required CSS')
	lines.push('')
	lines.push('```css')
	lines.push(`@import '${packageJson.name}/styles.css';`)
	lines.push('')
	lines.push('/* Optional: apply exactly one preset after the base styles. */')
	lines.push(`@import '${packageJson.name}/presets/brutalist.css';`)
	lines.push('```')
	lines.push('')
	lines.push('## Entrypoints')
	lines.push('')
	lines.push('| Import | Source |')
	lines.push('| --- | --- |')
	for (const [entrypoint, target] of packageExports) {
		const importPath =
			entrypoint === '.'
				? packageJson.name
				: `${packageJson.name}/${entrypoint.replace(/^\.\//, '')}`
		lines.push(`| \`${importPath}\` | \`${target}\` |`)
	}
	lines.push('')
	lines.push('## Optional Dependencies')
	lines.push('')
	if (optionalDependencyRows.length > 0) {
		lines.push(...optionalDependencyRows)
	} else {
		lines.push('See `README.md` for optional dependency requirements.')
	}
	lines.push('')
	lines.push('## Component Catalog')
	lines.push('')
	lines.push(
		'Use this catalog to choose public exports. The `Source module` column is for maintainers; downstream apps should import from the package entrypoint.',
	)
	lines.push('')

	for (const [category, rows] of rowsByCategory) {
		lines.push(`### ${category}`)
		lines.push('')
		lines.push(
			'| Module | Source module | Import from | Public values | Public types | Description |',
		)
		lines.push('| --- | --- | --- | --- | --- | --- |')
		lines.push(...rows)
		lines.push('')
	}

	lines.push('## AI Entrypoint Catalog')
	lines.push('')
	lines.push(
		'AI exports are prefixed with `AI` where they wrap shared primitives. Import these from `@leitware/composables-cli/ai`.',
	)
	lines.push('')
	lines.push('| Module | Import from | Public values | Public types | Description |')
	lines.push('| --- | --- | --- | --- | --- |')
	lines.push(...buildAiRows())
	lines.push('')
	lines.push('## Useful Examples')
	lines.push('')
	lines.push('```tsx')
	lines.push(`import { Button, Card, FormInput, Tabs, TabsContent } from '${packageJson.name}'`)
	lines.push(
		`import { AIMessage, AIMessageContent, AIMessageResponse, AIPromptInput } from '${packageJson.name}/ai'`,
	)
	lines.push('')
	lines.push('<Button variant="outline" size="sm">Cancel</Button>')
	lines.push('')
	lines.push('<Card title="Settings" description="Profile details">')
	lines.push('  <FormInput label="Name" error={errors.name?.message} required />')
	lines.push('</Card>')
	lines.push('')
	lines.push('<Tabs')
	lines.push('  items={[')
	lines.push("    { value: 'overview', label: 'Overview' },")
	lines.push("    { value: 'settings', label: 'Settings' },")
	lines.push('  ]}')
	lines.push('  value={tab}')
	lines.push('  onValueChange={setTab}')
	lines.push('/>')
	lines.push('<TabsContent value="overview">Overview content</TabsContent>')
	lines.push('')
	lines.push('<AIMessage from="assistant">')
	lines.push('  <AIMessageContent>')
	lines.push('    <AIMessageResponse>{message}</AIMessageResponse>')
	lines.push('  </AIMessageContent>')
	lines.push('</AIMessage>')
	lines.push('')
	lines.push('<AIPromptInput onSubmit={handleSubmit} />')
	lines.push('```')
	lines.push('')

	return `${lines.join('\n')}\n`
}

const oxfmtOptions = JSON.parse(readFileSync(OXFMT_CONFIG_PATH, 'utf-8')) as Record<string, unknown>
const formatResult = await formatWithOxfmt(OUT_FILE, buildMarkdown(), oxfmtOptions)
if (formatResult.errors.length > 0) {
	console.error('FAIL: oxfmt could not format rules/composables.md.')
	for (const error of formatResult.errors) console.error(error.message)
	process.exit(1)
}

const result = formatResult.code
const current = existsSync(OUT_FILE) ? readFileSync(OUT_FILE, 'utf-8') : ''

if (CHECK_MODE) {
	if (current !== result) {
		console.error('FAIL: rules/composables.md is out of sync.')
		console.error('Run: bun scripts/generate-rules.ts')
		process.exit(1)
	}

	console.log('OK: rules/composables.md is in sync.')
	process.exit(0)
}

mkdirSync(OUT_DIR, { recursive: true })
writeFileSync(OUT_FILE, result, 'utf-8')
console.log(`Generated ${OUT_FILE}`)
