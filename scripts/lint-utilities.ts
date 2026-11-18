import ts from 'typescript'
import { __unstable__loadDesignSystem } from '@tailwindcss/node'
import { join } from 'node:path'

// Use the installed compiler and the actual package stylesheet, never a second class allowlist.
const design = await __unstable__loadDesignSystem(
	"@import 'tailwindcss';\n@import 'tw-animate-css';\n@import './src/styles/composable.css';",
	{ base: join(import.meta.dir, '..') },
)
const cache = new Map<string, boolean>()
export function isUtility(candidate: string): boolean {
	if (/^(?:group|peer)(?:\/[\w-]+)?$/.test(candidate) || candidate === 'dark') return true
	let valid = cache.get(candidate)
	if (valid === undefined) {
		valid = design.candidatesToCss([candidate])[0] !== null
		cache.set(candidate, valid)
	}
	return valid
}
function isClassLiteral(node: ts.Node, bindings: ReadonlySet<string>): boolean {
	let child = node
	for (let parent = node.parent; parent; child = parent, parent = parent.parent) {
		if (ts.isPropertyAssignment(parent)) {
			if (parent.name === child) {
				let owner: ts.Node | undefined = parent.parent
				while (owner && !ts.isCallExpression(owner) && !ts.isStatement(owner)) owner = owner.parent
				return (
					!!owner &&
					ts.isCallExpression(owner) &&
					/^(?:cn|clsx|twMerge)$/.test(owner.expression.getText())
				)
			}
			if (parent.name.getText() === 'defaultVariants') return false
			if (
				ts.isObjectLiteralExpression(parent.parent) &&
				ts.isArrayLiteralExpression(parent.parent.parent) &&
				parent.name.getText() !== 'className' &&
				parent.name.getText() !== 'class'
			)
				return false
			if (/className$/i.test(parent.name.getText().replaceAll(/["']/g, ''))) return true
		}
		if (ts.isJsxAttribute(parent)) return /className$/i.test(parent.name.getText())
		if (ts.isConditionalExpression(parent) && parent.condition === child) return false
		if (
			ts.isBinaryExpression(parent) &&
			![
				ts.SyntaxKind.PlusToken,
				ts.SyntaxKind.AmpersandAmpersandToken,
				ts.SyntaxKind.BarBarToken,
			].includes(parent.operatorToken.kind)
		)
			return false
		if (ts.isCallExpression(parent))
			return /^(?:cn|cva|clsx|twMerge)$/.test(parent.expression.getText())
		if (ts.isVariableDeclaration(parent))
			return (
				bindings.has(parent.name.getText()) ||
				/(?:className|classNames|classes|^[A-Z_]*(?:RING|INDICATOR|OPACITY)[A-Z_]*$)/.test(
					parent.name.getText(),
				)
			)
		if (ts.isStatement(parent)) break
	}
	return false
}
export function lintUtilitySource(source: string, file = 'component.tsx'): string[] {
	const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
	const issues: string[] = []
	const bindings = new Set<string>()
	function collect(expression: ts.Node) {
		if (ts.isIdentifier(expression)) bindings.add(expression.text)
		else if (ts.isConditionalExpression(expression)) {
			collect(expression.whenTrue)
			collect(expression.whenFalse)
		} else if (ts.isBinaryExpression(expression)) {
			if (expression.operatorToken.kind !== ts.SyntaxKind.AmpersandAmpersandToken)
				collect(expression.left)
			collect(expression.right)
		} else if (
			ts.isCallExpression(expression) &&
			/^(?:cn|clsx|twMerge)$/.test(expression.expression.getText())
		)
			expression.arguments.forEach(collect)
		else if (ts.isParenthesizedExpression(expression) || ts.isJsxExpression(expression)) {
			if (expression.expression) collect(expression.expression)
		}
	}
	function collectRoots(node: ts.Node) {
		if (ts.isJsxAttribute(node) && /className$/i.test(node.name.getText()) && node.initializer)
			collect(node.initializer)
		if (ts.isCallExpression(node) && /^(?:cn|clsx|twMerge)$/.test(node.expression.getText()))
			node.arguments.forEach(collect)
		ts.forEachChild(node, collectRoots)
	}
	collectRoots(ast)
	let previous = -1
	while (previous !== bindings.size) {
		previous = bindings.size
		const propagate = (node: ts.Node) => {
			if (ts.isVariableDeclaration(node) && bindings.has(node.name.getText()) && node.initializer)
				collect(node.initializer)
			ts.forEachChild(node, propagate)
		}
		propagate(ast)
	}
	const report = (node: ts.Node, message: string) =>
		issues.push(
			`${file}:${ast.getLineAndCharacterOfPosition(node.getStart()).line + 1}: ${message}`,
		)
	function visit(node: ts.Node) {
		if (
			ts.isStringLiteralLike(node) ||
			ts.isTemplateHead(node) ||
			ts.isTemplateMiddle(node) ||
			ts.isTemplateTail(node)
		) {
			const value = node.text
			if (
				ts.isJsxAttribute(node.parent) &&
				/^(fill|stroke)$/.test(node.parent.name.getText()) &&
				!/^(?:none|inherit|currentColor|transparent|var\(--|url\(#)/.test(value)
			)
				report(node, 'SVG paint must consume a token or currentColor')
			if (/(?:#[\da-f]{3,8}\b|\b(?:rgba?|hsla?|oklch|oklab|lab|lch|color)\(\s*[\d.#])/i.test(value))
				report(
					node,
					'raw colour; define the value in tokens/definitions.ts and consume a semantic utility',
				)
			if (isClassLiteral(node, bindings)) {
				if (ts.isTemplateHead(node) || ts.isTemplateMiddle(node)) {
					if (value && !/\s$/.test(value))
						report(node, 'constructed class name; use complete static utility strings')
				}
				if (
					ts.isBinaryExpression(node.parent) &&
					node.parent.operatorToken.kind === ts.SyntaxKind.PlusToken
				)
					report(node, 'constructed class name; use complete static utility strings')
				for (const candidate of value.trim().split(/\s+/).filter(Boolean)) {
					if (
						/(?:^|:)(?:bg|text|border|ring|outline|fill|stroke|decoration)-(?:black|white)(?:$|\/)/.test(
							candidate,
						)
					)
						report(node, 'primitive colour utility; choose a semantic role')
					if (
						!isUtility(candidate) &&
						!(candidate === 'not-prose' && file.includes('/ai-elements/'))
					)
						report(node, `unknown utility ${candidate}`)
					// Structural arbitrary grid/measurement expressions remain valid. Visual values must name tokens.
					if (
						/(?:^|:)(?:bg|text|border(?:-[xytrblse])?|rounded(?:-[\w]+)?|shadow|ring|outline|fill|stroke|font|leading|tracking|duration|ease)-\[/.test(
							candidate,
						) &&
						!/var\(--|\[(?:inherit|currentColor|transparent)\]|bg-\[length:/.test(candidate)
					)
						report(node, `untokenized appearance ${candidate}`)
					if (
						/\[(?:color|background(?:-color)?|border-color|box-shadow|font-size|border-radius):/.test(
							candidate,
						) &&
						!/var\(--|\[(?:inherit|currentColor|transparent)\]|bg-\[length:/.test(candidate)
					)
						report(node, `untokenized appearance ${candidate}`)
				}
			}
		}
		if (
			ts.isPropertyAssignment(node) &&
			/^(?:color|backgroundColor|borderColor|boxShadow|textShadow|fontFamily|fontSize|borderRadius|transitionDuration)$/.test(
				node.name.getText().replaceAll(/["']/g, ''),
			)
		) {
			if (
				ts.isNumericLiteral(node.initializer) ||
				(ts.isStringLiteralLike(node.initializer) &&
					!/^(?:var\(--|inherit$|currentColor$|transparent$|none$)/.test(node.initializer.text))
			)
				report(node, 'inline appearance must consume a token or a utility')
		}
		ts.forEachChild(node, visit)
	}
	visit(ast)
	return issues
}

/** Generated CSS is covered by drift checks; authored styles must follow the same colour rule. */
export function lintStylesheetSource(source: string, file = 'styles.css'): string[] {
	const text = source.replace(/\/\*[\s\S]*?\*\//g, '')
	const issues: string[] = []
	if (/(?:#[\da-f]{3,8}\b|\b(?:rgba?|hsla?|oklch|oklab|lab|lch)\(\s*[\d.#])/i.test(text))
		issues.push(`${file}: raw colour; author the value in tokens/definitions.ts`)
	for (const match of text.matchAll(/(?:^|[\s,}])\.([a-z][\w-]*)/g))
		if (match[1] !== 'dark')
			issues.push(
				`${file}: authored class .${match[1]}; register a Tailwind @utility or use a component data-slot selector`,
			)
	return issues
}
