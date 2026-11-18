/**
 * generate-preset-css.ts
 *
 * Reads the central preset registry from src/styles/presets-data/
 * and generates standalone CSS files in src/styles/presets/.
 *
 * Usage: bun scripts/generate-preset-css.ts
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { format as formatWithOxfmt } from 'oxfmt'

import { presetDefinitions } from '../src/styles/presets-data'
import { createPresetCSS } from '../src/styles/tokens/preset'

const OUT_DIR = join(import.meta.dir, '../src/styles/presets')
const CHECK_MODE = process.argv.includes('--check')
const formatterOptions = JSON.parse(
	readFileSync(join(import.meta.dir, '../.oxfmtrc.json'), 'utf-8'),
) as Record<string, unknown>

function generateCSS(preset: (typeof presetDefinitions)[number]): string {
	const header = `/* ============================================================================
   @leitware/composables - ${preset.label} Preset
   ============================================================================
   ${preset.description}

   HOW TO USE:
   1. Copy this file into your project's global CSS (e.g. index.css)
   2. Or import the preset: @import "@leitware/composables/presets/${preset.name}.css";
   3. Add class="dark" to <html> for dark mode.
   ============================================================================ */`

	const scope = `[data-preset="${preset.name}"]`
	const css = createPresetCSS(preset)
		.replace(':root {', `:root, ${scope} {`)
		.replace('.dark {', `.dark, ${scope}.dark, .dark ${scope} {`)
	return `${header}\n\n${css}`
}

// Ensure output directory exists
if (!CHECK_MODE) mkdirSync(OUT_DIR, { recursive: true })

let failed = false
const expectedFiles = new Set(presetDefinitions.map((preset) => `${preset.name}.css`))
const currentFiles = existsSync(OUT_DIR)
	? readdirSync(OUT_DIR).filter((file) => file.endsWith('.css'))
	: []

for (const file of currentFiles) {
	if (expectedFiles.has(file)) continue
	const stalePath = join(OUT_DIR, file)
	if (CHECK_MODE) {
		console.error(`  stale generated file ${stalePath}`)
		failed = true
		continue
	}
	rmSync(stalePath)
	console.log(`  removed stale ${stalePath}`)
}

for (const preset of presetDefinitions) {
	const outPath = join(OUT_DIR, `${preset.name}.css`)
	const formatted = await formatWithOxfmt(outPath, generateCSS(preset), formatterOptions)
	if (formatted.errors.length > 0) {
		for (const error of formatted.errors) console.error(error.message)
		failed = true
		continue
	}
	const css = formatted.code
	if (CHECK_MODE) {
		const current = existsSync(outPath) ? readFileSync(outPath, 'utf-8') : ''
		if (current !== css) {
			console.error(`  out of sync ${outPath}`)
			failed = true
		}
		continue
	}
	writeFileSync(outPath, css)
	console.log(`  wrote ${outPath}`)
}

if (CHECK_MODE) {
	if (failed) {
		console.error('\nFAIL: preset CSS is out of sync with presets-data.')
		console.error('Run: bun scripts/generate-preset-css.ts')
		process.exit(1)
	}
	console.log(`✓ ${presetDefinitions.length} preset CSS files are in sync with presets-data.`)
	process.exit(0)
}

if (failed) process.exit(1)

console.log(`\nDone - ${presetDefinitions.length} preset CSS files generated.`)
