import { lintUtilitySource, lintStylesheetSource } from './lint-utilities'
import { tokenNames } from '../src/styles/tokens/types'
import ts from 'typescript'
import { readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { componentUtilityAliases } from '../src/styles/tokens/utility-aliases'
import { tailwindColorAliases, shadcnCompatCssVars } from '../src/styles/tokens/registry'

const known = new Set<string>([...tokenNames, '--spacing-', '--text-', '--shadow-', '--radius-'])
// Local layout measurements and explicitly documented third-party contracts.
// These are not preset tokens: each owner creates the value at the point of use.
const localVariables = new Set([
	'--active-tab-top',
	'--active-tab-left',
	'--active-tab-height',
	'--active-tab-width',
	'--card-space',
	'--transform-origin',
	'--divider-color',
	'--normal-text',
	'--border-radius',
	'--width',
	'--normal-bg',
	'--normal-border',
	'--accordion-panel-height',
	'--alert-accent',
	'--available-height',
	'--anchor-width',
	'--available-width',
	'--cell-size',
	'--cell-radius',
	'--sidebar-width',
	'--sidebar-width-icon',
	'--spread',
	'--bg',
	'--shiki-dark',
	'--shiki-dark-bg',
])
const colors = new Map(
	tailwindColorAliases.map((alias) => [alias.cssVar.slice('--color-'.length), alias.target]),
)
const nativeRoles = new Set(
	Object.keys(componentUtilityAliases).map((key) => key.replace(/^--[^-]+-/, '')),
)
const legacy = new Set(shadcnCompatCssVars)
const legacyUtility =
	/(?:^|[^\w-])(?:bg|text|border|ring|outline|fill|stroke|divide|ring-offset)-(?:background|foreground|card(?:-foreground)?|popover(?:-foreground)?|primary(?:-foreground)?|secondary(?:-foreground)?|muted-foreground|accent(?:-foreground)?|destructive|border|input|ring)(?![\w-])/g

/** Parse literals across multiline TSX, cva objects, and template fragments. */
export function lintTokenSource(source: string, file = 'component.tsx'): string[] {
	const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
	const issues: string[] = []
	function visit(node: ts.Node) {
		if (
			ts.isStringLiteralLike(node) ||
			ts.isTemplateHead(node) ||
			ts.isTemplateMiddle(node) ||
			ts.isTemplateTail(node)
		) {
			const text = node.text
			if (
				(ts.isTemplateHead(node) || ts.isTemplateMiddle(node)) &&
				/(?:^|[^\w-])(?:bg|text|border|ring|outline|fill|stroke)-[\w-]*$/.test(text)
			)
				issues.push(
					`${file}: dynamic colour class; use a typed/static variant map so Tailwind can discover it`,
				)
			const location = ast.getLineAndCharacterOfPosition(node.getStart(ast)).line + 1
			for (const match of text.matchAll(legacyUtility))
				issues.push(
					`${file}:${location}: generic colour utility ${match[0].trim()}; use an explicit semantic role`,
				)
			for (const match of text.matchAll(
				/(?:^|[^\w-])(bg|text|border|ring|outline|fill|stroke)-([a-z][a-z0-9-]*)/g,
			)) {
				const [, property, role] = match
				const target = colors.get(role)
				if (!target) {
					if (
						/^(?:content|surface|stroke|icon|fill|control)(?:-|$)/.test(role) &&
						!nativeRoles.has(role)
					)
						issues.push(`${file}:${location}: unknown semantic utility ${property}-${role}`)
					continue
				}
				// Dividers paint a boundary with background; avatar separation rings paint the page surface.
				const intentional =
					(property === 'bg' && (role === 'stroke' || role.startsWith('stroke-'))) ||
					(property === 'ring' && role === 'page')
				if (intentional) continue
				const allowed = target.startsWith('--bg-')
					? ['bg']
					: target.startsWith('--text-')
						? ['text']
						: target.startsWith('--border-')
							? ['border', 'ring', 'outline']
							: target.startsWith('--icon-')
								? ['text', 'fill', 'stroke']
								: target.startsWith('--chart-')
									? ['bg', 'fill', 'stroke']
									: null
				if (allowed && !allowed.includes(property))
					issues.push(
						`${file}:${location}: ${property}-${role} uses ${target} in the wrong property role`,
					)
			}

			for (const match of text.matchAll(/--[a-z][a-z0-9-]*/g)) {
				if (legacy.has(match[0]))
					issues.push(
						`${file}:${location}: compatibility token ${match[0]} is not an authoring token`,
					)
				else if (
					!known.has(match[0]) &&
					!localVariables.has(match[0]) &&
					!/^--(?:tw|radix|base-ui)-/.test(match[0])
				)
					issues.push(`${file}:${location}: unknown token ${match[0]}`)
			}
			if (
				/(?:^|[^\w-])(?:bg|text|border|ring|fill|stroke)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d/.test(
					text,
				)
			) {
				issues.push(`${file}:${location}: primitive colour utility; choose a semantic role`)
			}
		}
		ts.forEachChild(node, visit)
	}
	visit(ast)
	return issues
}

function files(path: string): string[] {
	return readdirSync(path, { withFileTypes: true }).flatMap((entry) =>
		entry.isDirectory()
			? files(join(path, entry.name))
			: /\.(ts|tsx|css)$/.test(entry.name)
				? [join(path, entry.name)]
				: [],
	)
}
if (import.meta.main) {
	const root = join(import.meta.dir, '..')
	const paths = [
		'src/_internal',
		'src/opinionated',
		'src/lib',
		'src/hooks',
		'src/_storybook',
		'showcase/src',
		'.storybook',
	].flatMap((dir) => files(join(root, dir)))
	const generatedCSS = new Set([
		'src/styles/tokens/semantic-utilities.css',
		'src/styles/tokens/tailwind-public-utilities.css',
		'src/styles/tokens/compat.css',
	])
	paths.push(
		...files(join(root, 'src/styles')).filter(
			(path) =>
				path.endsWith('.css') &&
				!relative(root, path).startsWith('src/styles/presets/') &&
				!generatedCSS.has(relative(root, path)),
		),
	)
	const issues = paths.flatMap((path) => [
		...(path.endsWith('.css')
			? lintStylesheetSource(readFileSync(path, 'utf8'), relative(root, path))
			: lintTokenSource(readFileSync(path, 'utf8'), relative(root, path))),
		...(path.endsWith('.css')
			? []
			: lintUtilitySource(readFileSync(path, 'utf8'), relative(root, path))),
	])
	if (issues.length) {
		console.error(issues.join('\n'))
		process.exit(1)
	}
	console.log(`Token authoring lint passed (${paths.length} files).`)
}
