#!/usr/bin/env bun
/**
 * generate-css.ts
 *
 * Regenerates the CSS outputs owned by the token registry:
 *   1. @theme inline  — build-time values for Tailwind utility generation
 *   2. :root           — runtime CSS custom properties (light mode)
 *   3. .dark           — runtime CSS custom properties (dark mode)
 *   4. Tailwind color adapter aliases
 *   5. Framework-independent public semantic utility classes
 *   6. Public Tailwind variant utilities
 *   7. Consumer skill semantic utility manifest
 *
 * semantic.css is NOT touched — it contains only semantic token mappings.
 *
 * Usage:
 *   bun scripts/generate-css.ts           # overwrites palette.css in-place
 *   bun scripts/generate-css.ts --check   # exits non-zero if file would change
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs'
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
import {
	publicSemanticUtilities,
	shadcnCompatAliases,
	tailwindColorAliases,
} from '../src/styles/tokens/registry.ts'

const ROOT = dirname(dirname(import.meta.path))
const TOKENS_DIR = join(ROOT, 'src/styles/tokens')
const PALETTE_CSS_PATH = join(TOKENS_DIR, 'palette.css')
const TAILWIND_COLOR_ADAPTER_PATH = join(TOKENS_DIR, 'tailwind-color-adapter.css')
const TAILWIND_PUBLIC_UTILITIES_PATH = join(TOKENS_DIR, 'tailwind-public-utilities.css')
const SEMANTIC_UTILITIES_PATH = join(TOKENS_DIR, 'semantic-utilities.css')
const SEMANTIC_UTILITIES_MANIFEST_PATH = join(
	ROOT,
	'skills/use-composables/references/semantic-utilities.md',
)
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

function generateTailwindColorAdapterCSS(): string {
	const aliases = tailwindColorAliases
		.map(({ cssVar, target }) => `\t${cssVar}: var(${target});`)
		.join('\n')

	return `/* ============================================================================
   Generated Tailwind Color Adapter
   ============================================================================
   Internal Tailwind v4 registration for semantic color aliases. This adapter
   is generated from registry.ts; consumers do not need Tailwind to use the
   guaranteed classes in semantic-utilities.css.

   To regenerate:  bun scripts/generate-css.ts
   ============================================================================ */

@theme inline {
${aliases}
}
`
}

function generateSemanticUtilitiesCSS(): string {
	const utilities = publicSemanticUtilities
		.map(({ className, declarations }) => {
			const body = declarations.map(([property, value]) => `\t\t${property}: ${value};`).join('\n')
			return `\t.${className} {\n${body}\n\t}`
		})
		.join('\n\n')

	return `/* ============================================================================
   Generated Public Semantic Utilities
   ============================================================================
   Guaranteed framework-independent classes generated from registry.ts.
   These rules intentionally map only semantically compatible token categories
   to CSS properties; Tailwind is not required in downstream applications.

   To regenerate:  bun scripts/generate-css.ts
   ============================================================================ */

@layer utilities {
${utilities}
}
`
}

function generateTailwindPublicUtilitiesCSS(): string {
	const utilities = publicSemanticUtilities
		.map(({ className, declarations }) => {
			const body = declarations.map(([property, value]) => `\t${property}: ${value};`).join('\n')
			return `@utility ${className} {\n${body}\n}`
		})
		.join('\n\n')

	return `/* ============================================================================
   Generated Public Tailwind Utilities
   ============================================================================
   Optional Tailwind v4 adapter for variants of every guaranteed public class.
   Import this after Tailwind in a consuming application's CSS entrypoint.

   To regenerate:  bun scripts/generate-css.ts
   ============================================================================ */

