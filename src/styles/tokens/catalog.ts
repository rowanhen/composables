import { foundationDefaults } from './foundations'
import { systemDefaults } from './system-tokens'
import { componentDefaults } from './component-tokens'
import { semanticColorTokens, sidebarColorCssVars } from './registry'
import { tokenNames, type TokenName } from './types'

export type TokenLayer = 'foundation' | 'semantic' | 'system' | 'component'
export interface TokenMetadata {
	name: TokenName
	layer: TokenLayer
	group: string
	description: string
}
const semantic = new Map<string, (typeof semanticColorTokens)[number]>(
	semanticColorTokens.map((token) => [token.cssVar, token]),
)
const categoryDescriptions = {
	bg: 'Background paint. Surface roles cover areas; fill roles cover emphasis and selection.',
	text: 'Readable foreground. Pair on-fill/on-surface roles with the named background.',
	icon: 'Icon foreground; independent from text for decorative and status glyphs.',
	border: 'Boundary or focus colour; use stroke utilities, independently from fill and text.',
	chart: 'Categorical data-series colour. Sequence numbers express identity, not intensity.',
}
export const tokenCatalog: readonly TokenMetadata[] = tokenNames.map((name) => {
	const colour = semantic.get(name)
	if (colour)
		return {
			name,
			layer: 'semantic',
			group: colour.category,
			description: categoryDescriptions[colour.category],
		}
	if ((sidebarColorCssVars as readonly string[]).includes(name))
		return {
			name,
			layer: 'component',
			group: 'sidebar',
			description: 'Independent navigation colour role; presets own light and dark values.',
		}
	if (name in foundationDefaults || name === '--radius-base')
		return {
			name,
			layer: 'foundation',
			group: name.split('-')[2],
			description:
				'Native scale or scale input. Components select a semantic role from this scale.',
		}
	if (name in systemDefaults)
		return {
			name,
			layer: 'system',
			group: name.split('-')[2],
			description:
				'Shared role for the internal building blocks. Override here to change the family consistently.',
		}
	if (name in componentDefaults)
		return {
			name,
			layer: 'component',
			group: name.split('-')[2],
			description:
				'Component-specific override. Inherits the shared system decision unless customized.',
		}
	throw new Error(`Missing metadata for ${name}`)
})
