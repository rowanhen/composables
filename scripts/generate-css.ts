#!/usr/bin/env bun
/**
 * generate-css.ts
 *
 * Reads palette.ts and regenerates the colour sections of the token CSS files.
 * Only the palette colours within `@theme inline { ... }` (palette.css) and the
 * `:root { ... }` / `.dark { ... }` blocks (semantic.css) are affected;
 * non-colour content is preserved.
 *
 * Usage:
 *   bun scripts/generate-css.ts           # overwrites token files in-place
 *   bun scripts/generate-css.ts --check   # exits non-zero if files would change
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { palettes, steps, baseColors, overlaysBlackAlpha } from './palette.ts'

const ROOT = dirname(dirname(import.meta.path))
const TOKENS_DIR = join(ROOT, 'src/styles/tokens')
const PALETTE_CSS_PATH = join(TOKENS_DIR, 'palette.css')
const SEMANTIC_CSS_PATH = join(TOKENS_DIR, 'semantic.css')
const CHECK_MODE = process.argv.includes('--check')

/* ── Generate @theme inline palette block ─────────────────────────── */

function generateThemePaletteLines(): string[] {
	const lines: string[] = []

	for (const palette of palettes) {
		// Solid scale
		for (const step of steps) {
			lines.push(`  --${palette.name}-${step}: ${palette.solid[step]};`)
		}
		// Alpha scale
		for (const step of steps) {
			lines.push(`  --${palette.name}-alpha-${step}: ${palette.alpha[step]};`)
		}
	}

	// Base colours
	lines.push(`  --base-white: ${baseColors.white};`)
	lines.push(`  --base-black: ${baseColors.black};`)

	// Overlays
	for (const step of steps) {
		const val = overlaysBlackAlpha[step]
		if (val) lines.push(`  --overlays-black-alpha-${step}: ${val};`)
	}

	return lines
}

/* ── Replace palette section in @theme inline ─────────────────────── */

function replacePaletteInTheme(css: string): string {
	const newPaletteLines = generateThemePaletteLines()

	// Find the first @theme inline block and replace palette lines within it
	const themeStart = css.indexOf('@theme inline {')
	if (themeStart === -1) {
		console.error("Could not find '@theme inline {' in CSS")
		process.exit(1)
	}

	// Find the closing brace for this theme block
	let braceCount = 0
	let themeEnd = -1
	for (let i = themeStart; i < css.length; i++) {
		if (css[i] === '{') braceCount++
		if (css[i] === '}') {
			braceCount--
			if (braceCount === 0) {
				themeEnd = i
				break
			}
		}
	}

	if (themeEnd === -1) {
		console.error('Could not find closing brace for @theme inline')
		process.exit(1)
	}

	const themeContent = css.substring(themeStart, themeEnd + 1)
	const lines = themeContent.split('\n')

	// Identify which lines are palette colour lines (to be replaced)
	const paletteNames = palettes.map((p) => p.name)
	const palettePattern = new RegExp(
		`^\\s+--(${paletteNames.join('|')})-(?:alpha-)?\\d+:|^\\s+--base-(white|black):|^\\s+--overlays-black-alpha-\\d+:`,
	)

	// Find first and last palette line indices
	let firstPaletteIdx = -1
	let lastPaletteIdx = -1
	for (let i = 0; i < lines.length; i++) {
		if (palettePattern.test(lines[i])) {
			if (firstPaletteIdx === -1) firstPaletteIdx = i
			lastPaletteIdx = i
		}
	}

	if (firstPaletteIdx === -1) {
		console.error('Could not find palette lines in @theme inline block')
		process.exit(1)
	}

	// Replace palette lines
	const before = lines.slice(0, firstPaletteIdx)
	const after = lines.slice(lastPaletteIdx + 1)
	const newThemeContent = [...before, ...newPaletteLines, ...after].join('\n')

	return css.substring(0, themeStart) + newThemeContent + css.substring(themeEnd + 1)
}

/* ── Replace palette section in :root ─────────────────────────────── */

function replacePaletteInRoot(css: string): string {
	const newPaletteLines = generateThemePaletteLines()

	// Find :root {
	const rootStart = css.indexOf(':root {')
	if (rootStart === -1) return css

	let braceCount = 0
	let rootEnd = -1
	for (let i = rootStart; i < css.length; i++) {
		if (css[i] === '{') braceCount++
		if (css[i] === '}') {
			braceCount--
			if (braceCount === 0) {
				rootEnd = i
				break
			}
		}
	}

	if (rootEnd === -1) return css

	const rootContent = css.substring(rootStart, rootEnd + 1)
	const lines = rootContent.split('\n')

	const paletteNames = palettes.map((p) => p.name)
	const palettePattern = new RegExp(
		`^\\s+--(${paletteNames.join('|')})-(?:alpha-)?\\d+:|^\\s+--base-(white|black):|^\\s+--overlays-black-alpha-\\d+:`,
	)

	let firstPaletteIdx = -1
	let lastPaletteIdx = -1
	for (let i = 0; i < lines.length; i++) {
		if (palettePattern.test(lines[i])) {
			if (firstPaletteIdx === -1) firstPaletteIdx = i
			lastPaletteIdx = i
		}
	}

	if (firstPaletteIdx === -1) return css

	const before = lines.slice(0, firstPaletteIdx)
	const after = lines.slice(lastPaletteIdx + 1)
	const newRootContent = [...before, ...newPaletteLines, ...after].join('\n')

	return css.substring(0, rootStart) + newRootContent + css.substring(rootEnd + 1)
}

/* ── Main ─────────────────────────────────────────────────────────── */

const originalPalette = readFileSync(PALETTE_CSS_PATH, 'utf-8')
const originalSemantic = readFileSync(SEMANTIC_CSS_PATH, 'utf-8')

const resultPalette = replacePaletteInTheme(originalPalette)
const resultSemantic = replacePaletteInRoot(originalSemantic)

if (CHECK_MODE) {
	const paletteChanged = resultPalette !== originalPalette
	const semanticChanged = resultSemantic !== originalSemantic
	if (paletteChanged || semanticChanged) {
		console.error('✗ CSS token files are out of sync with palette.ts')
		if (paletteChanged) console.error('  - tokens/palette.css needs updating')
		if (semanticChanged) console.error('  - tokens/semantic.css needs updating')
		console.error('  Run: bun scripts/generate-css.ts')
		process.exit(1)
	}
	console.log('✓ CSS token files are in sync with palette.ts')
	process.exit(0)
}

writeFileSync(PALETTE_CSS_PATH, resultPalette, 'utf-8')
writeFileSync(SEMANTIC_CSS_PATH, resultSemantic, 'utf-8')
console.log(
	'✓ Regenerated colour sections in tokens/palette.css and tokens/semantic.css from palette.ts',
)
