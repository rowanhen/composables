/**
 * test-downstream-css.ts
 *
 * Validates that dist/styles.css (the pre-compiled CSS shipped to consumers)
 * contains the expected design tokens and Tailwind utility classes.
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
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = join(import.meta.dir, '..')
const DIST_CSS = join(ROOT, 'dist/styles.css')

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

// 5. Check the source CSS doesn't contain @import 'tailwindcss'
const packageCSS = readFileSync(join(ROOT, 'src/styles/composable.css'), 'utf-8')

if (/@import ['"]tailwindcss['"]/.test(packageCSS)) {
	console.error(
		`\n  FORBIDDEN  composable.css must not contain @import 'tailwindcss'.\n` +
			`             The build script owns that import. See scripts/build-css.ts.`,
	)
	failed = true
}

// 6. Report
if (failed) {
	console.error(
		'\nFAIL: dist/styles.css is missing expected tokens or utilities.\n' +
			'This means a consumer importing @leitware/composables-cli/styles.css\n' +
			'will get broken styling. Check the build:css output.',
	)
	process.exit(1)
} else {
	const sizeKB = (readFileSync(DIST_CSS).byteLength / 1024).toFixed(1)
	console.log(`\nPASS: All expected tokens and utilities present. (${sizeKB} KB)`)
}
