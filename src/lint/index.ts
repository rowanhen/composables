import { readFileSync } from 'node:fs'
import type { RuleTester } from 'oxlint/plugins-dev'
import { cssVariables, semanticUtilities } from '../styles/theme.ts'

type Rule = Parameters<RuleTester['run']>[1]
type CreateRule = NonNullable<Rule['create']>
type RuleContext = Parameters<CreateRule>[0]
type Visitors = ReturnType<CreateRule>
type AstNode = Parameters<NonNullable<Visitors[string]>>[0]

const stylesheet = readFileSync(new URL(import.meta.resolve('#styles/composable.css')), 'utf8')
const utilities = readFileSync(new URL(import.meta.resolve('#styles/tailwind.css')), 'utf8')
const rules = semanticUtilities(utilities)
const publicClasses = new Set(rules.map(({ name }) => name))
const colorTokens = new Set(rules.map(({ token }) => token))
const radiusToken =
	/^--(?:radius(?:-(?:xs|sm|md|lg|xl|[2-4]xl))?|(?:button|card|field|overlay|input|dialog|badge|checkbox)-radius)$/
const palette =
	/^(?:(?:inherit|current|transparent)|(?:(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|mauve|olive|mist|taupe|jade|mint|grass|bronze|gold|tomato|crimson|plum|iris|navy|sand|ruby|brown)-(?:\d{1,4}|a\d+))|black|white)$/
const internalColors = new Set(
	[...cssVariables(stylesheet).keys()]
		.filter((name) => name.startsWith('--color-'))
		.map((name) => name.slice('--color-'.length)),
)
const nativeControls = new Map([
	['button', 'Button'],
	['input', 'Input'],
	['select', 'NativeSelect'],
	['textarea', 'Textarea'],
])
const literal = (node: AstNode | null | undefined) =>
	node?.type === 'Literal' && typeof node.value === 'string' ? node.value : undefined

function useOpinionatedComponents(context: RuleContext): Visitors {
	function checkImport(source: AstNode | null | undefined) {
		const path = literal(source)
		if (
			source &&
			path &&
			(/^(?:@ui-sdk\/react|@base-ui\/(?:react|react-dom)|radix-ui|shadcn)(?:\/|$)|^@radix-ui\/react-/.test(
				path,
			) ||
				/(?:^|\/)(?:components\/(?:keyframery|ui)|_internal|opinionated)(?:\/|$)/.test(path))
		) {
			context.report({
				node: source,
				message: `Use @leitware/composables instead of ${path} for opinionated components.`,
			})
		}
	}

	return {
		ImportDeclaration: (node) => checkImport(node.source),
		ExportNamedDeclaration: (node) => checkImport(node.source),
		ExportAllDeclaration: (node) => checkImport(node.source),
		ImportExpression: (node) => checkImport(node.source),
		CallExpression(node) {
			if (node.callee.type === 'Identifier' && node.callee.name === 'require')
				checkImport(node.arguments[0])
		},
		JSXOpeningElement(node) {
			if (node.name.type !== 'JSXIdentifier') return
			const control = node.name.name
			const replacement = nativeControls.get(control)
			if (!replacement) return
			if (
				control === 'input' &&
				node.attributes.some(
					(attribute) =>
						attribute.type === 'JSXAttribute' &&
						attribute.name.name === 'type' &&
						literal(jsxValue(attribute.value)) === 'hidden',
				)
			)
				return
			context.report({
				node: node.name,
				message: `Use ${replacement} from @leitware/composables for this control.`,
			})
		},
	}
}

function splitOutsideBrackets(value: string, delimiter: string) {
	const parts = []
	let depth = 0
	let start = 0
	for (let index = 0; index < value.length; index++) {
		if (value[index] === '[' || value[index] === '(') depth++
		if (value[index] === ']' || value[index] === ')') depth--
		if (depth === 0 && value[index] === delimiter) {
			parts.push(value.slice(start, index))
			start = index + 1
		}
	}
	parts.push(value.slice(start))
	return parts
}

