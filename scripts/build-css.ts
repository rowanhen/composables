/**
 * build-css.ts
 *
 * Compiles the design system CSS into a pre-built dist/styles.css that
 * downstream consumers can import without needing Tailwind installed.
 *
 * Also copies preset CSS files into dist/presets/.
 *
 * Usage: bun scripts/build-css.ts
 */
import { mkdirSync, writeFileSync, rmSync, readdirSync, copyFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { execSync } from 'node:child_process'

const ROOT = join(import.meta.dir, '..')
const DIST_DIR = join(ROOT, 'dist')
const PRESETS_SRC = join(ROOT, 'src/styles/presets')
const PRESETS_DIST = join(DIST_DIR, 'presets')
const INPUT_FILE = join(ROOT, '.build-css-input.css')
const OUTPUT_FILE = join(DIST_DIR, 'styles.css')

// Temporary input CSS — adds Tailwind, animation lib, and source scanning
// around our token/theme CSS so the CLI can compile everything.
const inputCSS = `@import 'tailwindcss';
@import 'tw-animate-css';
@import './src/styles/composable.css';
@source "./src/**/*.{ts,tsx}";
`

console.log('Building CSS...\n')

// 1. Prepare directories
mkdirSync(DIST_DIR, { recursive: true })
mkdirSync(PRESETS_DIST, { recursive: true })

// 2. Write temp input file
writeFileSync(INPUT_FILE, inputCSS)

// 3. Compile with Tailwind CLI
try {
	execSync(`npx @tailwindcss/cli -i ${INPUT_FILE} -o ${OUTPUT_FILE} --minify`, {
		cwd: ROOT,
		stdio: 'inherit',
		timeout: 60_000,
	})
} catch {
	rmSync(INPUT_FILE, { force: true })
	console.error('\nFAIL: Tailwind CSS compilation failed.')
	process.exit(1)
}

// 4. Clean up temp input
rmSync(INPUT_FILE, { force: true })

// 5. Copy preset files
const presetFiles = readdirSync(PRESETS_SRC).filter((f) => f.endsWith('.css'))
for (const file of presetFiles) {
	copyFileSync(join(PRESETS_SRC, file), join(PRESETS_DIST, file))
}

// 6. Report
const size = statSync(OUTPUT_FILE).size
const sizeKB = (size / 1024).toFixed(1)
console.log(`\n  dist/styles.css          ${sizeKB} KB`)
console.log(`  dist/presets/            ${presetFiles.length} preset files copied`)
console.log('\nDone.')
