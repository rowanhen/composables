/**
 * LineItem
 * ─────────────────────────────────────────────────────────────────────────────
 * A single key-value row for receipt-style layouts.
 *
 * Use `fill` to add a divider leader between label and value (like a classic
 * menu or receipt). Use `bold` for totals. Use `compact` to reduce vertical
 * spacing.
 *
 * The fill variant uses the Divider component for dot/solid/pills leaders.
 * Control the divider style with `dividerVariant` and hide it (while preserving
 * layout) with `hideDivider`.
 *
 * Variants:
 *   default  — label left, value right, standard weight
 *   fill     — divider leader fill between label and value
 *   bold     — bold weight (use for totals/subtotals)
 *   compact  — tighter vertical padding + smaller text
 */

import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '../lib/utils'
import { Divider } from './divider'

const lineItemVariants = cva('flex items-end gap-1', {
	variants: {
		variant: {
			default: 'py-1',
			fill: 'py-1',
			bold: 'py-1.5',
			compact: 'py-0.5',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
})

export interface LineItemProps extends Omit<React.ComponentProps<'div'>, 'children'> {
	label: React.ReactNode
	value: React.ReactNode
	variant?: 'default' | 'fill' | 'bold' | 'compact'
	/** Which Divider variant to use in the fill area. Only applies when variant="fill". @default "dots" */
	dividerVariant?: 'solid' | 'dots' | 'pills'
	/** Hides the divider but preserves the spacing/layout between label and value. Only applies when variant="fill". */
	hideDivider?: boolean
	/** Multiplier for pills width when dividerVariant="pills". Passed to Divider's pillsMultiplier prop. */
	pillsMultiplier?: number
	/** Vertical alignment of the divider within its line. @default "end" */
	dividerAlign?: 'start' | 'center' | 'end'
}

function LineItem({
	label,
	value,
	variant = 'default',
	dividerVariant = 'dots',
	hideDivider = false,
	pillsMultiplier,
	dividerAlign = 'end',
	className,
	...props
}: LineItemProps) {
	const hasFill = variant === 'fill'

	return (
		<div
			data-slot="line-item"
			data-variant={variant}
			className={cn(lineItemVariants({ variant }), className)}
			{...props}
		>
			<span className={hasFill ? 'shrink-0 max-w-[50%]' : undefined}>{label}</span>
			{hasFill ? (
				<>
					{hideDivider ? (
						<span className="flex-1 min-w-[2ch]" aria-hidden />
					) : (
						<span className="flex-1 min-w-[2ch] mb-[4px]" aria-hidden>
							<Divider
								variant={dividerVariant}
								align={dividerAlign}
								color="var(--text-muted)"
								{...(pillsMultiplier !== undefined ? { pillsMultiplier } : {})}
							/>
						</span>
					)}
					<span className="shrink-0 max-w-[50%] text-right">{value}</span>
				</>
			) : (
				<span className="flex-1 text-right">{value}</span>
			)}
		</div>
	)
}

export { LineItem, lineItemVariants }