function onlyTokenVariables(value: string, allowed: (token: string) => boolean) {
	const references = [...value.matchAll(/var\((--[\w-]+)\)/g)]
	return (
		references.length > 0 &&
		references.every(([, token]) => allowed(token)) &&
		!/(?:#[\da-f]{3,8}\b|\b(?:rgb|hsl|oklch)a?\()/i.test(value)
	)
}

function isRadiusValue(value: string) {
	return (
		onlyTokenVariables(value, (token) => radiusToken.test(token)) &&
		!/\d(?:px|r?em|%|vh|vw)\b/i.test(value)
	)
}

function classProblem(candidate: string) {
	const variants = splitOutsideBrackets(candidate, ':')
	const utility = variants[variants.length - 1].replace(/(^!|!$)/g, '')
	const [name] = splitOutsideBrackets(utility, '/')
	const radius =
		/^(?:rounded(?:-(?:t|r|b|l|s|e|tl|tr|bl|br|ss|se|es|ee))?-(?:\[(.*)\]|\((.*)\))|\[border(?:-[a-z]+)*-radius:(.*)\])$/.exec(
			name,
		)
	if (radius) {
		const value = radius[1] ?? radius[2] ?? radius[3]
		if (!(radius[2] ? radiusToken.test(value) : isRadiusValue(value))) {
			return 'Use a radius scale utility such as rounded-md or a Composables radius token.'
		}
		return
	}
	if (publicClasses.has(name)) return

	const colorProperty =
		/^\[(?:color|(?:background|border(?:-[a-z]+)?|outline|text-decoration|accent|caret)-color|fill|stroke):(.*)\]$/.exec(
			name,
		)
	if (colorProperty) {
		if (
			!/^(?:inherit|currentcolor|transparent|none)$/i.test(colorProperty[1]) &&
			!onlyTokenVariables(colorProperty[1], (token) => colorTokens.has(token))
		) {
			return 'Use a public semantic color utility or a registered semantic color variable.'
		}
		return
	}

	const color =
		/^(bg|text|border(?:-[trblesxy])?|divide|outline|ring(?:-offset)?|fill|stroke|decoration|accent|caret|placeholder|from|via|to)-(.*)$/.exec(
			name,
		)
	if (!color) return
	const [, prefix, value] = color
	const arbitrary = /^(?:\[(.*)\]|\((--[\w-]+)\))$/.exec(value)
	if (arbitrary) {
		const raw = arbitrary[1] ?? `var(${arbitrary[2]})`
		if (/^(?:url\(|image:|position:|size:|length:|number:|line-width:|(?:-?\d|calc\())/.test(raw))
			return
		if (
			!onlyTokenVariables(raw, (token) => colorTokens.has(token)) &&
			(/^(?:color:|var\(|color-mix\(|#|(?:rgb|hsl|oklch)a?\()/i.test(raw) || /^[a-z]+$/i.test(raw))
		) {
			return 'Use a public semantic color utility or a registered semantic color variable.'
		}
		return
	}

	if (
		!/^(?:inherit|current|transparent)$/.test(value) &&
		(palette.test(value) ||
			internalColors.has(value) ||
			/^(?:surface-|fill-|on-fill-|stroke-|icon-|chart-|brand-|bg-|text-|border-)/.test(value) ||
			(prefix !== 'bg' && colorTokens.has(`--bg-${value}`)) ||
			(prefix !== 'text' && colorTokens.has(`--text-${value}`)))
	) {
		return 'Use a public semantic color utility for this CSS property.'
	}
}

function jsxValue(node: AstNode | null) {
	return node?.type === 'JSXExpressionContainer' ? node.expression : node
}

function staticClasses(
	node: AstNode | null | undefined,
	visit: (node: AstNode, value: string) => void,
) {
	if (!node) return
	switch (node.type) {
		case 'Literal':
			if (typeof node.value === 'string') visit(node, node.value)
			break
		case 'TemplateLiteral':
			for (const part of node.quasis) visit(part, part.value.cooked ?? part.value.raw)
			break
		case 'ConditionalExpression':
			staticClasses(node.consequent, visit)
			staticClasses(node.alternate, visit)
			break
		case 'LogicalExpression':
			if (node.operator !== '&&') staticClasses(node.left, visit)
			staticClasses(node.right, visit)
			break
		case 'ArrayExpression':
			for (const next of node.elements) staticClasses(next, visit)
			break
		case 'ObjectExpression':
			for (const property of node.properties) {
				if (property.type === 'Property') staticClasses(property.key, visit)
			}
			break
		case 'CallExpression':
			if (isClassHelper(node)) for (const arg of node.arguments) staticClasses(arg, visit)
			break
	}
}

function isClassHelper(node: Extract<AstNode, { type: 'CallExpression' }>) {
	return (
		node.callee.type === 'Identifier' && /^(?:cn|clsx|classnames|twMerge)$/.test(node.callee.name)
	)
}

function useSemanticTokens(context: RuleContext): Visitors {
	const inspected = new Set<AstNode>()
	function checkClasses(node: AstNode, value: string) {
		if (inspected.has(node)) return
		inspected.add(node)
		for (const candidate of value.trim().split(/\s+/)) {
			const problem = classProblem(candidate)
			if (problem) context.report({ node, message: `${candidate}: ${problem}` })
		}
	}

	function checkStyle(expression: AstNode | null) {
		if (expression?.type !== 'ObjectExpression') return
		for (const property of expression.properties) {
			if (property.type !== 'Property') continue
			const key = property.key.type === 'Identifier' ? property.key.name : literal(property.key)
			if (key === undefined) continue
			const color =
				/^(?:backgroundColor|color|border(?:Top|Right|Bottom|Left)?Color|outlineColor|textDecorationColor|fill|stroke|caretColor|accentColor)$/.test(
					key,
				)
			const radius =
				/^border(?:TopLeft|TopRight|BottomLeft|BottomRight|StartStart|StartEnd|EndStart|EndEnd)?Radius$/.test(
					key,
				)
			if (!color && !radius) continue
			staticClasses(property.value, (node, value) => {
				if (color && /^(?:inherit|currentcolor|transparent|none)$/i.test(value)) return
				if (radius && /^(?:0|inherit|initial)$/.test(value)) return
				const valid = color
					? onlyTokenVariables(value, (token) => colorTokens.has(token))
					: isRadiusValue(value)
				if (!valid) {
					context.report({
						node,
						message: `Use a Composables semantic ${color ? 'color' : 'radius'} token for ${key}.`,
					})
				}
			})
			if (
				radius &&
				property.value.type === 'Literal' &&
				typeof property.value.value === 'number' &&
				property.value.value !== 0
			) {
				context.report({
					node: property.value,
					message: `Use a Composables radius token for ${key}.`,
				})
			}
		}
	}

	return {
		JSXAttribute(node) {
			if (node.name.name === 'className') staticClasses(jsxValue(node.value), checkClasses)
			if (node.name.name === 'style') checkStyle(jsxValue(node.value))
		},
		CallExpression(node) {
			if (isClassHelper(node)) for (const arg of node.arguments) staticClasses(arg, checkClasses)
		},
	}
}

export default {
	meta: { name: 'composables' },
	rules: {
		'use-opinionated-components': { create: useOpinionatedComponents },
		'use-semantic-tokens': { create: useSemanticTokens },
	},
}