${utilities}
`
}

function assertNoPublicTailwindCollisions(): void {
	const derivedAliases = new Map(shadcnCompatAliases.map(({ cssVar, target }) => [cssVar, target]))
	const colorAliases = new Map(
		tailwindColorAliases.map(({ cssVar, target }) => [cssVar.replace('--color-', ''), target]),
	)
	const resolveTarget = (target: string): string => {
		const seen = new Set<string>()
		while (derivedAliases.has(target)) {
			if (seen.has(target)) throw new Error(`Circular compatibility alias at ${target}`)
			seen.add(target)
			target = derivedAliases.get(target) ?? target
		}
		return target
	}

	for (const utility of publicSemanticUtilities) {
		const match = utility.className.match(/^(?:bg|text|border|ring|outline|fill|stroke)-(.+)$/)
		if (!match) continue
		const aliasTarget = colorAliases.get(match[1])
		if (!aliasTarget) continue
		const resolvedTarget = resolveTarget(aliasTarget)
		if (resolvedTarget !== utility.token) {
			throw new Error(
				`Public .${utility.className} targets ${utility.token}, but Tailwind alias ` +
					`--color-${match[1]} resolves to ${resolvedTarget}`,
			)
		}
	}
}

function generateSemanticUtilitiesManifest(): string {
	const headers = ['Class', 'Category', 'Semantic token', 'Declaration']
	const cells = publicSemanticUtilities.map(({ className, declarations, category, token }) => {
		const declaration = declarations.map(([property, value]) => `${property}: ${value}`).join('; ')
		return [`\`${className}\``, category, `\`${token}\``, `\`${declaration}\``]
	})
	const widths = headers.map((header, index) =>
		Math.max(header.length, 3, ...cells.map((row) => row[index]?.length ?? 0)),
	)
	const row = (values: string[]) =>
		`| ${values.map((value, index) => value.padEnd(widths[index] ?? value.length)).join(' | ')} |`
	const table = [
		row(headers),
		row(widths.map((width) => '-'.repeat(width))),
		...cells.map(row),
	].join('\n')

	return `# Public semantic utility manifest

<!-- This file is generated by scripts/generate-css.ts. Do not edit it directly. -->

This is the exact allowlist of framework-independent semantic colour classes shipped by Composables. It is generated from \`publicSemanticUtilities\` in \`src/styles/tokens/registry.ts\`; do not infer additional token/property combinations.

${table}
`
}

function writeOrCheck(path: string, result: string, label: string): boolean {
	const original = existsSync(path) ? readFileSync(path, 'utf-8') : ''

	if (CHECK_MODE) {
		if (result !== original) {
			console.error(`✗ ${label} is out of sync with its token source`)
			return false
		}
		console.log(`✓ ${label} is in sync with its token source`)
		return true
	}

	writeFileSync(path, result, 'utf-8')
	console.log(`✓ Regenerated ${label}`)
	return true
}

/* ── Main ─────────────────────────────────────────────────────────────── */

assertNoPublicTailwindCollisions()

const outputs = [
	writeOrCheck(PALETTE_CSS_PATH, generatePaletteCSS(), 'tokens/palette.css'),
	writeOrCheck(
		TAILWIND_COLOR_ADAPTER_PATH,
		generateTailwindColorAdapterCSS(),
		'tokens/tailwind-color-adapter.css',
	),
	writeOrCheck(
		SEMANTIC_UTILITIES_PATH,
		generateSemanticUtilitiesCSS(),
		'tokens/semantic-utilities.css',
	),
	writeOrCheck(
		TAILWIND_PUBLIC_UTILITIES_PATH,
		generateTailwindPublicUtilitiesCSS(),
		'tokens/tailwind-public-utilities.css',
	),
	writeOrCheck(
		SEMANTIC_UTILITIES_MANIFEST_PATH,
		generateSemanticUtilitiesManifest(),
		'skills/use-composables/references/semantic-utilities.md',
	),
]

if (CHECK_MODE && outputs.includes(false)) {
	console.error('  Run: bun scripts/generate-css.ts')
	process.exit(1)
}
