/**
 * List (opinionated)
 * ─────────────────────────────────────────────────────────────────────────────
 * Variant list renderer: arrow | check | check-bordered | bullet.
 * Builds on the composables item primitive for consistent sizing and tokens.
 *
 * Usage:
 *   // Data-driven:
 *   <List variant="check" items={[{ content: "Feature one" }, { content: "Feature two" }]} />
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

export type ListVariant = 'arrow' | 'check' | 'check-bordered' | 'bullet'

/* ─── Item renderers ─── */

function ArrowItem({ content }: ListItemData) {
	return (
		<li className="flex items-start gap-3">
			<span className="text-primary text-sm select-none" aria-hidden="true">→</span>
			<span className="text-muted-foreground text-sm">{content}</span>
		</li>
	)
}

function CheckItem({ content }: ListItemData) {
	return (
		<li className="flex items-start gap-3">
			<Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" aria-hidden="true" />
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
	check: CheckItem,
	'check-bordered': CheckBorderedItem,
	bullet: BulletItem,
}

const listVariants = cva('', {
	variants: {
		variant: {
			arrow: 'space-y-4',
			check: 'space-y-3',
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

function List({ items, variant = 'bullet', className, children }: ListProps) {
	if (items) {
		const ItemComponent = VARIANT_ITEM[variant as ListVariant]
		return (
			<ul className={cn(listVariants({ variant }), className)}>
				{items.map((item, i) => (
					<ItemComponent key={i} content={item.content} />
				))}
			</ul>
		)
	}

	return (
		<ul className={cn(listVariants({ variant }), className)}>
			{children}
		</ul>
	)
}

/* ─── Named item exports for compositional use ─── */

export {
	List,
	ArrowItem as ListArrowItem,
	CheckItem as ListCheckItem,
	CheckBorderedItem as ListCheckBorderedItem,
	BulletItem as ListBulletItem,
}
