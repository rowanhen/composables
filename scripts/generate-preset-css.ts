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

import { presetDefinitions } from '../src/styles/presets-data'
import { shadcnCompatAliases } from '../src/styles/tokens/registry'

const OUT_DIR = join(import.meta.dir, '../src/styles/presets')
const CHECK_MODE = process.argv.includes('--check')

function tokensToCSS(tokens: Record<string, string>, indent: string): string {
	return Object.entries(tokens)
		.map(([key, value]) => `${indent}${key}: ${normalizeTokenValue(value)};`)
		.join('\n')
}

function normalizeTokenValue(value: string): string {
	return value
		.replace(/#[0-9a-fA-F]{3,8}/g, (hex) => hex.toLowerCase())
		.replace(/"([^"]+)"/g, "'$1'")
}

function generateCSS(preset: (typeof presetDefinitions)[number]): string {
	const header = `/* ============================================================================
   @leitware/composables — ${preset.label} Preset
   ============================================================================
   ${preset.description}

   HOW TO USE:
   1. Copy this file into your project's global CSS (e.g. index.css)
   2. Or import the preset: @import "@leitware/composables/presets/${preset.name}.css";
   3. Add class="dark" to <html> for dark mode.
   ============================================================================ */`

	const aliases = Object.fromEntries(
		shadcnCompatAliases.map(({ cssVar, target }) => [cssVar, `var(${target})`]),
	)
	const rootBlock = `:root {\n${tokensToCSS({ ...preset.light, ...aliases }, '\t')}\n}`
	const darkBlock = `.dark {\n${tokensToCSS({ ...preset.dark, ...aliases }, '\t')}\n}`

	return `${header}\n\n${rootBlock}\n\n${darkBlock}\n`
}

// Ensure output directory exists
mkdirSync(OUT_DIR, { recursive: true })

let failed = false
const expectedFiles = new Set(presetDefinitions.map((preset) => `${preset.name}.css`))
const currentFiles = readdirSync(OUT_DIR).filter((file) => file.endsWith('.css'))

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
	const css = generateCSS(preset)
	const outPath = join(OUT_DIR, `${preset.name}.css`)
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

console.log(`\nDone — ${presetDefinitions.length} preset CSS files generated.`)
