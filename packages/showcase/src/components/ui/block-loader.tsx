/**
 * BlockLoader
 * ─────────────────────────────────────────────────────────────────────────────
 * Animated Unicode spinner with 11 sequence modes (0–10).
 *
 * Usage:
 *   <BlockLoader />          // default mode 1 (braille dots)
 *   <BlockLoader mode={6} /> // box-drawing spinner
 *   <BlockLoader mode={0} className="text-primary" />
 */

import * as React from 'react'
import { cn } from '@/lib/utils'

export const SEQUENCES = [
	['⠁', '⠂', '⠄', '⡀', '⢀', '⠠', '⠐', '⠈'],
	['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷'],
	['▖', '▘', '▝', '▗'],
	['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█', '▇', '▆', '▅', '▄', '▃', '▁'],
	['▉', '▊', '▋', '▌', '▍', '▎', '▏', '▎', '▍', '▌', '▋', '▊', '▉'],
	['←', '↖', '↑', '↗', '→', '↘', '↓', '↙'],
	['┤', '┘', '┴', '└', '├', '┌', '┬', '┐'],
	['◢', '◣', '◤', '◥'],
	['◰', '◳', '◲', '◱'],
	['◴', '◷', '◶', '◵'],
	['◐', '◓', '◑', '◒'],
] as const

export type BlockLoaderMode = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export interface BlockLoaderProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
	/** Spinner sequence (0–10). Defaults to 1. */
	mode?: BlockLoaderMode
	/** Frame interval in milliseconds. Defaults to 100. */
	intervalMs?: number
}

function BlockLoader({ mode = 1, intervalMs = 100, className, ...props }: BlockLoaderProps) {
	const sequence = SEQUENCES[mode] ?? SEQUENCES[0]
	const [index, setIndex] = React.useState(0)

	const prefersReducedMotion =
		typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

	React.useEffect(() => {
		if (prefersReducedMotion) return
		const id = setInterval(() => {
			setIndex((prev) => (prev + 1) % sequence.length)
		}, intervalMs)
		return () => clearInterval(id)
	}, [sequence.length, intervalMs, prefersReducedMotion])

	return (
		<span
			data-slot="block-loader"
			className={cn('inline-block w-[1em] text-center', className)}
			{...props}
		>
			{/* aria-hidden: screen readers must not announce every frame change */}
			<span aria-hidden="true">{sequence[prefersReducedMotion ? 0 : index]}</span>
			{/* Stable label for screen readers */}
			<span className="sr-only">Loading</span>
		</span>
	)
}

export { BlockLoader }
