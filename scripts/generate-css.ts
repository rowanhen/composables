import { tokenCatalog } from '../src/styles/tokens/catalog'
import { resolveTokens } from '../src/styles/tokens/preset'
import { systemDefaults } from '../src/styles/tokens/system-tokens'
import { componentRecipes } from '../src/styles/tokens/recipes'
import { componentUtilityAliases } from '../src/styles/tokens/utility-aliases'
/**
 * generate-css.ts
 *
 * Regenerates the CSS outputs owned by the token registry:
 *   1. Runtime primitive palette values
 *   2. :root           - runtime CSS custom properties (light mode)
 *   3. .dark           - runtime CSS custom properties (dark mode)
 *   4. Tailwind color adapter aliases
 *   5. Framework-independent public semantic utility classes
 *   6. Public Tailwind variant utilities
 *   7. Consumer skill semantic utility manifest
 *
 * All runtime token CSS is generated from typed sources.
 *
 * Usage:
 *   bun scripts/generate-tokens.ts           # overwrites palette.css in-place
 *   bun scripts/generate-tokens.ts --check   # exits non-zero if file would change
 */

import { componentDefaults } from '../src/styles/tokens/component-tokens'
import { foundationDefaults } from '../src/styles/tokens/foundations'
import { defaultPreset, defaultPresetDark } from '../src/styles/presets-data/default'
import { semanticColorCssVars, sidebarColorCssVars } from '../src/styles/tokens/registry'
import { format } from 'oxfmt'
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
} from '../src/styles/tokens/palette-data.ts'
import type { PaletteScale, Step } from '../src/styles/tokens/palette-data.ts'
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
			lines.push(
				`${indent}--palette-${palette.name}-${step}: ${palette.solid[step].toLowerCase()};`,
			)
		}
		for (const step of steps) {
			lines.push(
				`${indent}--palette-${palette.name}-alpha-${step}: ${palette.alpha[step].toLowerCase()};`,
			)
		}
	}

	lines.push(`${indent}--palette-base-white: ${base.white.toLowerCase()};`)
	lines.push(`${indent}--palette-base-black: ${base.black.toLowerCase()};`)

	for (const step of steps) {
		const val = overlays[step]
		if (val) lines.push(`${indent}--palette-overlays-black-alpha-${step}: ${val.toLowerCase()};`)
	}

	return lines
}

/* ── Generate full palette.css ───────────────────────────────────────── */

function generatePaletteCSS(): string {
	const lightLines = generatePaletteLines(palettes, baseColors, overlaysBlackAlpha, '\t')
	const darkLines = generatePaletteLines(darkPalettes, darkBaseColors, darkOverlaysBlackAlpha, '\t')

	return `/* Generated primitive palette. Edit src/styles/tokens/palette-data.ts.
   Raw values are runtime-only; components consume semantic roles, not palette utilities. */
:root {
${lightLines.join('\n')}
}
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

   To regenerate:  bun scripts/generate-tokens.ts
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

   To regenerate:  bun scripts/generate-tokens.ts
   ============================================================================ */

@layer utilities {
${utilities}
}
`
}

function recipeCSS(): string {
	return Object.entries(componentRecipes)
		.map(
			([name, recipe]) =>
				`@utility ${name} {\n${Object.entries(recipe)
					.map(
						([property, value]) =>
							`\t${property.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}: ${value};`,
					)
					.join('\n')}\n}`,
		)
		.join('\n\n')
}

function generateTailwindPublicUtilitiesCSS(): string {
	const foundations = Object.entries(foundationDefaults)
		.map(([key, value]) => `\t${key}: ${value};`)
		.join('\n')
	const theme = [
		...tailwindColorAliases.map(({ cssVar, target }) => `\t${cssVar}: var(${target});`),
		...Object.entries(componentUtilityAliases).map(
			([name, target]) => `\t${name}: var(${target});`,
		),
	].join('\n')
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

   To regenerate:  bun scripts/generate-tokens.ts
   ============================================================================ */

${utilities}

${recipeCSS()}

@theme static {
${foundations}
}

@theme inline {
${theme}
}
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

async function writeOrCheck(path: string, result: string, label: string): Promise<boolean> {
	const formatted = await format(
		path,
		result,
		JSON.parse(readFileSync(join(ROOT, '.oxfmtrc.json'), 'utf-8')),
	)
	if (formatted.errors.length) throw new Error(formatted.errors.map((e) => e.message).join('\n'))
	result = formatted.code
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

const declarations = (values: Record<string, string>) =>
	Object.entries(values)
		.map(([key, value]) => `\t${key}: ${value};`)
		.join('\n')
const header = '/* Generated by scripts/generate-tokens.ts. Edit the typed token sources. */\n'
const aliases = Object.fromEntries(
	shadcnCompatAliases.map(({ cssVar, target }) => [cssVar, `var(${target})`]),
)
const semanticValues = (preset: Record<string, string>) =>
	Object.fromEntries(
		[...semanticColorCssVars, ...sidebarColorCssVars].map((key) => [key, preset[key]]),
	)
const defaultValues = resolveTokens(defaultPreset)
const reference =
	'# Token reference\n\nGenerated by `bun run generate:tokens`. See [the authoring guide](tokens.md) for role selection and overrides.\n\n' +
	['foundation', 'semantic', 'system', 'component']
		.map(
			(layer) =>
				`## ${layer}\n\n| Token | Group | Default (light) |\n| --- | --- | --- |\n` +
				tokenCatalog
					.filter((token) => token.layer === layer)
					.map(
						(token) => `| \`${token.name}\` | ${token.group} | \`${defaultValues[token.name]}\` |`,
					)
					.join('\n'),
		)
		.join('\n\n') +
	'\n'
const outputs = await Promise.all([
	writeOrCheck(
		join(TOKENS_DIR, 'compat.css'),
		header +
			`:root, .dark, [data-preset], [data-theme] {\n${declarations(aliases)}\n}\n@theme inline {\n${shadcnCompatAliases.map(({ cssVar, target }) => `--color-${cssVar.slice(2)}: var(${target});`).join('\n')}\n}\n`,
		'compat.css',
	),
	writeOrCheck(join(ROOT, 'docs/token-reference.md'), reference, 'docs/token-reference.md'),
	writeOrCheck(
		join(TOKENS_DIR, 'semantic.css'),
		header +
			`:root {\n--radius-base: 0rem;\n${declarations({ ...semanticValues(defaultPreset) })}\n}\n.dark {\n${declarations({ ...semanticValues(defaultPresetDark) })}\n}\n`,
		'semantic.css',
	),
	writeOrCheck(
		join(TOKENS_DIR, 'components.css'),
		header +
			`@layer base {\n:root {\n${declarations({ ...systemDefaults, ...componentDefaults })}\n}\n}\n`,
		'components.css',
	),
	writeOrCheck(
		join(TOKENS_DIR, 'tailwind-theme.css'),
		header +
			`@theme static {\n${declarations(foundationDefaults)}\n}\n@theme inline {\n${declarations(Object.fromEntries(Object.entries(componentUtilityAliases).map(([key, value]) => [key, `var(${value})`])))}\n}\n`,
		'tailwind-theme.css',
	),
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
])

if (CHECK_MODE && outputs.includes(false)) {
	console.error('  Run: bun scripts/generate-tokens.ts')
	process.exit(1)
}
