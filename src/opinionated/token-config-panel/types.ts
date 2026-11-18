import type { PresetTokens, TokenName } from '../../styles/tokens/types'
/* ------------------------------------------------------------------ */
/*  Shared types for token-config-panel                                 */
/* ------------------------------------------------------------------ */

export interface FlatToken {
	cssVar: TokenName
	category: string
	label: string
}

export interface DimensionToken {
	cssVar: TokenName
	label: string
	defaultValue: number
	min: number
	max: number
	step: number
	unit: string
}

export interface FactorToken {
	cssVar: TokenName
	label: string
	/** Base token the factor multiplies - the override is written as calc(var(base) * factor). */
	base: '--radius-base' | '--spacing'
	defaultFactor: number
	min: number
	max: number
	step: number
	/** Offers a "Pill" toggle that writes 9999px instead of a factor. */
	allowPill?: boolean
}

export interface StringToken {
	cssVar: TokenName
	label: string
	defaultValue: string
	placeholder?: string
}

export interface Preset {
	label: string
	description: string
	overrides: PresetTokens
	darkOverrides: PresetTokens
}

export interface FontGroup {
	label: string
	fonts: string[]
}
