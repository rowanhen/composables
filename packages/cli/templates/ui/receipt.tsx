/**
 * Receipt Primitives
 * ─────────────────────────────────────────────────────────────────────────────
 * Information-dense receipt/ledger layout components for data-heavy UIs.
 * Inspired by thermal receipts, Bloomberg Terminal, and raw HTML aesthetics.
 *
 * Semantic tokens (set in your CSS or a preset):
 *
 *   --receipt-spacing          Row vertical padding (default: 0px)
 *   --receipt-divider-opacity  Opacity of fill/dot characters (default: 0.25)
 *   --section-label-padding    SectionLabel padding (default: 3px 8px)
 *   --section-label-bg         SectionLabel background (default: var(--border))
 *   --section-label-text       SectionLabel text color (default: var(--background))
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

// ─── DIVIDER ──────────────────────────────────────────────────────────────────
//
// Renders a horizontal divider. Character-based variants (dots/dashes/equals)
// flood the row with repeated characters clipped to the container. Solid and
// dashed-border variants render CSS border lines — no characters involved.
//
// Variants:
//   dots          — repeated "........." (default)
//   dashes        — repeated "---------"
//   equals        — repeated "=========" (use for totals separator)
//   solid         — thin solid CSS border
//   dashed-border — CSS dashed border (switchable via --border-style)

const dividerVariants = cva("w-full my-2", {
	variants: {
		variant: {
			dots: "text-xs h-[1em] relative overflow-hidden",
			dashes: "text-xs h-[1em] relative overflow-hidden",
			equals: "text-xs h-[1em] relative overflow-hidden",
			solid: "h-0 border-t border-border",
			"dashed-border": "h-0 border-t border-dashed border-border",
		},
	},
	defaultVariants: {
		variant: "dots",
	},
})

const DIVIDER_CHARS: Record<"dots" | "dashes" | "equals", string> = {
	dots: ".".repeat(400),
	dashes: "-".repeat(400),
	equals: "=".repeat(400),
}

type DividerVariant = "dots" | "dashes" | "equals" | "solid" | "dashed-border"

interface DividerProps extends React.ComponentProps<"div"> {
	variant?: DividerVariant
}

function Divider({ variant = "dots", className, ...props }: DividerProps) {
	const isCharBased = variant === "dots" || variant === "dashes" || variant === "equals"

	return (
		<div
			data-slot="receipt-divider"
			data-variant={variant}
			aria-hidden
			className={cn(dividerVariants({ variant }), className)}
			{...props}
		>
			{isCharBased && (
				<span
					className="absolute inset-x-0 whitespace-nowrap tracking-[-1px] text-border select-none"
					style={{ opacity: "var(--receipt-divider-opacity, 0.25)" }}
				>
					{DIVIDER_CHARS[variant as "dots" | "dashes" | "equals"]}
				</span>
			)}
		</div>
	)
}

// ─── SECTION LABEL ────────────────────────────────────────────────────────────
//
// A reversed-out block label that visually separates content sections.
// Variants:
//   default   — filled background (--section-label-bg) with contrasting text
//   bordered  — transparent background with top/bottom borders

const sectionLabelVariants = cva("text-xs font-bold uppercase", {
	variants: {
		variant: {
			default:
				"bg-[var(--section-label-bg,var(--border))] text-[var(--section-label-text,var(--background))]",
			bordered: "bg-transparent text-foreground border-t border-b border-border",
		},
	},
	defaultVariants: {
		variant: "default",
	},
})

interface SectionLabelProps extends React.ComponentProps<"div"> {
	variant?: "default" | "bordered"
}

function SectionLabel({ variant = "default", className, style, ...props }: SectionLabelProps) {
	return (
		<div
			data-slot="receipt-section-label"
			data-variant={variant}
			className={cn(sectionLabelVariants({ variant }), className)}
			style={{ padding: "var(--section-label-padding, 3px 8px)", ...style }}
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
//   compact  — tighter vertical padding

const rowVariants = cva("flex items-end text-xs gap-0", {
	variants: {
		variant: {
			default: "",
			fill: "",
			bold: "font-bold",
			compact: "leading-none",
		},
	},
	defaultVariants: {
		variant: "default",
	},
})

interface RowProps extends Omit<React.ComponentProps<"div">, "children"> {
	label: string
	value: string
	variant?: "default" | "fill" | "bold" | "compact"
}

function Row({ label, value, variant = "default", className, style, ...props }: RowProps) {
	const hasFill = variant === "fill"

	return (
		<div
			data-slot="receipt-row"
			data-variant={variant}
			className={cn(rowVariants({ variant }), className)}
			style={{ paddingTop: "var(--receipt-spacing, 0)", paddingBottom: "var(--receipt-spacing, 0)", ...style }}
			{...props}
		>
			<span className="uppercase shrink-0">{label}</span>
			{hasFill ? (
				<>
					<span
						aria-hidden
						className="flex-1 min-w-[2ch] overflow-hidden tracking-[-1px] whitespace-nowrap text-border select-none"
						style={{ opacity: "var(--receipt-divider-opacity, 0.25)" }}
					>
						{".".repeat(400)}
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
	/** Column header label (displayed uppercase) */
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
		<div data-slot="receipt-data-table" className={cn("text-xs", className)} {...props}>
			{/* Header row */}
			<div className="flex border-b border-border pb-px mb-px">
				{columns.map((col, i) => (
					<span
						key={i}
						className={cn(
							"uppercase shrink-0 text-muted-foreground",
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
				<div key={ri} className="flex border-b border-border/30 py-px last:border-b-0">
					{row.map((cell, ci) => {
						const col = columns[ci]
						return (
							<span
								key={ci}
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
	"relative inline-flex items-center justify-center shrink-0 border font-bold select-none",
	{
		variants: {
			variant: {
				default: "bg-card text-foreground border-border",
				filled: "bg-foreground text-background border-foreground",
				circle: "bg-card border-border",
				"circle-inverted": "bg-foreground border-foreground",
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
						"absolute",
						variant === "circle" && "bg-foreground",
						variant === "circle-inverted" && "bg-card",
					)}
					style={{ width: circleDiameter, height: circleDiameter, borderRadius: "50%" }}
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
	label: string
	value: string
	variant?: "default" | "fill" | "compact"
}

interface LedgerProps extends React.ComponentProps<"div"> {
	title?: string
	rows: LedgerRow[]
	total?: { label: string; value: string }
}

function Ledger({ title, rows, total, className, ...props }: LedgerProps) {
	return (
		<div data-slot="receipt-ledger" className={cn("text-xs", className)} {...props}>
			{title && <SectionLabel>{title}</SectionLabel>}
			<div className="py-2 space-y-px">
				{rows.map((row, i) => (
					<Row key={i} label={row.label} value={row.value} variant={row.variant ?? "default"} />
				))}
			</div>
			{total && (
				<>
					<Divider variant="equals" />
					<Row label={total.label} value={total.value} variant="bold" />
				</>
			)}
		</div>
	)
}

export { Divider, SectionLabel, Row, DataTable, Glyph, Ledger }
export type { DividerProps, SectionLabelProps, RowProps, DataTableProps, GlyphProps, LedgerProps, LedgerRow, DividerVariant }
