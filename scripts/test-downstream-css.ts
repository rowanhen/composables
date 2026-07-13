/**
 * test-downstream-css.ts
 *
 * Validates that dist/styles.css (the pre-compiled CSS shipped to consumers)
 * contains the expected design tokens and guaranteed semantic utility classes,
 * and that dist/tailwind.css exposes optional variants for the exact public
 * semantic utility contract.
 *
 * Run `bun run build:css` first to generate dist/styles.css.
 *
 * This catches regressions where:
 *   - @theme / @theme inline blocks stop being processed
 *   - Token files are accidentally removed or misconfigured
 *   - Palette, semantic, or component tokens go missing from output
 *   - @source is missing and Tailwind utilities aren't generated
 *
 * Usage: bun scripts/test-downstream-css.ts
 */
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { execSync } from 'node:child_process'

import { defaultPreset, defaultPresetDark } from '../src/styles/presets-data/default'
import { publicSemanticUtilities } from '../src/styles/tokens/registry'

const ROOT = join(import.meta.dir, '..')
const DIST_CSS = join(ROOT, 'dist/styles.css')
const DIST_TAILWIND_CSS = join(ROOT, 'dist/tailwind.css')
const SEMANTIC_UTILITIES_CSS = join(ROOT, 'src/styles/tokens/semantic-utilities.css')

// ── Tokens that MUST appear in compiled output ───────────────────────────
const requiredTokens: Record<string, string> = {
	// Palette primitives (from palette.css @theme inline)
	'Palette: neutral-50': '--neutral-50',
	'Palette: neutral-1000': '--neutral-1000',
	'Palette: blue-800': '--blue-800',
	'Palette: red-950': '--red-950',
	'Palette: green-800': '--green-800',
	'Palette: pink-800': '--pink-800',

	// Semantic tokens (from semantic.css :root)
	'Semantic: bg-default': '--bg-default',
	'Semantic: text-default': '--text-default',
	'Semantic: border-default': '--border-default',
	'Semantic: bg-fill-primary': '--bg-fill-primary',
	'Semantic: text-inverse': '--text-inverse',
	'Semantic: border-focus': '--border-focus',
	'Semantic: icon-default': '--icon-default',

	// Component tokens (from components.css)
	'Component: font-size-base': '--font-size-base',
	'Component: leading-base': '--leading-base',
	'Component: border-width-base': '--border-width-base',
	'Component: button-radius': '--button-radius',
	'Component: transition-default': '--transition-default',
	'Component: motion-duration-overlay': '--motion-duration-overlay',
	'Component: motion-duration-disclosure': '--motion-duration-disclosure',
	'Component: focus-ring-style': '--focus-ring-style',

	// Dark mode tokens (from semantic.css .dark)
	'Dark mode: .dark selector': '.dark',

	// shadcn compat tokens
	'shadcn: --background': '--background',
	'shadcn: --foreground': '--foreground',
	'shadcn: --destructive': '--destructive',
}

// Tailwind utility classes that MUST be present (catches missing @source)
const requiredUtilities: Record<string, string> = {
	'Utility: flex': 'flex',
	'Utility: inline-flex': 'inline-flex',
	'Utility: items-center': 'items-center',
	'Utility: justify-center': 'justify-center',
	'Utility: rounded': 'rounded-',
	'Utility: font-medium': 'font-medium',
	'Utility: transition': 'transition',
	'Utility: motion-colors': 'motion-colors',
	'Utility: motion-overlay': 'motion-overlay',
	'Utility: bg-primary': 'bg-primary',
	'Utility: text-foreground': 'text-foreground',
	'Utility: border-stroke': 'border-stroke',
}

// ── Run ──────────────────────────────────────────────────────────────────
console.log('Validating dist/styles.css...\n')

// 1. Check dist/styles.css exists
if (!existsSync(DIST_CSS)) {
	console.error(
		'FAIL: dist/styles.css not found.\n' + 'Run `bun run build:css` first to generate it.',
	)
	process.exit(1)
}

if (!existsSync(DIST_TAILWIND_CSS)) {
	console.error(
		'FAIL: dist/tailwind.css not found.\n' + 'Run `bun run build:css` first to generate it.',
	)
	process.exit(1)
}

// 2. Read output
const output = readFileSync(DIST_CSS, 'utf-8')
let failed = false

// 3. Check required tokens
for (const [label, token] of Object.entries(requiredTokens)) {
	if (!output.includes(token)) {
		console.error(`  MISSING  ${label}  (searched for: ${token})`)
		failed = true
	} else {
		console.log(`  OK       ${label}`)
	}
}

// 4. Check required utility classes
for (const [label, utility] of Object.entries(requiredUtilities)) {
	if (!output.includes(utility)) {
		console.error(`  MISSING  ${label}  (searched for: ${utility})`)
		failed = true
	} else {
		console.log(`  OK       ${label}`)
	}
}

