/**
 * Ledger Primitives — SectionLabel + Ledger
 * ─────────────────────────────────────────────────────────────────────────────
 * Information-dense ledger layout components for data-heavy UIs.
 * Inspired by thermal receipts, Bloomberg Terminal, and raw HTML aesthetics.
 *
 * SectionLabel uses primary tokens: bg-primary / text-primary-foreground.
 * Ledger uses LineItem internally.
 *
 * Usage:
 *   <Ledger
 *     title="Invoice #0042"
 *     rows={[
 *       { label: "Consulting", value: "$4,000", variant: "fill" },
 *       { label: "Expenses",   value: "$320",   variant: "fill" },
 *     ]}
 *     total={{ label: "Total", value: "$4,320" }}
 *   />
 */

import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Divider } from "@/components/ui/divider"
import { LineItem } from "@/components/ui/line-item"

const sectionLabelVariants = cva("text-sm font-bold px-2 py-0.5 rounded-md", {
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

export interface SectionLabelProps extends React.ComponentProps<"div"> {
	variant?: "default" | "bordered"
}

function SectionLabel({ variant = "default", className, ...props }: SectionLabelProps) {
	return (
		<div
			data-slot="section-label"
			data-variant={variant}
			className={cn(sectionLabelVariants({ variant }), className)}
			{...props}
		/>
	)
}

export interface LedgerRow {
	label: React.ReactNode
	value: React.ReactNode
	variant?: "default" | "fill" | "bold" | "compact"
	dividerVariant?: "solid" | "dots" | "pills"
	hideDivider?: boolean
}

export interface LedgerProps extends React.ComponentProps<"div"> {
	title?: string
	rows: LedgerRow[]
	total?: { label: string; value: string }
}

function Ledger({ title, rows, total, className, ...props }: LedgerProps) {
	return (
		<div data-slot="ledger" className={cn("w-full text-sm", className)} {...props}>
			{title && <SectionLabel>{title}</SectionLabel>}
			<div className="py-2 space-y-0.5">
				{rows.map((row, i) => (
					<LineItem
						key={i}
						label={row.label}
						value={row.value}
						variant={row.variant ?? "default"}
						dividerVariant={row.dividerVariant}
						hideDivider={row.hideDivider}
					/>
				))}
			</div>
			{total && (
				<>
					<Divider variant="solid" className="my-2" />
					<LineItem label={total.label} value={total.value} variant="bold" />
				</>
			)}
		</div>
	)
}

export { SectionLabel, Ledger, sectionLabelVariants }
