/**
 * Layout Primitives
 * ─────────────────────────────────────────────────────────────────────────────
 * Rigid, snap-to-grid composable layout building blocks for structured UIs.
 * Enforces the spacing and border system.
 *
 * BORDERS NEVER STACK RULES:
 *   • Stack/Row gaps use margin (not padding) — items never double-border.
 *   • NewspaperGrid: container holds border-t + border-l.
 *     NewspaperCell adds border-b + border-r → each edge drawn exactly once.
 *   • Use `border-[length:var(--border-width)]` throughout, never hardcoded 1px.
 *
 * SPACING:
 *   All padding/gap values pull from semantic tokens.
 *   Macro layout values come from --space-layout-sm/md/lg (derived from base --spacing).
 *   Fine-grained spacing uses Tailwind's spacing scale (based on --spacing base token).
 *
 * Semantic tokens (set in your CSS or a preset):
 *
 *   --space-layout-sm   Section macro spacing small  (default: calc(var(--spacing) * 6))
 *   --space-layout-md   Section macro spacing medium (default: calc(var(--spacing) * 12))
 *   --space-layout-lg   Section macro spacing large  (default: calc(var(--spacing) * 24))
 *   --border-width      Border thickness token (default: var(--border-width-base))
 *
 * All components use `data-slot` for structural targeting and CVA for variants.
 */

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../lib/utils'

// ─── SECTION ──────────────────────────────────────────────────────────────────
//
// Page-level section wrapper with macro spacing tokens.
// Spacing drives py (vertical padding) — sm=spacing*6, md=spacing*12, lg=spacing*24.

const sectionVariants = cva('w-full', {
	variants: {
		spacing: {
			sm: 'py-[var(--space-layout-sm,calc(var(--spacing)*6))]',
			md: 'py-[var(--space-layout-md,calc(var(--spacing)*12))]',
			lg: 'py-[var(--space-layout-lg,calc(var(--spacing)*24))]',
		},
	},
	defaultVariants: {
		spacing: 'md',
	},
})

type SectionProps = React.ComponentProps<'section'> & VariantProps<typeof sectionVariants>

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

function FlexSpacer({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="flex-spacer"
			aria-hidden="true"
			className={cn('flex-1', className)}
			{...props}
		/>
	)
}

// ─── NEWSPAPER GRID ───────────────────────────────────────────────────────────
//
// Composable CSS grid using the newspaper-border pattern.
// (Named NewspaperGrid to distinguish from layout-bento's BentoGrid, which uses
// gap-as-border rather than this edge-sharing approach.)
//
// Border rule — "each edge drawn exactly once":
//   Container: border-t + border-l  (outer frame — top and left)
//   NewspaperCell: border-b + border-r  (completes each cell — bottom and right)
//
// Result: every grid line is a single border, never doubled.
// Use `border-[length:var(--border-width)]` throughout — never hardcoded px.

const newspaperGridVariants = cva(
	[
		'grid',
		// Container provides the top + left edge of the newspaper grid
		'border-t-[length:var(--border-width,var(--border-width-base,0.0625rem))]',
		'border-l-[length:var(--border-width,var(--border-width-base,0.0625rem))]',
		'border-foreground',
	].join(' '),
	{
		variants: {
			cols: {
				1: 'grid-cols-1',
				2: 'grid-cols-2',
				3: 'grid-cols-3',
				4: 'grid-cols-4',
			},
		},
		defaultVariants: {
			cols: 3,
		},
	},
)

type NewspaperGridProps = React.ComponentProps<'div'> & VariantProps<typeof newspaperGridVariants>

function NewspaperGrid({ className, cols, ...props }: NewspaperGridProps) {
	return (
		<div
			data-slot="newspaper-grid"
			className={cn(newspaperGridVariants({ cols }), className)}
			{...props}
		/>
	)
}

// ─── NEWSPAPER CELL ───────────────────────────────────────────────────────────
//
// A single cell within NewspaperGrid. Provides the bottom + right border edges
// (newspaper rule — completes the grid line each container started).
//
// span    — column span (1–4)
// rowSpan — row span (1–3)

const COL_SPANS: Record<1 | 2 | 3 | 4, string> = {
	1: 'col-span-1',
	2: 'col-span-2',
	3: 'col-span-3',
	4: 'col-span-4',
}

const ROW_SPANS: Record<1 | 2 | 3, string> = {
	1: 'row-span-1',
	2: 'row-span-2',
	3: 'row-span-3',
}

// Cell border classes — bottom + right complete the newspaper grid rule
const CELL_BORDERS = [
	'border-b-[length:var(--border-width,var(--border-width-base,0.0625rem))]',
	'border-r-[length:var(--border-width,var(--border-width-base,0.0625rem))]',
	'border-foreground',
].join(' ')

interface NewspaperCellProps extends React.ComponentProps<'div'> {
	/** Number of columns to span (1–4) */
	span?: 1 | 2 | 3 | 4
	/** Number of rows to span (1–3) */
	rowSpan?: 1 | 2 | 3
}

function NewspaperCell({ className, span = 1, rowSpan = 1, ...props }: NewspaperCellProps) {
	return (
		<div
			data-slot="newspaper-cell"
			className={cn(COL_SPANS[span], ROW_SPANS[rowSpan], CELL_BORDERS, 'p-4', className)}
			{...props}
		/>
	)
}

export { Section, sectionVariants, FlexSpacer, NewspaperGrid, newspaperGridVariants, NewspaperCell }

export type { SectionProps, NewspaperGridProps, NewspaperCellProps }
