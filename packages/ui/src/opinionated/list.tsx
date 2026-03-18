/**
 * List (opinionated)
 * ─────────────────────────────────────────────────────────────────────────────
 * Variant list renderer: arrow | bullet.
 * Builds on the composables item primitive for consistent sizing and tokens.
 *
 * Usage:
 *   // Data-driven:
 *   <List variant="arrow" items={[{ content: "Feature one" }, { content: "Feature two" }]} />
 *
 *   // Compositional:
 *   <List variant="arrow">
 *     <ListArrowItem content="Hand-rolled item" />
 *   </List>
 */

import type * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

/* ─── Item data type ─── */

export interface ListItemData {
	content: React.ReactNode
}

/* ─── Variants ─── */

export type ListVariant = 'arrow' | 'bullet'

/* ─── Item renderers ─── */

function ArrowItem({ content }: ListItemData) {
	return (
		<li className="flex items-start gap-3">
			<span className="text-primary text-sm select-none" aria-hidden="true">→</span>
			<span className="text-muted-foreground text-sm">{content}</span>
		</li>
	)
}

function BulletItem({ content }: ListItemData) {
	return <li className="text-muted-foreground text-sm">{content}</li>
}

const VARIANT_ITEM: Record<ListVariant, React.FC<ListItemData>> = {
	arrow: ArrowItem,
	bullet: BulletItem,
}

const listVariants = cva('', {
	variants: {
		variant: {
			arrow: 'space-y-4',
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
	BulletItem as ListBulletItem,
}
