/**
 * check-token-system.ts
 *
 * Fails when semantic token metadata, CSS registration, presets, or semantic
 * Tailwind utility usage drift out of sync.
 *
 * Usage: bun scripts/check-token-system.ts
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'

import {
	publicSemanticUtilities,
	publicSemanticUtilityClassNames,
	semanticColorCssVars,
	sidebarColorCssVars,
	shadcnCompatAliases,
	shadcnCompatCssVars,
	tailwindColorAliases,
	tailwindColorCssVars,
} from '../src/styles/tokens/registry'
import { presetDefinitions } from '../src/styles/presets-data'

const ROOT = join(import.meta.dir, '..')

const SEMANTIC_CSS = join(ROOT, 'src/styles/tokens/semantic.css')
const COMPONENTS_CSS = join(ROOT, 'src/styles/tokens/components.css')
const TAILWIND_THEME_CSS = join(ROOT, 'src/styles/tokens/tailwind-theme.css')
const TAILWIND_COLOR_ADAPTER_CSS = join(ROOT, 'src/styles/tokens/tailwind-color-adapter.css')
const SEMANTIC_UTILITIES_CSS = join(ROOT, 'src/styles/tokens/semantic-utilities.css')
const PRESETS_CSS_DIR = join(ROOT, 'src/styles/presets')

let failed = false

function fail(message: string) {
	console.error(`  FAIL  ${message}`)
	failed = true
}

function ok(message: string) {
	console.log(`  OK    ${message}`)
}

function read(path: string) {
	return readFileSync(path, 'utf-8')
}

function extractCssBlock(css: string, selector: string): string {
	const start = css.indexOf(selector)
	if (start === -1) return ''
	const open = css.indexOf('{', start)
	if (open === -1) return ''
	let depth = 0
	for (let i = open; i < css.length; i++) {
		const char = css[i]
		if (char === '{') depth++
		if (char === '}') depth--
		if (depth === 0) return css.slice(open + 1, i)
	}
	return ''
}

function declarationMap(css: string): Map<string, string> {
	const declarations = new Map<string, string>()
	const re = /(--[a-z0-9-]+)\s*:\s*([^;]+);/g
	let match: RegExpExecArray | null
	while ((match = re.exec(css))) {
		declarations.set(match[1], match[2].trim())
	}
	return declarations
}

function cssVars(css: string): Set<string> {
	return new Set(declarationMap(css).keys())
}

function assertNoDuplicates(values: string[], label: string) {
	const seen = new Set<string>()
	const duplicates = new Set<string>()
	for (const value of values) {
		if (seen.has(value)) duplicates.add(value)
		seen.add(value)
	}
	if (duplicates.size > 0) {
		fail(`${label} has duplicate entries: ${[...duplicates].sort().join(', ')}`)
	} else {
		ok(`${label} has no duplicate entries`)
	}
}

function assertSetContains(actual: Set<string>, required: string[], label: string) {
	const missing = required.filter((value) => !actual.has(value))
	if (missing.length > 0) {
		fail(`${label} is missing: ${missing.sort().join(', ')}`)
	} else {
		ok(`${label} contains all required entries`)
	}
}

function checkSemanticCss() {
	const css = read(SEMANTIC_CSS)
	const root = declarationMap(extractCssBlock(css, ':root'))
	const dark = declarationMap(extractCssBlock(css, '.dark'))
	const required = [...semanticColorCssVars, ...shadcnCompatCssVars, ...sidebarColorCssVars]

	assertSetContains(new Set(root.keys()), required, 'semantic.css :root')
	assertSetContains(
		new Set(dark.keys()),
		required.filter((token) => token !== '--radius'),
		'semantic.css .dark',
	)

	for (const { cssVar, target } of shadcnCompatAliases) {
		const expected = `var(${target})`
		if (root.get(cssVar) !== expected) {
			fail(
				`semantic.css :root ${cssVar} should be ${expected}, got ${root.get(cssVar) ?? 'missing'}`,
			)
		}
		if (dark.get(cssVar) !== expected) {
			fail(
				`semantic.css .dark ${cssVar} should be ${expected}, got ${dark.get(cssVar) ?? 'missing'}`,
			)
		}
	}

	if (!failed) ok('semantic.css aliases point at canonical semantic tokens')
}

function checkTailwindAliases() {
	const css = read(TAILWIND_COLOR_ADAPTER_CSS)
	const inlineTheme = extractCssBlock(css, '@theme inline')
	const actual = declarationMap(inlineTheme)
	const expected = new Map(
		tailwindColorAliases.map((alias) => [alias.cssVar, `var(${alias.target})`]),
	)

	assertNoDuplicates(tailwindColorCssVars, 'tailwind color registry')
	assertSetContains(
		new Set(actual.keys()),
		tailwindColorCssVars,
		'tailwind-color-adapter.css @theme inline',
	)

	const extras = [...actual.keys()].filter(
		(key) => key.startsWith('--color-') && !expected.has(key),
	)
	if (extras.length > 0) {
		fail(`tailwind color adapter has unregistered color aliases: ${extras.sort().join(', ')}`)
	}

	for (const [key, value] of expected) {
		const actualValue = actual.get(key)
		if (actualValue !== value) {
			fail(`tailwind color adapter ${key} should be ${value}, got ${actualValue ?? 'missing'}`)
		}
	}

	for (const { cssVar, target } of tailwindColorAliases) {
		if (cssVar === target) fail(`tailwind color adapter ${cssVar} must not reference itself`)
	}

	if (!failed) ok('tailwind color aliases match registry')
}

function checkPublicTailwindCollisions() {
	const derivedAliases = new Map(shadcnCompatAliases.map(({ cssVar, target }) => [cssVar, target]))
	const colorAliases = new Map(
		tailwindColorAliases.map(({ cssVar, target }) => [cssVar.replace('--color-', ''), target]),
	)
	const resolveTarget = (target: string): string => {
		const seen = new Set<string>()
		while (derivedAliases.has(target)) {
			if (seen.has(target)) {
				fail(`compatibility alias cycle includes ${target}`)
				return target
			}
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
			fail(
				`.${utility.className} targets ${utility.token}, but --color-${match[1]} resolves to ${resolvedTarget}`,
			)
		}
	}

	if (!failed) ok('public utilities and internal Tailwind aliases have no semantic collisions')
}

function checkPublicSemanticUtilities() {
	const css = read(SEMANTIC_UTILITIES_CSS)

	assertNoDuplicates(publicSemanticUtilityClassNames, 'public semantic utility registry')

	for (const { className, declarations } of publicSemanticUtilities) {
		const block = extractCssBlock(css, `.${className}`)
		if (!block) {
			fail(`semantic-utilities.css is missing .${className}`)
			continue
		}
		for (const [property, value] of declarations) {
			if (!block.includes(`${property}: ${value};`)) {
				fail(`semantic-utilities.css .${className} should set ${property}: ${value}`)
			}
		}
	}

	if (!failed) ok('public semantic utilities match the registry')
}

function checkPresets() {
	const knownTokenVars = new Set([
		...cssVars(read(SEMANTIC_CSS)),
		...cssVars(read(COMPONENTS_CSS)),
		...cssVars(read(TAILWIND_THEME_CSS)),
	])
	const requiredPresetTokens = [...semanticColorCssVars, ...sidebarColorCssVars]
	const derivedCompatTokens = new Set(shadcnCompatCssVars)

	for (const preset of presetDefinitions) {
		const lightKeys = Object.keys(preset.light)
		const darkKeys = Object.keys(preset.dark)
		const lightUnknown = lightKeys.filter((key) => !knownTokenVars.has(key))
		const darkUnknown = darkKeys.filter((key) => !knownTokenVars.has(key))
		const lightMissing = requiredPresetTokens.filter((key) => !(key in preset.light))
		const darkMissing = requiredPresetTokens.filter((key) => !(key in preset.dark))
		const lightDerivedAliases = lightKeys.filter((key) => derivedCompatTokens.has(key))
		const darkDerivedAliases = darkKeys.filter((key) => derivedCompatTokens.has(key))

		if (lightUnknown.length > 0) {
			fail(`${preset.name} light preset has unknown tokens: ${lightUnknown.sort().join(', ')}`)
		}
		if (darkUnknown.length > 0) {
			fail(`${preset.name} dark preset has unknown tokens: ${darkUnknown.sort().join(', ')}`)
		}
		if (lightDerivedAliases.length > 0) {
			fail(
				`${preset.name} light preset independently owns derived compatibility aliases: ${lightDerivedAliases.sort().join(', ')}`,
			)
		}
		if (darkDerivedAliases.length > 0) {
			fail(
				`${preset.name} dark preset independently owns derived compatibility aliases: ${darkDerivedAliases.sort().join(', ')}`,
			)
		}
		if (lightMissing.length > 0) {
			fail(
				`${preset.name} light preset is missing semantic tokens: ${lightMissing.sort().join(', ')}`,
			)
		}
		if (darkMissing.length > 0) {
			fail(
				`${preset.name} dark preset is missing semantic tokens: ${darkMissing.sort().join(', ')}`,
			)
		}

		for (const mode of ['light', 'dark'] as const) {
			for (const cssVar of sidebarColorCssVars) {
				const value = preset[mode][cssVar]
				if (!value || value.includes('var(')) {
					fail(`${preset.name} ${mode} ${cssVar} must be an independent concrete value`)
				}
			}
		}

		const generatedCss = read(join(PRESETS_CSS_DIR, `${preset.name}.css`))
		const generatedRoot = declarationMap(extractCssBlock(generatedCss, ':root'))
		const generatedDark = declarationMap(extractCssBlock(generatedCss, '.dark'))
		for (const { cssVar, target } of shadcnCompatAliases) {
			const expected = `var(${target})`
			if (generatedRoot.get(cssVar) !== expected) {
				fail(`${preset.name}.css :root ${cssVar} should be generated as ${expected}`)
			}
			if (generatedDark.get(cssVar) !== expected) {
				fail(`${preset.name}.css .dark ${cssVar} should be generated as ${expected}`)
			}
		}
	}

	if (!failed) ok('presets own canonical and sidebar roles, never derived compatibility aliases')
}

function listFiles(dir: string): string[] {
	if (!existsSync(dir)) return []
	const entries = readdirSync(dir, { withFileTypes: true })
	const files: string[] = []
	for (const entry of entries) {
		const fullPath = join(dir, entry.name)
		if (entry.isDirectory()) {
			if (entry.name === 'node_modules' || entry.name === 'dist') continue
			files.push(...listFiles(fullPath))
			continue
		}
		if (/\.(ts|tsx)$/.test(entry.name)) files.push(fullPath)
	}
	return files
}

function finalClassSegment(token: string): string {
	let depth = 0
	let start = 0
	for (let i = 0; i < token.length; i++) {
		const char = token[i]
		if (char === '[') depth++
		if (char === ']') depth--
		if (char === ':' && depth === 0) start = i + 1
	}
	return token.slice(start)
}

function baseColorClass(token: string): { prefix: string; suffix: string } | null {
	const segment = finalClassSegment(token).replace(/^!/, '').replace(/!$/, '')
	if (segment.includes('[') || segment.includes('${')) return null
	const match = segment.match(/^(bg|text|border|ring|outline|fill|stroke)-(.+)$/)
	if (!match) return null
	const suffix = match[2].split('/')[0]
	if (!suffix || /^(\d|x|y|t|r|b|l|s|e)$/.test(suffix)) return null
	return { prefix: match[1], suffix }
}

function isSemanticLikeSuffix(suffix: string, knownSuffixes: Set<string>): boolean {
	if (knownSuffixes.has(suffix)) return true
	return /^(surface|icon|stroke|brand|sidebar|page|field|focus|danger|critical|success|warning|info|emphasis)(-|$)/.test(
		suffix,
	)
}

function checkSemanticClassUsage() {
	const knownSuffixes = new Set(
		tailwindColorCssVars.map((cssVar) => cssVar.replace('--color-', '')),
	)
	const files = [...listFiles(join(ROOT, 'src')), ...listFiles(join(ROOT, 'showcase/src'))]
	const problems: string[] = []

	for (const file of files) {
		const lines = read(file).split('\n')
		for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
			const line = lines[lineIndex]
			const stringRe = /(['"`])([^'"`]+)\1/g
			let match: RegExpExecArray | null
			while ((match = stringRe.exec(line))) {
				for (const token of match[2].split(/\s+/)) {
					const colorClass = baseColorClass(token)
					if (!colorClass) continue
					if (!isSemanticLikeSuffix(colorClass.suffix, knownSuffixes)) continue
					if (!knownSuffixes.has(colorClass.suffix)) {
						problems.push(
							`${relative(ROOT, file)}:${lineIndex + 1} uses unregistered semantic color utility "${token}"`,
						)
					}
				}
			}
		}
	}

	if (problems.length > 0) {
		for (const problem of problems) fail(problem)
		return
	}
	ok('semantic Tailwind utility usage matches registered color aliases')
}

console.log('Checking semantic token system...\n')

assertNoDuplicates(semanticColorCssVars, 'semantic color registry')
checkSemanticCss()
checkTailwindAliases()
checkPublicSemanticUtilities()
checkPublicTailwindCollisions()
checkPresets()
checkSemanticClassUsage()

if (failed) {
	console.error('\nFAIL: token system drift detected.')
	process.exit(1)
}

console.log('\nPASS: token registry, CSS aliases, presets, and semantic class usage are in sync.')
