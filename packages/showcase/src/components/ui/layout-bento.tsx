/**
 * Bento Layout Primitives
 * ─────────────────────────────────────────────────────────────────────────────
 * Opinionated grid layouts for information-dense dashboards and marketing pages.
 * Uses a "gap-as-border" technique: the container background IS the border color;
 * 1px gap between cells exposes it as ruled lines.
 *
 * Semantic tokens (set in your CSS or a preset):
 *
 *   --bento-gap           Gap between cells (default: var(--border-width, 1px))
 *
 * Base tokens used directly:
 *   --border              Grid line color (via bg-border)
 *   --radius              Corner radius (via rounded-lg)
 *   --border-style        Border style on all components (default: solid)
 *
 * Layout philosophy:
 *   • Container background IS the border color
 *   • Gap exposes it as 1px lines — cells are never individually bordered
 *   • "Borders never stack" — each grid line is drawn exactly once
 *   • Mobile: single-column stack; Desktop: the designed layout
 *   • All sizing is responsive, all colors through semantic tokens
 *
 * Usage:
 *   <BentoLeader
 *     header={<div className="p-6"><h2>Dashboard</h2></div>}
 *     columns={[<StatCell label="Users" value="1,234" />, ...]}
 *   />
 */

import * as React from "react"

import { cn } from "@/lib/utils"

// ─── INTERNAL CONSTANTS ───────────────────────────────────────────────────────

/** Background IS the border color — gap exposes it as lines. */
const BENTO_CONTAINER =
	"bg-border gap-[var(--bento-gap,var(--border-width,1px))] p-[var(--bento-gap,var(--border-width,1px))] rounded-lg"

/** Every direct cell child gets card background — it sits on top of the border bg. */
const BENTO_CELL = "bg-card rounded-lg overflow-hidden"

// ─── STAT CELL ────────────────────────────────────────────────────────────────
//
// Compact metric cell. Participates in the gap-border system — add it as a
// direct child of BentoGrid, CellGrid, or the stats slot of any Bento layout.
// Padding is internal; the outer gap provides the grid line.

interface StatCellProps extends React.ComponentProps<"div"> {
	label: string
	value: string
	/** Render value at a larger text size */
	large?: boolean
}

function StatCell({ label, value, large = false, className, ...props }: StatCellProps) {
	return (
		<div data-slot="bento-stat-cell" className={cn(BENTO_CELL, "p-4", className)} {...props}>
			<div className="text-[10px] uppercase text-muted-foreground mb-1">{label}</div>
			<div className={cn("font-bold", large ? "text-xl" : "text-xs")}>{value}</div>
		</div>
	)
}

// ─── BENTO GRID ───────────────────────────────────────────────────────────────
//
// General-purpose grid with configurable columns. Direct children should be
// BentoCell components (or anything that provides its own bg-card padding).
// The gap-as-border pattern means you must NOT add separate borders to cells.

interface BentoGridProps extends React.ComponentProps<"div"> {
	cols?: 1 | 2 | 3 | 4
}

const BENTO_GRID_COLS: Record<1 | 2 | 3 | 4, string> = {
	1: "grid-cols-1",
	2: "grid-cols-2",
	3: "grid-cols-3",
	4: "grid-cols-4",
}

function BentoGrid({ cols = 3, className, ...props }: BentoGridProps) {
	return (
		<div
			data-slot="bento-grid"
			className={cn("grid", BENTO_GRID_COLS[cols], BENTO_CONTAINER, className)}
			{...props}
		/>
	)
}

// ─── BENTO CELL ───────────────────────────────────────────────────────────────
//
// A single cell within BentoGrid. Controls column/row span.

interface BentoCellProps extends React.ComponentProps<"div"> {
	/** Number of columns to span */
	colSpan?: 1 | 2 | 3 | 4
	/** Number of rows to span */
	rowSpan?: 1 | 2 | 3
}

const COL_SPANS: Record<1 | 2 | 3 | 4, string> = {
	1: "col-span-1",
	2: "col-span-2",
	3: "col-span-3",
	4: "col-span-4",
}

