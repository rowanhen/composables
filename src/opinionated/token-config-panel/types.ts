/* ------------------------------------------------------------------ */
/*  Shared types for token-config-panel                                 */
/* ------------------------------------------------------------------ */

export interface FlatToken {
	cssVar: string
	reference: string
	category: string
	label: string
}

export interface DimensionToken {
	cssVar: string
	label: string
	defaultValue: number
	min: number
	max: number
	step: number
	unit: string
}

export interface FactorToken {
	cssVar: string
	label: string
	/** Base token the factor multiplies — the override is written as calc(var(base) * factor). */
	base: '--radius' | '--spacing'
	defaultFactor: number
	min: number
	max: number
	step: number
	/** Offers a "Pill" toggle that writes 9999px instead of a factor. */
	allowPill?: boolean
}

export interface StringToken {
	cssVar: string
	label: string
	defaultValue: string
	placeholder?: string
}

export interface Preset {
	label: string
	description: string
	overrides: Record<string, string>
	darkOverrides: Record<string, string>
}

export interface FontGroup {
	label: string
	fonts: string[]
}
