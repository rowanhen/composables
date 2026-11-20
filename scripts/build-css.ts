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
	readFileSync,
	statSync,
	writeFileSync,
} from 'node:fs'
import { basename, dirname, join } from 'node:path'
import { execFileSync } from 'node:child_process'
import { semanticUtilities } from '../src/styles/theme'

const ROOT = join(import.meta.dir, '..')
const DIST_DIR = join(ROOT, 'dist')
const PRESETS_SRC = join(ROOT, 'src/styles/presets')
const PRESETS_DIST = join(DIST_DIR, 'presets')
const TAILWIND_ADAPTER_SRC = join(ROOT, 'src/styles/tailwind.css')
const OUTPUT_FILE = join(DIST_DIR, 'styles.css')
const TAILWIND_ADAPTER_OUTPUT = join(DIST_DIR, 'tailwind.css')

console.log('Building CSS...\n')

// Stage writes before replacing the package files.
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
	const publicClasses = semanticUtilities(readFileSync(TAILWIND_ADAPTER_SRC, 'utf8'))
		.map(({ name }) => name)
		.join(' ')
	const inputCSS = `@import 'tailwindcss';
@import 'tw-animate-css';
@import '../src/styles/composable.css';
@source "../src/**/*.{ts,tsx}";
@source inline("${publicClasses}");
`
	writeFileSync(inputFile, inputCSS)

	phase = 'Tailwind compilation'
	execFileSync(
		'bunx',
		['--no-install', 'tailwindcss', '-i', inputFile, '-o', compiledOutput, '--minify'],
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
