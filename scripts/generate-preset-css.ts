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
import { editorial, editorialDark } from '../src/styles/presets-data/editorial'
import { soft, softDark } from '../src/styles/presets-data/soft'
import { swiss, swissDark } from '../src/styles/presets-data/swiss'
import { midnight, midnightDark } from '../src/styles/presets-data/midnight'
import { retro, retroDark } from '../src/styles/presets-data/retro'
import { vapor, vaporDark } from '../src/styles/presets-data/vapor'
import { nature, natureDark } from '../src/styles/presets-data/nature'

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
	{
		fileName: 'editorial',
		displayName: 'Editorial',
		description: 'Sophisticated editorial/magazine aesthetic. Warm, refined, unhurried.',
		light: editorial,
		dark: editorialDark,
	},
	{
		fileName: 'soft',
		displayName: 'Soft',
		description: 'Warm, approachable, rounded. Modern SaaS at its most inviting.',
		light: soft,
		dark: softDark,
	},
	{
		fileName: 'swiss',
		displayName: 'Swiss',
		description:
			'International Typographic Style. Absolute grid discipline, zero radius, zero shadow.',
		light: swiss,
		dark: swissDark,
	},
	{
		fileName: 'midnight',
		displayName: 'Midnight',
		description:
			'Dark-first premium theme. Deep blue-black backgrounds with an electric indigo accent.',
		light: midnight,
		dark: midnightDark,
	},
	{
		fileName: 'retro',
		displayName: 'Retro',
		description:
			'Warm CRT nostalgia. Amber phosphor glow, monospace everything, terminal-inspired.',
		light: retro,
		dark: retroDark,
	},
	{
		fileName: 'vapor',
		displayName: 'Vapor',
		description: 'Dreamy vaporwave. Neon pink meets cool cyan on deep purple-black.',
		light: vapor,
		dark: vaporDark,
	},
	{
		fileName: 'nature',
		displayName: 'Nature',
		description:
			'Organic and earthy. Warm greens, rich browns, serif typography, forest-cabin warmth.',
		light: nature,
		dark: natureDark,
	},
]

function tokensToCSS(tokens: Record<string, string>, indent: string): string {
	return Object.entries(tokens)
		.map(([key, value]) => `${indent}${key}: ${value};`)
		.join('\n')
}

function generateCSS(preset: PresetDef): string {
	const header = `/* ============================================================================
   @leitware/composables — ${preset.displayName} Preset
   ============================================================================
   ${preset.description}

   HOW TO USE:
   1. Copy this file into your project's global CSS (e.g. index.css)
   2. Or import from the styles directory: @import "src/styles/presets/${preset.fileName}.css";
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
