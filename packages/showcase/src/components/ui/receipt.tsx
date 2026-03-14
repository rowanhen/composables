/**
 * Receipt Primitives
 * ─────────────────────────────────────────────────────────────────────────────
 * Information-dense receipt/ledger layout components for data-heavy UIs.
 * Inspired by thermal receipts, Bloomberg Terminal, and raw HTML aesthetics.
 *
 * All semantic tokens come from base design system tokens — no custom CSS
 * variables needed for this component. Typography, spacing, border widths,
 * and border radii all adapt automatically when switching presets.
 *
 * SectionLabel uses base tokens directly:
 *   bg-primary / text-primary-foreground (matches Button default variant)
 *   padding via Tailwind spacing classes (px-2 py-0.5)
 *
 * All components use `data-slot` for structural targeting and CVA for variants.
 *
 * Usage:
 *   <Ledger
 *     title="Invoice #0042"
 *     rows={[
 *       { label: "Consulting", value: "$4,000", variant: "fill" },
 *       { label: "Expenses", value: "$320", variant: "fill" },
 *     ]}
 *     total={{ label: "Total", value: "$4,320" }}
 *   />
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Divider } from "@/components/ui/divider"

// Dot-leader characters used by the Row component's fill variant
const DIVIDER_CHARS = {
	dots: ".".repeat(400),
}

// ─── SECTION LABEL ────────────────────────────────────────────────────────────
//
// A reversed-out block label that visually separates content sections.
// Uses primary tokens: bg-primary / text-primary-foreground (matches Button default).
//
// Variants:
//   default   — filled background (foreground) with contrasting text (background)
//   bordered  — transparent background with top/bottom borders

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

interface SectionLabelProps extends React.ComponentProps<"div"> {
	variant?: "default" | "bordered"
}

function SectionLabel({ variant = "default", className, ...props }: SectionLabelProps) {
	return (
		<div
			data-slot="receipt-section-label"
			data-variant={variant}
			className={cn(sectionLabelVariants({ variant }), className)}
			{...props}
		/>
	)
}

// ─── ROW ──────────────────────────────────────────────────────────────────────
//
// A single key-value row. Use `fill` to add a dot-leader between label and
// value (like a classic menu or receipt). Use `bold` for totals. Use
// `compact` to reduce vertical spacing.
//
// Variants:
//   default  — label left, value right, standard weight
//   fill     — dot-leader fill between label and value
//   bold     — bold weight, no fill (use for totals/subtotals)
//   compact  — tighter vertical padding + smaller text

const rowVariants = cva("flex items-end text-sm gap-1", {
	variants: {
		variant: {
			default: "py-1",
			fill: "py-1",
			bold: "font-bold py-1.5",
			compact: "leading-tight text-xs py-0.5",
		},
	},
	defaultVariants: {
		variant: "default",
	},
})

type DividerOpacity = "subtle" | "medium" | "bold"

interface RowProps extends Omit<React.ComponentProps<"div">, "children"> {
	label: React.ReactNode
	value: React.ReactNode
	variant?: "default" | "fill" | "bold" | "compact"
	/** Opacity of the dot-leader fill. Only applies when `variant="fill"`. */
	fillOpacity?: DividerOpacity
}

/** Maps opacity variants to Tailwind opacity classes — used by Row's dot-leader fill. */
const OPACITY_CLASS: Record<DividerOpacity, string> = {
	subtle: "opacity-25",
	medium: "opacity-50",
	bold: "opacity-75",
}

function Row({ label, value, variant = "default", fillOpacity = "subtle", className, ...props }: RowProps) {
	const hasFill = variant === "fill"

	return (
		<div
			data-slot="receipt-row"
			data-variant={variant}
			className={cn(rowVariants({ variant }), className)}
			{...props}
		>
			<span className="shrink-0">{label}</span>
			{hasFill ? (
				<>
					<span
						aria-hidden
						className={cn(
							"flex-1 min-w-[2ch] overflow-hidden tracking-tighter whitespace-nowrap text-muted-foreground select-none",
							OPACITY_CLASS[fillOpacity],
						)}
					>
						{DIVIDER_CHARS.dots}
					</span>
					<span className="shrink-0">{value}</span>
				</>
			) : (
				<span className="flex-1 text-right">{value}</span>
			)}
		</div>
	)
}

// ─── DATA TABLE ───────────────────────────────────────────────────────────────
//
// Fixed-column tabular data. Column widths are in `ch` units so they snap to
// the monospaced grid. Omit `width` on a column to have it fill remaining space.
//
// Example:
//   <DataTable
//     columns={[{ label: "Service", width: 20 }, { label: "Amount", align: "right" }]}
//     rows={[["Consulting", "$4,000"], ["Expenses", "$320"]]}
//   />

export interface ColDef {
	/** Column header label */
	label: string
	/** Column width in `ch` character units. Omit to flex-fill. */
	width?: number
	/** Text alignment for both header and cells */
	align?: "left" | "right"
}

interface DataTableProps extends React.ComponentProps<"div"> {
	columns: ColDef[]
	rows: (string | React.ReactNode)[][]
}

