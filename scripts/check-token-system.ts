/** Validate preset coverage, color aliases, and scale references. */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { cssVariables, derivedColorAliases, semanticUtilities } from '../src/styles/theme'
import { readPresetStyles } from './preset-css'

const root = join(import.meta.dir, '..')
const read = (file: string) => readFileSync(join(root, 'src/styles', file), 'utf8')
const theme = read('composable.css')
const utilitySource = read('tailwind.css')
const utilities = semanticUtilities(utilitySource)
const colorTokens = new Set(utilities.map(({ token }) => token))
const defaultPreset = read('presets/default.css')
const aliases = derivedColorAliases(defaultPreset, colorTokens)
const sidebar = [...cssVariables(theme).keys()]
	.filter((name) => /^--color-sidebar(?:$|-(?!stroke$))/.test(name))
	.map((name) => name.replace('--color-', '--'))
const presetDefinitions = readPresetStyles(join(root, 'src/styles/presets'))
let failed = false

function fail(message: string) {
	console.error(`  FAIL  ${message}`)
	failed = true
}

function ok(message: string) {
	console.log(`  OK    ${message}`)
}

if (
	utilities.length === 0 ||
	utilities.length !== (utilitySource.match(/@utility\s+/g) ?? []).length ||
	new Set(utilities.map(({ name }) => name)).size !== utilities.length
) {
	fail('Public utilities must each have a unique name and one semantic variable declaration.')
}

const themeVariables = cssVariables(theme)
const known = new Set([...themeVariables.keys(), ...cssVariables(defaultPreset).keys()])
const resolveAlias = (token: string) => aliases.get(token) ?? `var(${token})`
for (const { name, token } of utilities) {
	const suffix = name.replace(/^(?:bg|text|border|fill|stroke)-/, '')
	const internal = themeVariables.get(`--color-${suffix}`)
	const target = /^var\((--[\w-]+)\)$/.exec(internal ?? '')?.[1]
	if (target && resolveAlias(target) !== `var(${token})`) {
		fail(`.${name} conflicts with Tailwind color ${suffix}`)
	}
}

for (const preset of presetDefinitions) {
	for (const mode of ['light', 'dark'] as const) {
		const values = preset[mode]
		const label = `${preset.name} ${mode}`
		for (const token of [...colorTokens, ...sidebar]) {
			if (!values[token]) fail(`${label} is missing ${token}`)
		}
		for (const token of Object.keys(values)) {
			if (!known.has(token)) fail(`${label} has unknown token ${token}`)
		}
		for (const token of sidebar) {
			if (values[token]?.includes('var(')) fail(`${label} ${token} needs its own value`)
		}
		for (const [alias, value] of aliases) {
			if (values[alias] !== value) fail(`${label} ${alias} must use ${value}`)
		}
	}
}

// ── WCAG contrast validation ────────────────────────────────────────────────
// Guards the core readable pairings in every preset. Hard-fails below 4.5:1
// for primary text-on-surface/fill pairs; warns for the muted/secondary tiers
// (non-essential text) below their thresholds.

