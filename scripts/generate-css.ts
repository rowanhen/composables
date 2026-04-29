#!/usr/bin/env bun
/**
 * generate-css.ts
 *
 * Reads palette.ts and regenerates tokens/palette.css with:
 *   1. @theme inline  — build-time values for Tailwind utility generation
 *   2. :root           — runtime CSS custom properties (light mode)
 *   3. .dark           — runtime CSS custom properties (dark mode)
 *
 * semantic.css is NOT touched — it contains only semantic token mappings.
 *
 * Usage:
 *   bun scripts/generate-css.ts           # overwrites palette.css in-place
 *   bun scripts/generate-css.ts --check   # exits non-zero if file would change
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import {
	palettes,
	darkPalettes,
	steps,
	baseColors,
	darkBaseColors,
	overlaysBlackAlpha,
	darkOverlaysBlackAlpha,
} from './palette.ts'
import type { PaletteScale, Step } from './palette.ts'

const ROOT = dirname(dirname(import.meta.path))
const TOKENS_DIR = join(ROOT, 'src/styles/tokens')
const PALETTE_CSS_PATH = join(TOKENS_DIR, 'palette.css')
const CHECK_MODE = process.argv.includes('--check')

/* ── Helpers ─────────────────────────────────────────────────────────── */

function generatePaletteLines(
	scales: PaletteScale[],
	base: { white: string; black: string },
	overlays: Record<Step, string>,
	indent: string,
): string[] {
	const lines: string[] = []

	for (const palette of scales) {
		for (const step of steps) {
			lines.push(`${indent}--${palette.name}-${step}: ${palette.solid[step].toLowerCase()};`)
		}
		for (const step of steps) {
			lines.push(`${indent}--${palette.name}-alpha-${step}: ${palette.alpha[step].toLowerCase()};`)
		}
	}

	lines.push(`${indent}--base-white: ${base.white.toLowerCase()};`)
	lines.push(`${indent}--base-black: ${base.black.toLowerCase()};`)

	for (const step of steps) {
		const val = overlays[step]
		if (val) lines.push(`${indent}--overlays-black-alpha-${step}: ${val.toLowerCase()};`)
	}

	return lines
}

/* ── Generate full palette.css ───────────────────────────────────────── */

function generatePaletteCSS(): string {
	const lightLines = generatePaletteLines(palettes, baseColors, overlaysBlackAlpha, '\t')
	const darkLines = generatePaletteLines(darkPalettes, darkBaseColors, darkOverlaysBlackAlpha, '\t')

	return `/* ============================================================================
   Primitive Color Palette
   ============================================================================
   Raw color values from a fixed scale. 10 families × 12 stops (50–1000)
   plus alpha variants, base colors, and overlay alphas.

   This file serves TWO purposes from the same data:

   1. @theme inline  — Resolved at BUILD TIME by Tailwind so it can generate
      utility classes (e.g. bg-blue-800, text-neutral-950). These values are
      baked into the compiled CSS and cannot change at runtime.

   2. :root / .dark  — Standard CSS custom properties available at RUNTIME.
      These power var(--blue-800) references in component code and can be
      swapped by presets or dark mode.

   Both sections are generated from the same source of truth:
     scripts/palette.ts → scripts/generate-css.ts

   To regenerate:  bun scripts/generate-css.ts
   ============================================================================ */

/* ── Build-time: Tailwind utility class generation ────────────────────── */
@theme inline {
${lightLines.join('\n')}
}

/* ── Runtime: CSS custom properties (light) ───────────────────────────── */
:root {
${lightLines.join('\n')}
}

/* ── Runtime: CSS custom properties (dark) ────────────────────────────── */
.dark {
${darkLines.join('\n')}
}
`
}

/* ── Main ─────────────────────────────────────────────────────────────── */

const original = readFileSync(PALETTE_CSS_PATH, 'utf-8')
const result = generatePaletteCSS()

if (CHECK_MODE) {
	if (result !== original) {
		console.error('✗ tokens/palette.css is out of sync with palette.ts')
		console.error('  Run: bun scripts/generate-css.ts')
		process.exit(1)
	}
	console.log('✓ tokens/palette.css is in sync with palette.ts')
	process.exit(0)
}

writeFileSync(PALETTE_CSS_PATH, result, 'utf-8')
console.log('✓ Regenerated tokens/palette.css from palette.ts')
