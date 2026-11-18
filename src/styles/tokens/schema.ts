import type { ThemeName } from './themes'

export type TokenCategory =
	| 'bg'
	| 'text'
	| 'icon'
	| 'border'
	| 'chart'
	| 'foundation'
	| 'system'
	| 'component'
export interface TokenDefinition {
	category: TokenCategory
	group: string
	description: string
	/** Native Tailwind registrations, colocated with the value they expose. */
	tailwind: readonly `--${string}`[]
	/** Guaranteed framework-independent utilities: class -> CSS declarations. */
	utilities: Readonly<Record<string, Readonly<Record<string, string>>>>
	compat: readonly `--${string}`[]
	/** A string applies in both modes; a pair is [light, dark]. Every theme is required. */
	values: Readonly<Record<ThemeName, string | readonly [string, string]>>
}