// 5. Every public semantic utility is guaranteed ordinary CSS that references
// its runtime variable directly. This must not depend on downstream scanning.
const semanticUtilitySource = readFileSync(SEMANTIC_UTILITIES_CSS, 'utf-8')
for (const { className, declarations } of publicSemanticUtilities) {
	const sourceSelector = `.${className} {`
	if (!semanticUtilitySource.includes(sourceSelector)) {
		console.error(`  MISSING  Generated semantic utility .${className}`)
		failed = true
		continue
	}

	const compactDeclarations = declarations
		.map(([property, value]) => `${property}:${value}`)
		.join(';')
	const compiledRule = `.${className}{${compactDeclarations}}`
	if (!output.includes(compiledRule)) {
		console.error(
			`  MISSING  Compiled semantic utility .${className} ` + `(searched for: ${compiledRule})`,
		)
		failed = true
	}
}

if (!failed) {
	console.log(`  OK       ${publicSemanticUtilities.length} registry-driven semantic utilities`)
}

// The optional Tailwind adapter registers every exact public class as a Tailwind
// utility, so state/responsive variants do not rely on ambiguous color suffixes.
const tailwindAdapter = readFileSync(DIST_TAILWIND_CSS, 'utf-8')
for (const { className, declarations } of publicSemanticUtilities) {
	const declaration = declarations.map(([property, value]) => `${property}: ${value};`).join('\n')
	if (
		!tailwindAdapter.includes(`@utility ${className} {`) ||
		!tailwindAdapter.includes(declaration)
	) {
		console.error(`  MISSING  Tailwind public utility ${className}`)
		failed = true
	}
}
if (!failed) {
	console.log(`  OK       ${publicSemanticUtilities.length} optional Tailwind variant utilities`)
}

const variantCandidates = publicSemanticUtilities
	.map(({ className }) => `hover:${className}`)
	.join(' ')
const tailwindTestDir = mkdtempSync(join(ROOT, '.test-tailwind-'))
const tailwindTestInput = join(tailwindTestDir, 'input.css')
const tailwindTestOutput = join(tailwindTestDir, 'output.css')
try {
	writeFileSync(
		tailwindTestInput,
		`@import 'tailwindcss';\n@import '../dist/tailwind.css';\n@source inline("${variantCandidates}");\n`,
	)
	execSync(
		`npx @tailwindcss/cli -i ${JSON.stringify(tailwindTestInput)} -o ${JSON.stringify(tailwindTestOutput)} --minify`,
		{
			cwd: ROOT,
			stdio: 'pipe',
			timeout: 60_000,
		},
	)
	const variantOutput = readFileSync(tailwindTestOutput, 'utf-8')
	for (const { className, declarations } of publicSemanticUtilities) {
		const escapedCandidate = `hover\\:${className}`
		const candidateStart = variantOutput.indexOf(escapedCandidate)
		const candidateEnd = variantOutput.indexOf('}', candidateStart)
		const candidateRule =
			candidateStart === -1 ? '' : variantOutput.slice(candidateStart, candidateEnd + 1)
		for (const [property, value] of declarations) {
			if (!candidateRule.includes(`${property}:${value}`)) {
				console.error(`  MISSING  Compiled Tailwind variant hover:${className} -> ${property}`)
				failed = true
			}
		}
	}
	if (!failed) {
		console.log(
			`  OK       Tailwind compiled hover variants for all ${publicSemanticUtilities.length} public utilities`,
		)
	}
} catch (error) {
	console.error('  FAIL     Tailwind public variant fixture failed to compile')
	if (error instanceof Error) console.error(`           ${error.message}`)
	failed = true
} finally {
	rmSync(tailwindTestDir, { recursive: true, force: true })
}

// 6. The package source owns its default appearance: styles.css imports the
// canonical default preset after fallback semantic/component values.
const packageCSS = readFileSync(join(ROOT, 'src/styles/composable.css'), 'utf-8')
const semanticImport = packageCSS.indexOf("@import './tokens/semantic.css';")
const componentsImport = packageCSS.indexOf("@import './tokens/components.css';")
const defaultImport = packageCSS.indexOf("@import './presets/default.css';")

if (defaultImport < semanticImport || defaultImport < componentsImport) {
	console.error('  MISSING  composable.css must import the default preset after token fallbacks')
	failed = true
}

for (const [label, preset] of [
	['light', defaultPreset],
	['dark', defaultPresetDark],
] as const) {
	const value = preset['--bg-default']?.toLowerCase().replace(/^(#[0-9a-f]{6})ff$/, '$1')
	if (!value || !output.includes(`--bg-default:${value}`)) {
		console.error(`  MISSING  Compiled ${label} default preset value for --bg-default`)
		failed = true
	} else {
		console.log(`  OK       Compiled ${label} default preset value`)
	}
}

// 7. Check the source CSS doesn't contain @import 'tailwindcss'

if (/@import ['"]tailwindcss['"]/.test(packageCSS)) {
	console.error(
		`\n  FORBIDDEN  composable.css must not contain @import 'tailwindcss'.\n` +
			`             The build script owns that import. See scripts/build-css.ts.`,
	)
	failed = true
}

// 8. Report
if (failed) {
	console.error(
		'\nFAIL: dist/styles.css is missing expected tokens or utilities.\n' +
			'This means a consumer importing @leitware/composables/styles.css\n' +
			'will get broken styling. Check the build:css output.',
	)
	process.exit(1)
} else {
	const sizeKB = (readFileSync(DIST_CSS).byteLength / 1024).toFixed(1)
	console.log(`\nPASS: All expected tokens and utilities present. (${sizeKB} KB)`)
}
