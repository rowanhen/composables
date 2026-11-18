/** All public views are derived from the sole token inventory in definitions.ts. */
import { entries } from './model'
import type { NamesIn, TokenName } from './model'
import type { TokenCategory } from './schema'
type ColorCategory = Exclude<TokenCategory, 'foundation' | 'system' | 'component'>
export type SemanticColorName = NamesIn<ColorCategory>
export type SemanticColorToken = {
	cssVar: SemanticColorName
	category: ColorCategory
	label: string
}
export interface CssAlias {
	cssVar: string
	target: SemanticColorName
}
export interface TailwindColorAlias {
	cssVar: string
	target: TokenName
}
export type SemanticUtilityClassName = {
	[K in SemanticColorName]: keyof (typeof import('./definitions').tokens)[K]['utilities']
}[SemanticColorName]
export interface PublicSemanticUtility {
	className: SemanticUtilityClassName
	declarations: ReadonlyArray<readonly [property: string, value: string]>
	category: ColorCategory
	token: SemanticColorName
}
export const semanticColorTokens: SemanticColorToken[] = entries
	.filter(([, t]) => !['foundation', 'system', 'component'].includes(t.category))
	.map(([name, t]) => ({
		cssVar: name as SemanticColorName,
		category: t.category as ColorCategory,
		label: name.slice(t.category.length + 3),
	}))
export const sidebarColorCssVars = entries
	.filter(([name]) => name.startsWith('--sidebar-'))
	.map(([name]) => name) as Extract<TokenName, `--sidebar-${string}`>[]
export const tailwindColorAliases: TailwindColorAlias[] = entries.flatMap(([name, t]) =>
	t.tailwind
		.filter((alias) => alias.startsWith('--color-'))
		.map((cssVar) => ({ cssVar, target: name })),
)
export const shadcnCompatAliases: CssAlias[] = entries.flatMap(([name, t]) =>
	t.compat.map((cssVar) => ({ cssVar, target: name as SemanticColorName })),
)
export const publicSemanticUtilities: PublicSemanticUtility[] = semanticColorTokens.flatMap(
	(token) => {
		const definition = entries.find(([name]) => name === token.cssVar)![1]
		return Object.entries(definition.utilities).map(([className, declarations]) => ({
			className: className as SemanticUtilityClassName,
			declarations: Object.entries(declarations),
			category: token.category,
			token: token.cssVar,
		}))
	},
)
export const semanticColorCssVars = semanticColorTokens.map((t) => t.cssVar)
export const shadcnCompatCssVars = shadcnCompatAliases.map((t) => t.cssVar)
export const tailwindColorCssVars = tailwindColorAliases.map((t) => t.cssVar)
export const publicSemanticUtilityClassNames = publicSemanticUtilities.map((t) => t.className)
