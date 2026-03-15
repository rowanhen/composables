/**
 * List (opinionated)
 * ─────────────────────────────────────────────────────────────────────────────
 * Variant list renderer: arrow | check-bordered | bullet.
 * Builds on the composables item primitive for consistent sizing and tokens.
 *
 * Usage:
 *   // Data-driven:
 *   <List variant="check-bordered" items={[{ content: "Feature one" }, { content: "Feature two" }]} />
 *
 *   // Compositional:
 *   <List variant="arrow">
 *     <ListArrowItem content="Hand-rolled item" />
 *   </List>
 */

import type * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

/* ─── Item data type ─── */

export interface ListItemData {
	content: React.ReactNode
}

/* ─── Variants ─── */

export type ListVariant = 'arrow' | 'check-bordered' | 'bullet'

/* ─── Item renderers ─── */

function ArrowItem({ content }: ListItemData) {
	return (
		<li className="flex items-start gap-3">
			<span className="text-primary text-sm select-none" aria-hidden="true">→</span>
			<span className="text-muted-foreground text-sm">{content}</span>
		</li>
	)
}

function CheckBorderedItem({ content }: ListItemData) {
	return (
		<li className="flex items-start gap-3 border border-border p-4 rounded-sm">
			<Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
			<span className="text-foreground text-sm">{content}</span>
		</li>
	)
}

function BulletItem({ content }: ListItemData) {
	return <li className="text-muted-foreground text-sm">{content}</li>
}

const VARIANT_ITEM: Record<ListVariant, React.FC<ListItemData>> = {
	arrow: ArrowItem,
	'check-bordered': CheckBorderedItem,
	bullet: BulletItem,
}

const listVariants = cva('', {
	variants: {
		variant: {
			arrow: 'space-y-4',
			'check-bordered': 'grid md:grid-cols-2 gap-4',
			bullet: 'list-disc list-inside space-y-1',
		},
	},
	defaultVariants: {
		variant: 'bullet',
	},
})

/* ─── Props ─── */

export interface ListProps extends VariantProps<typeof listVariants> {
	items?: ListItemData[]
	className?: string
	children?: React.ReactNode
}

/* ─── Component ─── */

function List({ items, variant, className, children }: ListProps) {
	// Coerce null → 'bullet' so variant={null} doesn't crash VARIANT_ITEM lookup
	const safeVariant: ListVariant = (variant ?? 'bullet') as ListVariant
	if (items) {
		const ItemComponent = VARIANT_ITEM[safeVariant]
		return (
			<ul className={cn(listVariants({ variant: safeVariant }), className)}>
				{items.map((item, i) => (
					<ItemComponent key={i} content={item.content} />
				))}
			</ul>
		)
	}

	return (
		<ul className={cn(listVariants({ variant: safeVariant }), className)}>
			{children}
		</ul>
	)
}

/* ─── Named item exports for compositional use ─── */

export {
	List,
	ArrowItem as ListArrowItem,
	CheckBorderedItem as ListCheckBorderedItem,
	BulletItem as ListBulletItem,
}
