/**
 * Layout Primitives
 * ─────────────────────────────────────────────────────────────────────────────
 * Rigid, snap-to-grid composable layout building blocks for structured UIs.
 * Enforces the dockets spacing and border system.
 *
 * BORDERS NEVER STACK RULES:
 *   • Stack/Row gaps use margin (not padding) — items never double-border.
 *   • BentoGrid: container holds border-t + border-l.
 *     BentoCell adds border-b + border-r → each edge drawn exactly once.
 *   • Use `border-[length:var(--border-width)]` throughout, never hardcoded 1px.
 *
 * SPACING:
 *   All padding/gap values pull from semantic tokens.
 *   Macro layout values come from --space-layout-sm/md/lg (24px/48px/96px).
 *   Fine-grained spacing uses --space-1 through --space-8 (0.25rem increments).
 *
 * Semantic tokens (set in your CSS or a preset):
 *
 *   --space-layout-sm   Section macro spacing small  (default: 1.5rem / 24px)
 *   --space-layout-md   Section macro spacing medium (default: 3rem   / 48px)
 *   --space-layout-lg   Section macro spacing large  (default: 6rem   / 96px)
 *   --border-width      Border thickness token (default: var(--border-width-base))
 *
 * All components use `data-slot` for structural targeting and CVA for variants.
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// ─── SECTION ──────────────────────────────────────────────────────────────────
//
// Page-level section wrapper with macro spacing tokens.
// Spacing drives py (vertical padding) — sm=24px, md=48px, lg=96px.

const sectionVariants = cva("w-full", {
	variants: {
		spacing: {
			sm: "py-[var(--space-layout-sm,1.5rem)]",
			md: "py-[var(--space-layout-md,3rem)]",
			lg: "py-[var(--space-layout-lg,6rem)]",
		},
	},
	defaultVariants: {
		spacing: "md",
	},
})

type SectionProps = React.ComponentProps<"section"> &
	VariantProps<typeof sectionVariants>

function Section({ className, spacing, ...props }: SectionProps) {
	return (
		<section
			data-slot="section"
			className={cn(sectionVariants({ spacing }), className)}
			{...props}
		/>
	)
}

// ─── SPACER ───────────────────────────────────────────────────────────────────
//
// Flex-grow spacer for pushing content apart inside flex containers.
// aria-hidden: decorative — not meaningful to assistive tech.

function FlexSpacer({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="flex-spacer"
			aria-hidden="true"
			className={cn("flex-1", className)}
			{...props}
		/>
	)
}

// ─── BENTO GRID ───────────────────────────────────────────────────────────────
//
// Composable CSS grid using the newspaper-border pattern.
//
// Border rule — "each edge drawn exactly once":
//   Container: border-t + border-l  (outer frame — top and left)
//   BentoCell: border-b + border-r  (completes each cell — bottom and right)
//
// Result: every grid line is a single border, never doubled.
// Use `border-[length:var(--border-width)]` throughout — never hardcoded px.

const bentoGridVariants = cva(
	[
		"grid",
		// Container provides the top + left edge of the newspaper grid
		"border-t-[length:var(--border-width,var(--border-width-base,0.0625rem))]",
		"border-l-[length:var(--border-width,var(--border-width-base,0.0625rem))]",
		"border-foreground",
	].join(" "),
	{
		variants: {
			cols: {
				1: "grid-cols-1",
				2: "grid-cols-2",
				3: "grid-cols-3",
				4: "grid-cols-4",
			},
		},
		defaultVariants: {
			cols: 3,
		},
	},
)

type BentoGridProps = React.ComponentProps<"div"> &
	VariantProps<typeof bentoGridVariants>

function BentoGrid({ className, cols, ...props }: BentoGridProps) {
	return (
		<div
			data-slot="bento-grid"
			className={cn(bentoGridVariants({ cols }), className)}
			{...props}
		/>
	)
}

// ─── BENTO CELL ───────────────────────────────────────────────────────────────
//
// A single cell within BentoGrid. Provides the bottom + right border edges
// (newspaper rule — completes the grid line each container started).
//
// span    — column span (1–4)
// rowSpan — row span (1–3)

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

// Cell border classes — bottom + right complete the newspaper grid rule
const CELL_BORDERS = [
	"border-b-[length:var(--border-width,var(--border-width-base,0.0625rem))]",
	"border-r-[length:var(--border-width,var(--border-width-base,0.0625rem))]",
	"border-foreground",
].join(" ")

interface BentoCellProps extends React.ComponentProps<"div"> {
	/** Number of columns to span (1–4) */
	span?: 1 | 2 | 3 | 4
	/** Number of rows to span (1–3) */
	rowSpan?: 1 | 2 | 3
}

function BentoCell({ className, span = 1, rowSpan = 1, ...props }: BentoCellProps) {
	return (
		<div
			data-slot="bento-cell"
			className={cn(
				COL_SPANS[span],
				ROW_SPANS[rowSpan],
				CELL_BORDERS,
				"p-4",
				className,
			)}
			{...props}
		/>
	)
}

export { Section, sectionVariants, FlexSpacer, BentoGrid, bentoGridVariants, BentoCell }

export type { SectionProps, BentoGridProps, BentoCellProps }
