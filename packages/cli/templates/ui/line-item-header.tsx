/**
 * LineItemHeader
 * ─────────────────────────────────────────────────────────────────────────────
 * A reversed-out block label that visually separates content sections in
 * ledger/list layouts.
 *
 * Uses primary tokens: bg-primary / text-primary-foreground (matches Button default).
 *
 * Variants:
 *   default   — filled background (foreground) with contrasting text (background)
 *   bordered  — transparent background with top/bottom borders
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const lineItemHeaderVariants = cva("text-sm font-bold px-2 py-0.5 rounded-md", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground",
			bordered:
				"bg-transparent text-foreground border-[length:var(--border-width)] border-border",
		},
	},
	defaultVariants: {
		variant: "default",
	},
})

export interface LineItemHeaderProps extends React.ComponentProps<"div"> {
	variant?: "default" | "bordered"
}

function LineItemHeader({ variant = "default", className, ...props }: LineItemHeaderProps) {
	return (
		<div
			data-slot="line-item-header"
			data-variant={variant}
			className={cn(lineItemHeaderVariants({ variant }), className)}
			{...props}
		/>
	)
}

export { LineItemHeader, lineItemHeaderVariants }
export type { VariantProps }
