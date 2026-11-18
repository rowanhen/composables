import { entries, utilityClasses } from './model'
import type { TokenName } from './model'
export type TokenLayer = 'foundation' | 'semantic' | 'system' | 'component'
export interface TokenMetadata {
	name: TokenName
	layer: TokenLayer
	group: string
	description: string
	utilities: readonly string[]
}
export const tokenCatalog: readonly TokenMetadata[] = entries.map(([name, token]) => ({
	name,
	layer: ['foundation', 'system', 'component'].includes(token.category)
		? (token.category as TokenLayer)
		: 'semantic',
	group: token.group,
	description: token.description,
	utilities: utilityClasses(name, token),
}))
