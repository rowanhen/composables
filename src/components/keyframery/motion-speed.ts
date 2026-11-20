import type { CSSProperties } from 'react'

/** `"fast"` (0.6×), `"normal"` (1×), `"slow"` (1.4×), or any multiplier: `0.8` is 20% quicker. */
export type Speed = 'fast' | 'normal' | 'slow' | number

export type SpeedProps = {
	/** How fast the component moves. `"fast"` (0.6×), `"normal"` (1×), `"slow"` (1.4×), or a multiplier like `0.8`. Popups follow it too. */
	speed?: Speed
}

const presets = { fast: 0.6, normal: 1, slow: 1.4 } as const

export function speedValue(speed: Speed | undefined): number | undefined {
	if (speed === undefined) return undefined
	return typeof speed === 'number' ? speed : presets[speed]
}

/* Adds a speed to a part's own `style`, for a part that takes `speed` and renders in a portal. */
export function withSpeed<S>(style: S, speed: Speed | undefined): S {
	const value = speedValue(speed)
	if (value === undefined) return style
	if (typeof style === 'function')
		return ((state: unknown) => ({
			'--kf-speed': value,
			...(style as (s: unknown) => CSSProperties)(state),
		})) as S
	return { '--kf-speed': value, ...(style as CSSProperties | undefined) } as S
}
