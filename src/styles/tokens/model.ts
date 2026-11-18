import { tokens } from './definitions'
import type { TokenCategory, TokenDefinition } from './schema'
import type { ThemeName } from './themes'
export type TokenName = keyof typeof tokens
export type NamesIn<C extends TokenCategory> = {
	[K in TokenName]: (typeof tokens)[K]['category'] extends C ? K : never
}[TokenName]
export const entries = Object.entries(tokens) as [TokenName, TokenDefinition][]
export function themeValues(theme: ThemeName, mode: 'light' | 'dark'): Record<TokenName, string> {
	return Object.fromEntries(
		entries.map(([name, token]) => {
			const value = token.values[theme]
			return [name, typeof value === 'string' ? value : value[mode === 'light' ? 0 : 1]]
		}),
	) as Record<TokenName, string>
}
export function categoryValues<C extends TokenCategory>(category: C): Record<NamesIn<C>, string> {
	const values = themeValues('default', 'light')
	return Object.fromEntries(
		entries.filter(([, t]) => t.category === category).map(([name]) => [name, values[name]]),
	) as Record<NamesIn<C>, string>
}

/** Discoverable examples derived mechanically from Tailwind namespaces. No second token registry. */
export function utilityClasses(name: TokenName, token: TokenDefinition): string[] {
	const registrations = token.category === 'foundation' ? [name, ...token.tailwind] : token.tailwind
	return [
		...new Set([
			...Object.keys(token.utilities),
			...registrations.flatMap((alias) => {
				const match = alias.match(
					/^--(transition-duration|font-weight|z-index|color|spacing|radius|text|leading|shadow|ease|font|tracking|opacity|container)-(.+)$/,
				)
				if (!match || match[2].includes('--')) return []
				const [, namespace, role] = match
				let prefixes: string[]
				if (namespace === 'color') {
					prefixes =
						token.category === 'text' || /content|foreground|placeholder/.test(role)
							? ['text']
							: token.category === 'icon'
								? ['text', 'fill', 'stroke']
								: token.category === 'chart'
									? ['fill', 'stroke']
									: token.category === 'border' || /stroke|ring|invalid/.test(role)
										? ['border', 'ring', 'outline']
										: ['bg']
				} else {
					prefixes =
						(
							{
								'transition-duration': ['duration'],
								'font-weight': ['font'],
								'z-index': ['z'],
								spacing: ['h', 'w', 'p', 'gap'],
								radius: ['rounded'],
								text: ['text'],
								leading: ['leading'],
								shadow: ['shadow'],
								ease: ['ease'],
								font: ['font'],
								tracking: ['tracking'],
								opacity: ['opacity'],
								container: ['max-w'],
							} as Record<string, string[]>
						)[namespace] ?? []
				}
				return prefixes.map((prefix) => `${prefix}-${role}`)
			}),
		]),
	]
}
