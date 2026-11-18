import { systemDefaults } from './system-tokens'
import type { CSSProperties } from 'react'
import { componentDefaults } from './component-tokens'
import { foundationDefaults } from './foundations'
import { semanticColorTokens, sidebarColorCssVars } from './registry'
import type { SemanticColorName } from './registry'

export type FoundationTokenName = keyof typeof foundationDefaults
export type SystemTokenName = keyof typeof systemDefaults
export type ComponentTokenName = keyof typeof componentDefaults
export type SidebarTokenName = (typeof sidebarColorCssVars)[number]
export type TokenName =
	| SemanticColorName
	| SidebarTokenName
	| FoundationTokenName
	| SystemTokenName
	| ComponentTokenName
	| '--radius-base'
/** Exact keys: misspellings and compatibility aliases are rejected. */
export type TokenOverrides = Partial<Record<TokenName, string>>
/** Every preset supplies complete light/dark colour roles; geometry can inherit defaults. */
export type PresetTokens = Record<SemanticColorName | SidebarTokenName, string> & TokenOverrides
export type TokenStyle = CSSProperties & TokenOverrides

export const tokenNames: readonly TokenName[] = [
	...semanticColorTokens.map((token) => token.cssVar),
	...sidebarColorCssVars,
	...(Object.keys(foundationDefaults) as FoundationTokenName[]),
	...(Object.keys(systemDefaults) as SystemTokenName[]),
	...(Object.keys(componentDefaults) as ComponentTokenName[]),
	'--radius-base',
]
const knownTokens = new Set<string>(tokenNames)
export function isTokenName(value: string): value is TokenName {
	return knownTokens.has(value)
}
/** Use in inline styles and custom recipes without untyped CSS variable strings. */
export function tokenVar<T extends TokenName>(name: T): `var(${T})` {
	return `var(${name})`
}
export function defineTokens<T extends TokenOverrides>(
	tokens: T & Record<Exclude<keyof T, TokenName>, never>,
): T {
	return tokens
}

/** Validate JSON/editor input at the boundary before applying CSS. */
export function parseTokenOverrides(input: unknown): TokenOverrides {
	if (!input || typeof input !== 'object' || Array.isArray(input))
		throw new Error('Expected a token object')
	const result: TokenOverrides = {}
	for (const [name, value] of Object.entries(input)) {
		if (!isTokenName(name)) throw new Error(`Unknown token: ${name}`)
		if (typeof value !== 'string' || !value.trim() || /[;{}<>]/.test(value))
			throw new Error(`Invalid value for ${name}`)
		result[name] = value
	}
	return result
}
