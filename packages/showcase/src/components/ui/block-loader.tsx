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
	mode?: number
	/** Frame interval in milliseconds. Defaults to 100. */
	intervalMs?: number
}

function BlockLoader({ mode = 1, intervalMs = 100, className, ...props }: BlockLoaderProps) {
	const sequence = SEQUENCES[mode] ?? SEQUENCES[0]
	const [index, setIndex] = React.useState(0)

	React.useEffect(() => {
		const id = window.setInterval(() => {
			setIndex((prev) => (prev + 1) % sequence.length)
		}, intervalMs)
		return () => clearInterval(id)
	}, [sequence.length, intervalMs])

	return (
		<span
			data-slot="block-loader"
			className={cn('inline-block w-[1em] text-center', className)}
			aria-label="Loading"
			aria-live="polite"
			{...props}
		>
			{sequence[index]}
		</span>
	)
}

export { BlockLoader }
