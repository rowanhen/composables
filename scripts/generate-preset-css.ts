/**
 * generate-preset-css.ts
 *
 * Reads the TypeScript preset source files from showcase/src/presets/
 * and generates standalone CSS files in src/styles/presets/.
 *
 * Usage: bun scripts/generate-preset-css.ts
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { defaultPreset, defaultPresetDark } from '../src/styles/presets-data/default'
import { brutalist, brutalistDark } from '../src/styles/presets-data/brutalist'

const OUT_DIR = join(import.meta.dir, '../src/styles/presets')

interface PresetDef {
	fileName: string
	displayName: string
	description: string
	light: Record<string, string>
	dark: Record<string, string>
}

const presets: PresetDef[] = [
	{
		fileName: 'default',
		displayName: 'Default',
		description: 'Clean, neutral, Inter-based. The "no opinion" starting point.',
		light: defaultPreset,
		dark: defaultPresetDark,
	},
	{
		fileName: 'brutalist',
		displayName: 'Brutalist',
		description:
			'Raw, architectural, uncompromising. Structural honesty: things look exactly like what they are.',
		light: brutalist,
		dark: brutalistDark,
	},
]

function tokensToCSS(tokens: Record<string, string>, indent: string): string {
	return Object.entries(tokens)
		.map(([key, value]) => `${indent}${key}: ${value};`)
		.join('\n')
}

function generateCSS(preset: PresetDef): string {
	const header = `/* ============================================================================
   @leitware/composables-cli — ${preset.displayName} Preset
   ============================================================================
   ${preset.description}

   HOW TO USE:
   1. Copy this file into your project's global CSS (e.g. index.css)
   2. Or import the preset: @import "@leitware/composables-cli/presets/${preset.fileName}.css";
   3. Add class="dark" to <html> for dark mode.
   ============================================================================ */`

	const rootBlock = `:root {\n${tokensToCSS(preset.light, '\t')}\n}`
	const darkBlock = `.dark {\n${tokensToCSS(preset.dark, '\t')}\n}`

	return `${header}\n\n${rootBlock}\n\n${darkBlock}\n`
}

// Ensure output directory exists
mkdirSync(OUT_DIR, { recursive: true })

for (const preset of presets) {
	const css = generateCSS(preset)
	const outPath = join(OUT_DIR, `${preset.fileName}.css`)
	writeFileSync(outPath, css)
	console.log(`  wrote ${outPath}`)
}

console.log(`\nDone — ${presets.length} preset CSS files generated.`)