const ROW_SPANS: Record<1 | 2 | 3, string> = {
	1: "row-span-1",
	2: "row-span-2",
	3: "row-span-3",
}

function BentoCell({ colSpan = 1, rowSpan = 1, className, ...props }: BentoCellProps) {
	return (
		<div
			data-slot="bento-cell"
			className={cn(BENTO_CELL, COL_SPANS[colSpan], ROW_SPANS[rowSpan], "p-4", className)}
			{...props}
		/>
	)
}

// ─── BENTO SPLIT ──────────────────────────────────────────────────────────────
//
// A 2-area layout: icon panel (fixed 200px on desktop, spans both rows) |
// content area + stats area stacked in the second column.
//
// Mobile: single column — icon, then content, then stats.
// Desktop: [200px icon (row-span-2)] | [content / stats]

interface BentoSplitProps extends React.ComponentProps<"div"> {
	icon: React.ReactNode
	content: React.ReactNode
	stats: React.ReactNode
}

function BentoSplit({ icon, content, stats, className, ...props }: BentoSplitProps) {
	return (
		<div
			data-slot="bento-split"
			className={cn(
				"grid grid-cols-1 md:grid-cols-[200px_1fr]",
				BENTO_CONTAINER,
				className,
			)}
			{...props}
		>
			{/* Icon — spans both rows on desktop */}
			<div
				data-slot="bento-split-icon"
				className={cn(BENTO_CELL, "flex items-center justify-center p-10 md:row-span-2")}
			>
				{icon}
			</div>
			{/* Content — auto-places into col 2, row 1 */}
			<div data-slot="bento-split-content" className={cn(BENTO_CELL, "p-4")}>
				{content}
			</div>
			{/* Stats — auto-places into col 2, row 2 */}
			<div data-slot="bento-split-stats" className={cn(BENTO_CELL, "p-4")}>
				{stats}
			</div>
		</div>
	)
}

// ─── BENTO LEADER ─────────────────────────────────────────────────────────────
//
// A full-width header spanning all columns, then N equal columns below.
// Desktop column count is derived from the `columns` array length (capped 2–4).
//
// Mobile: header → columns stacked.
// Desktop: header (full width) | N equal columns.

const LEADER_COLS: Record<1 | 2 | 3 | 4, string> = {
	1: "md:grid-cols-1",
	2: "md:grid-cols-2",
	3: "md:grid-cols-3",
	4: "md:grid-cols-4",
}

interface BentoLeaderProps extends React.ComponentProps<"div"> {
	header: React.ReactNode
	columns: React.ReactNode[]
}

function BentoLeader({ header, columns, className, ...props }: BentoLeaderProps) {
	// Clamp to at least 1 so arrays with 0–1 items don't create ghost columns.
	const n = Math.min(Math.max(columns.length, 1), 4) as 1 | 2 | 3 | 4

	return (
		<div
			data-slot="bento-leader"
			className={cn("grid grid-cols-1", LEADER_COLS[n], BENTO_CONTAINER, className)}
			{...props}
		>
			{/* Header spans all columns */}
			<div data-slot="bento-leader-header" className={cn(BENTO_CELL, "md:[grid-column:1/-1]")}>
				{header}
			</div>
			{columns.map((col, i) => (
				<div key={i} data-slot="bento-leader-column" className={BENTO_CELL}>
					{col}
				</div>
			))}
		</div>
	)
}

// ─── BENTO QUAD ───────────────────────────────────────────────────────────────
//
// A 2×2 grid with a [2fr | 1fr] column ratio.
// Mobile: all four areas stacked.
// Desktop: 2-column, 2-row layout.

interface BentoQuadProps extends React.ComponentProps<"div"> {
	topLeft: React.ReactNode
	topRight: React.ReactNode
	bottomLeft: React.ReactNode
	bottomRight: React.ReactNode
}

