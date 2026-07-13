/**
 * build-css.ts
 *
 * Compiles the design system CSS into a pre-built dist/styles.css that
 * downstream consumers can import without needing Tailwind installed.
 *
 * Also copies the optional Tailwind adapter and preset CSS files into dist/.
 *
 * Usage: bun scripts/build-css.ts
 */
import {
	copyFileSync,
	mkdirSync,
	mkdtempSync,
	readdirSync,
	renameSync,
	rmSync,
	statSync,
	writeFileSync,
} from 'node:fs'
import { basename, dirname, join } from 'node:path'
import { execSync } from 'node:child_process'

const ROOT = join(import.meta.dir, '..')
const DIST_DIR = join(ROOT, 'dist')
const PRESETS_SRC = join(ROOT, 'src/styles/presets')
const PRESETS_DIST = join(DIST_DIR, 'presets')
const TAILWIND_ADAPTER_SRC = join(ROOT, 'src/styles/tokens/tailwind-public-utilities.css')
const OUTPUT_FILE = join(DIST_DIR, 'styles.css')
const TAILWIND_ADAPTER_OUTPUT = join(DIST_DIR, 'tailwind.css')

console.log('Building CSS...\n')

// 1. Regenerate source-owned CSS so dist never bakes stale token output.
execSync('bun scripts/generate-css.ts', {
	cwd: ROOT,
	stdio: 'inherit',
	timeout: 60_000,
})
execSync('bun scripts/generate-preset-css.ts', {
	cwd: ROOT,
	stdio: 'inherit',
	timeout: 60_000,
})

// 2. Prepare stable output directories. Files are staged under unique names
// and atomically renamed, so concurrent builds never expose partial output.
mkdirSync(DIST_DIR, { recursive: true })
mkdirSync(PRESETS_DIST, { recursive: true })

const tempDir = mkdtempSync(join(ROOT, '.build-css-'))
const buildId = basename(tempDir)
const inputFile = join(tempDir, 'input.css')
const compiledOutput = join(tempDir, 'styles.css')
const stagedFiles = new Set<string>()
let phase = 'preparing the Tailwind input'

function publishFileAtomically(source: string, destination: string) {
	const staged = join(dirname(destination), `.${basename(destination)}.${buildId}.tmp`)
	stagedFiles.add(staged)
	copyFileSync(source, staged)
	renameSync(staged, destination)
	stagedFiles.delete(staged)
}

try {
	// The unique directory is a direct child of the repo, so package imports
	// still resolve through the repo's node_modules and source paths stay simple.
	const inputCSS = `@import 'tailwindcss';
@import 'tw-animate-css';
@import '../src/styles/composable.css';
@source "../src/**/*.{ts,tsx}";
`
	writeFileSync(inputFile, inputCSS)

	phase = 'Tailwind compilation'
	execSync(
		`npx @tailwindcss/cli -i ${JSON.stringify(inputFile)} -o ${JSON.stringify(compiledOutput)} --minify`,
		{
			cwd: ROOT,
			stdio: 'inherit',
			timeout: 60_000,
		},
	)

	phase = 'atomic stylesheet publication'
	publishFileAtomically(compiledOutput, OUTPUT_FILE)
	publishFileAtomically(TAILWIND_ADAPTER_SRC, TAILWIND_ADAPTER_OUTPUT)

	phase = 'atomic preset publication'
	const presetFiles = readdirSync(PRESETS_SRC).filter((file) => file.endsWith('.css'))
	const expectedPresets = new Set(presetFiles)
	for (const file of presetFiles) {
		publishFileAtomically(join(PRESETS_SRC, file), join(PRESETS_DIST, file))
	}
	for (const file of readdirSync(PRESETS_DIST)) {
		if (file.endsWith('.css') && !expectedPresets.has(file)) {
			rmSync(join(PRESETS_DIST, file), { force: true })
		}
	}

	const size = statSync(OUTPUT_FILE).size
	const sizeKB = (size / 1024).toFixed(1)
	console.log(`\n  dist/styles.css          ${sizeKB} KB`)
	console.log('  dist/tailwind.css        optional public Tailwind variants')
	console.log(`  dist/presets/            ${presetFiles.length} preset files copied`)
	console.log('\nDone.')
} catch (error) {
	console.error(`\nFAIL: CSS build failed during ${phase}.`)
	if (error instanceof Error && phase !== 'Tailwind compilation') {
		console.error(error.message)
	}
	process.exitCode = 1
} finally {
	for (const staged of stagedFiles) rmSync(staged, { force: true })
	rmSync(tempDir, { recursive: true, force: true })
}