function relativeLuminance(hex: string): number | null {
	const match = /^#([0-9a-f]{6})([0-9a-f]{2})?$/i.exec(hex.trim())
	if (!match) return null
	const [r, g, b] = [0, 2, 4].map((offset) => {
		const channel = parseInt(match[1].slice(offset, offset + 2), 16) / 255
		return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
	})
	return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrastRatio(a: string, b: string): number | null {
	const la = relativeLuminance(a)
	const lb = relativeLuminance(b)
	if (la === null || lb === null) return null
	const [light, dark] = la > lb ? [la, lb] : [lb, la]
	return (light + 0.05) / (dark + 0.05)
}

function resolvePresetValue(
	tokens: Record<string, string>,
	name: string,
	depth = 0,
): string | null {
	if (depth > 4) return null
	const value = tokens[name]
	if (!value) return null
	const varRef = /^var\((--[a-z0-9-]+)\)$/i.exec(value.trim())
	if (varRef) return resolvePresetValue(tokens, varRef[1], depth + 1)
	return value
}

function checkPresetContrast() {
	// [background, foreground, minimum ratio, hard failure?]
	const pairs: Array<[string, string, number, boolean]> = [
		['--bg-default', '--text-default', 4.5, true],
		['--bg-surface-default', '--text-default', 4.5, true],
		['--bg-muted', '--text-default', 4.5, true],
		['--bg-surface-accent', '--text-on-surface-accent', 4.5, true],
		['--bg-surface-inverse', '--text-inverse', 4.5, true],
		['--bg-fill-primary', '--text-on-fill-primary', 4.5, true],
		['--bg-fill-brand', '--text-on-fill-brand', 4.5, true],
		['--bg-fill-secondary', '--text-on-fill-secondary', 4.5, true],
		['--bg-default', '--text-secondary', 4.5, false],
		['--bg-default', '--text-muted', 3, false],
	]
	let contrastIssues = 0
	for (const preset of presetDefinitions) {
		for (const [mode, tokens] of [
			['light', preset.light],
			['dark', preset.dark],
		] as const) {
			for (const [bgToken, fgToken, minimum, hard] of pairs) {
				const bg = resolvePresetValue(tokens, bgToken)
				const fg = resolvePresetValue(tokens, fgToken)
				if (!bg || !fg) continue
				const ratio = contrastRatio(bg, fg)
				if (ratio === null) continue
				if (ratio < minimum) {
					const message = `${preset.name} (${mode}): ${fgToken} on ${bgToken} is ${ratio.toFixed(2)}:1 (needs ${minimum}:1)`
					if (hard) {
						fail(message)
					} else {
						console.warn(`  WARN  ${message}`)
					}
					contrastIssues += 1
				}
			}
		}
	}
	if (contrastIssues === 0) {
		ok('preset text/surface pairings meet WCAG contrast thresholds')
	} else if (!failed) {
		ok('preset contrast hard requirements met (warnings above are advisory)')
	}
}

// Sizing tokens pick a step on a scale; they never hold raw lengths.
const SPACING_STEP_TOKENS = ['--button-height', '--field-height', '--card-padding']
const SPACING_STEP = /^calc\(var\(--spacing\) \* \d+\)$/
const TEXT_STEP_TOKENS = [
	'--control-font-size',
	'--body-font-size',
	'--title-font-size',
	'--heading-font-size',
]
const TEXT_STEP = /^var\(--text-[a-z0-9]+\)$/
const LINE_HEIGHT_TOKENS = ['--body-line-height', '--title-line-height', '--heading-line-height']
const LINE_HEIGHT_STEP = /^var\(--text-[a-z0-9]+--line-height\)$/
// Radii derive from --radius (or are a full pill); borders from the base width.
// Focus and hover ring widths stay free: a borderless preset (signal-pop sets
// --border-width-base to 0) still needs visible rings.
const RADIUS_TOKENS = [
	'--button-radius',
	'--badge-radius',
	'--card-radius',
	'--input-radius',
	'--checkbox-radius',
	'--dialog-radius',
]
const RADIUS_STEP = /^(var\(--radius(-[a-z0-9]+)?\)|calc\(var\(--radius\) \* [\d.]+\)|9999px)$/

function checkScaleTokens() {
	const sources: [string, Map<string, string>][] = [
		['composable.css', cssVariables(theme)],
		...presetDefinitions.flatMap((preset): [string, Map<string, string>][] => [
			[`${preset.name} light`, new Map(Object.entries(preset.light))],
			[`${preset.name} dark`, new Map(Object.entries(preset.dark))],
		]),
	]

	for (const [source, values] of sources) {
		for (const [tokens, pattern, expected] of [
			[SPACING_STEP_TOKENS, SPACING_STEP, 'calc(var(--spacing) * <whole number>)'],
			[TEXT_STEP_TOKENS, TEXT_STEP, 'var(--text-<step>)'],
			[LINE_HEIGHT_TOKENS, LINE_HEIGHT_STEP, 'var(--text-<step>--line-height)'],
			[RADIUS_TOKENS, RADIUS_STEP, 'var(--radius[-step]) or calc(var(--radius) * n) or 9999px'],
		] as const) {
			for (const cssVar of tokens) {
				const value = values.get(cssVar)
				if (value !== undefined && !pattern.test(value)) {
					fail(`${source} ${cssVar} is "${value}"; must be ${expected}`)
				}
			}
		}
	}

	if (!failed) ok('sizing, typography, and radius tokens stay on their scales')
}

checkScaleTokens()
checkPresetContrast()
if (failed) process.exitCode = 1
else ok('Presets match the semantic color, alias, and scale contracts')