function BentoQuad({ topLeft, topRight, bottomLeft, bottomRight, className, ...props }: BentoQuadProps) {
	return (
		<div
			data-slot="bento-quad"
			className={cn(
				"grid grid-cols-1 md:grid-cols-[2fr_1fr]",
				BENTO_CONTAINER,
				className,
			)}
			{...props}
		>
			<div data-slot="bento-quad-top-left" className={BENTO_CELL}>
				{topLeft}
			</div>
			<div data-slot="bento-quad-top-right" className={BENTO_CELL}>
				{topRight}
			</div>
			<div data-slot="bento-quad-bottom-left" className={BENTO_CELL}>
				{bottomLeft}
			</div>
			<div data-slot="bento-quad-bottom-right" className={BENTO_CELL}>
				{bottomRight}
			</div>
		</div>
	)
}

// ─── BENTO TRIPLE ─────────────────────────────────────────────────────────────
//
// 3-row layout: header (full width) | aside + body | footer (full width).
// Desktop: [1fr aside | 2fr body]. Header and footer span both columns.
// Mobile: header → aside → body → footer (natural DOM order).

interface BentoTripleProps extends React.ComponentProps<"div"> {
	header: React.ReactNode
	aside: React.ReactNode
	body: React.ReactNode
	footer: React.ReactNode
}

function BentoTriple({ header, aside, body, footer, className, ...props }: BentoTripleProps) {
	return (
		<div
			data-slot="bento-triple"
			className={cn(
				"grid grid-cols-1 md:grid-cols-[1fr_2fr]",
				BENTO_CONTAINER,
				className,
			)}
			{...props}
		>
			{/* Header spans both columns */}
			<div data-slot="bento-triple-header" className={cn(BENTO_CELL, "md:[grid-column:1/-1]")}>
				{header}
			</div>
			{/* Aside — col 1, row 2 */}
			<div data-slot="bento-triple-aside" className={cn(BENTO_CELL, "flex items-center justify-center")}>
				{aside}
			</div>
			{/* Body — col 2, row 2 */}
			<div data-slot="bento-triple-body" className={BENTO_CELL}>
				{body}
			</div>
			{/* Footer spans both columns */}
			<div
				data-slot="bento-triple-footer"
				className={cn(BENTO_CELL, "md:[grid-column:1/-1]")}
			>
				{footer}
			</div>
		</div>
	)
}

// ─── CELL GRID ────────────────────────────────────────────────────────────────
//
// Equal-column grid using the gap-as-border pattern. Direct children must
// provide their own `bg-card` (e.g. StatCell, or wrap in `<div className="bg-card">`).
//
// `subtle` uses the secondary border color for a lighter grid line.

const CELL_GRID_COLS: Record<2 | 3 | 4 | 5, string> = {
	2: "md:grid-cols-2",
	3: "md:grid-cols-3",
	4: "md:grid-cols-4",
	5: "md:grid-cols-5",
}

interface CellGridProps extends React.ComponentProps<"div"> {
	cols: 2 | 3 | 4 | 5
	/** Use a lighter (secondary) border color for the grid lines */
	subtle?: boolean
}

function CellGrid({ cols, subtle = false, className, ...props }: CellGridProps) {
	return (
		<div
			data-slot="bento-cell-grid"
			className={cn(
				"grid grid-cols-1",
				CELL_GRID_COLS[cols],
				"gap-[var(--bento-gap,var(--border-width,1px))]",
				subtle
					? "bg-[var(--border-secondary,var(--border))]"
					: "bg-border",
				className,
			)}
			{...props}
		/>
	)
}

// ─── CELL ROW ─────────────────────────────────────────────────────────────────
//
// Flex direction flip with gap-as-divider. Mobile: stacked. Desktop: side-by-side.
// Children control their own widths (e.g. `md:w-48 md:shrink-0`).

function CellRow({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="bento-cell-row"
			className={cn(
				"bg-border",
				"flex flex-col md:flex-row",
				"gap-[var(--bento-gap,var(--border-width,1px))]",
				className,
			)}
			{...props}
		/>
	)
}

export {
	BentoGrid,
	BentoCell,
	BentoSplit,
	BentoLeader,
	BentoQuad,
	BentoTriple,
	CellGrid,
	CellRow,
	StatCell,
}

export type {
	BentoGridProps,
	BentoCellProps,
	BentoSplitProps,
	BentoLeaderProps,
	BentoQuadProps,
	BentoTripleProps,
	CellGridProps,
	StatCellProps,
}
