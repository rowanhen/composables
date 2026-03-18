/**
 * LineItemHeader
 * ─────────────────────────────────────────────────────────────────────────────
 * A reversed-out block label that visually separates content sections in
 * receipt/list layouts.
 *
 * Uses primary tokens: bg-primary / text-primary-foreground (matches Button default).
 *
 * Variants:
 *   default   — filled background (foreground) with contrasting text (background)
 *   bordered  — transparent background with border
 */

import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from '../lib/utils'

const lineItemHeaderVariants = cva(
	"text-sm font-bold px-[calc(var(--spacing)*3)] py-[calc(var(--spacing)*1)] rounded-md",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground",
				bordered:
					"bg-transparent text-foreground border-[length:var(--border-width)] border-stroke",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
)

export interface LineItemHeaderProps extends React.ComponentProps<"div"> {
	variant?: "default" | "bordered"
	centered?: boolean
}

function LineItemHeader({
	variant = "default",
	centered = false,
	className,
	...props
}: LineItemHeaderProps) {
	return (
		<div
			data-slot="line-item-header"
			data-variant={variant}
			className={cn(lineItemHeaderVariants({ variant }), centered && "text-center", className)}
			{...props}
		/>
	)
}

export { LineItemHeader, lineItemHeaderVariants }