function DataTable({ columns, rows, className, ...props }: DataTableProps) {
	return (
		<div
			role="table"
			data-slot="receipt-data-table"
			className={cn("text-sm", className)}
			{...props}
		>
			{/* Header row */}
			<div role="row" className="flex border-b-[length:var(--border-width)] border-b-border pb-px mb-px">
				{columns.map((col, i) => (
					<span
						key={i}
						role="columnheader"
						className={cn(
							"shrink-0 text-muted-foreground",
							!col.width && "flex-1",
							col.align === "right" && "text-right",
						)}
						style={col.width ? { width: `${col.width}ch` } : undefined}
					>
						{col.label}
					</span>
				))}
			</div>
			{/* Data rows */}
			{rows.map((row, ri) => (
				<div key={ri} role="row" className="flex border-b-[length:var(--border-width)] border-b-border/30 py-px last:border-b-0">
					{row.map((cell, ci) => {
						const col = columns[ci]
						return (
							<span
								key={ci}
								role="cell"
								className={cn(
									"shrink-0",
									!col?.width && "flex-1",
									col?.align === "right" && "text-right",
								)}
								style={col?.width ? { width: `${col.width}ch` } : undefined}
							>
								{cell}
							</span>
						)
					})}
				</div>
			))}
		</div>
	)
}

// ─── GLYPH ────────────────────────────────────────────────────────────────────
//
// A fixed-size square containing a centred character or symbol.
// Size must be one of the preset GlyphSize values (multiples of 8/16).
// All variants use rounded-lg on the outer container (square with radius).
// For circle/circle-inverted, the circle shape lives INSIDE the square container.
//
// Variants:
//   default          — bordered square, standard bg + fg
//   filled           — inverted (foreground bg, background text)
//   circle           — standard bg with a filled circle behind the character
//   circle-inverted  — foreground bg with a contrasting circle behind the character

export type GlyphSize = 16 | 24 | 32 | 48 | 64 | 96
export type GlyphVariant = "default" | "filled" | "circle" | "circle-inverted"

const GLYPH_TEXT: Record<GlyphSize, string> = {
	16: "text-[9px]",
	24: "text-[11px]",
	32: "text-xs",
	48: "text-base",
	64: "text-xl",
	96: "text-3xl",
}

const glyphVariants = cva(
	"relative inline-flex items-center justify-center shrink-0 border-[length:var(--border-width)] font-bold select-none [font-family:system-ui,_-apple-system,_sans-serif]",
	{
		variants: {
			variant: {
				default: "bg-card text-foreground border-border rounded-lg",
				filled: "bg-foreground text-background border-foreground rounded-lg",
				circle: "bg-card border-border rounded-lg",
				"circle-inverted": "bg-foreground border-foreground rounded-lg",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
)

interface GlyphProps extends Omit<React.ComponentProps<"div">, "children"> {
	children: React.ReactNode
	size?: GlyphSize
	variant?: GlyphVariant
}

function Glyph({ children, size = 48, variant = "default", className, ...props }: GlyphProps) {
	const circleDiameter = Math.round(size * 0.68)
	const hasCircle = variant === "circle" || variant === "circle-inverted"

	return (
		<div
			data-slot="receipt-glyph"
			data-variant={variant}
			className={cn(glyphVariants({ variant }), GLYPH_TEXT[size], className)}
			style={{ width: size, height: size }}
			{...props}
		>
			{hasCircle && (
				<div
					aria-hidden
					className={cn(
						"absolute rounded-full",
						variant === "circle" && "bg-foreground",
						variant === "circle-inverted" && "bg-card",
					)}
					style={{ width: circleDiameter, height: circleDiameter }}
				/>
			)}
			<span
				className={cn(
					"relative",
					variant === "circle" && "text-background",
					variant === "circle-inverted" && "text-foreground",
					(variant === "default" || variant === "filled") && "text-inherit",
				)}
			>
				{children}
			</span>
		</div>
	)
}

// ─── LEDGER ───────────────────────────────────────────────────────────────────
//
// A self-contained accounting block: optional titled section label, key/value
// rows, and an optional total with a double-line separator.
//
// Example:
//   <Ledger
//     title="Services"
//     rows={[
//       { label: "Consulting", value: "$4,000", variant: "fill" },
//       { label: "Expenses",   value: "$320",   variant: "fill" },
//     ]}
//     total={{ label: "Total Due", value: "$4,320" }}
//   />

interface LedgerRow {
	label: React.ReactNode
	value: React.ReactNode
	variant?: "default" | "fill" | "bold" | "compact"
}

interface LedgerProps extends React.ComponentProps<"div"> {
	title?: string
	rows: LedgerRow[]
	total?: { label: string; value: string }
}

function Ledger({ title, rows, total, className, ...props }: LedgerProps) {
	return (
		<div data-slot="receipt-ledger" className={cn("text-sm", className)} {...props}>
			{title && <SectionLabel>{title}</SectionLabel>}
			<div className="py-2 space-y-0.5">
				{rows.map((row, i) => (
					<Row key={i} label={row.label} value={row.value} variant={row.variant ?? "default"} />
				))}
			</div>
			{total && (
				<>
					<Divider variant="solid" className="my-2" />
					<Row label={total.label} value={total.value} variant="bold" />
				</>
			)}
		</div>
	)
}

export { SectionLabel, Row, DataTable, Glyph, Ledger }
export type {
	SectionLabelProps,
	RowProps,
	DataTableProps,
	GlyphProps,
	LedgerProps,
	LedgerRow,
}
