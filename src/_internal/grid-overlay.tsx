import * as React from 'react'

import { cn } from '../lib/utils'

interface GridOverlayProps extends React.ComponentProps<'div'> {
	/** Grid line color. Defaults to a subtle black/white depending on context. */
	color?: string
}

/**
 * GridOverlay — renders a full-viewport grid background aligned to the
 * spacing system. Grid cells are `calc(var(--spacing) * 12)` wide/tall
 * and the pattern is horizontally centered so that containers whose
 * widths are multiples of 96 px snap exactly to the lines.
 *
 * The overlay is fixed, non-interactive (`pointer-events: none`), and
 * sits at `z-[9999]` so it floats above all content.
 *
 * @example
 * ```tsx
 * <GridOverlay />
 * <GridOverlay color="rgba(0, 100, 255, 0.1)" />
 * ```
 */
function GridOverlay({ color, className, style, ...props }: GridOverlayProps) {
	const lineColor = color ?? 'var(--grid-overlay-color, rgba(0, 0, 0, 0.06))'

	return (
		<div
			data-slot="grid-overlay"
			aria-hidden="true"
			className={cn('pointer-events-none fixed inset-0 z-[9999]', className)}
			style={{
				backgroundImage: `
          linear-gradient(to right, ${lineColor} 1px, transparent 1px),
          linear-gradient(to bottom, ${lineColor} 1px, transparent 1px)
        `,
				backgroundSize: 'calc(var(--spacing) * 12) calc(var(--spacing) * 12)',
				backgroundPosition: 'center center',
				...style,
			}}
			{...props}
		/>
	)
}

export { GridOverlay }
export type { GridOverlayProps }
