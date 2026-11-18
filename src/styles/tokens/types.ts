import type { CSSProperties } from 'react'
import { sidebarColorCssVars } from './registry'

export type FoundationTokenName = NamesIn<'foundation'>
export type SystemTokenName = NamesIn<'system'>
export type ComponentTokenName = NamesIn<'component'>
export type SidebarTokenName = (typeof sidebarColorCssVars)[number]
export type { TokenName } from './model'
import type { TokenName, NamesIn } from './model'
import { entries } from './model'
/** Exact keys: misspellings and compatibility aliases are rejected. */
export type TokenOverrides = Partial<Record<TokenName, string>>
/** Every theme supplies every token in both modes; no geometry or colour inheritance. */
export type PresetTokens = Record<TokenName, string>
export type TokenStyle = CSSProperties & TokenOverrides

export const tokenNames: readonly TokenName[] = entries.map(([name]) => name)
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
