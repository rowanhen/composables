/**
 * PricingReceipt (opinionated)
 * ─────────────────────────────────────────────────────────────────────────────
 * Receipt-styled pricing card. Pairs with the composables receipt primitive
 * for Divider and SectionLabel — no dockets-specific variables needed.
 *
 * All colors come from composables semantic tokens (bg-card, bg-muted,
 * text-muted-foreground, bg-foreground, text-background, etc.).
 *
 * Usage:
 *   <PricingReceipt product={myProduct} />
 */

import { Divider, SectionLabel } from '@/components/ui/receipt'
import { cn } from '@/lib/utils'

/* ─── Types ─── */

export interface PricingProduct {
	id: string
	orderNum: string
	title: string
	subtitle?: string
	items: { name: string; value: string }[]
	total: string
	cta: string
	link: string
	learnMoreLink?: string
}

export interface PricingReceiptProps {
	product: PricingProduct
	className?: string
}

/* ─── Component ─── */

export function PricingReceipt({ product, className }: PricingReceiptProps) {
	return (
		<div
			data-slot="pricing-receipt"
			className={cn(
				'bg-card border border-border w-full min-w-[288px] max-w-[336px] flex-1 p-6 text-sm leading-tight font-mono',
				className,
			)}
		>
			{/* Header */}
			<div className="text-center mb-3">
				<div className="text-base font-bold mb-1 text-foreground"># {product.orderNum}</div>
				<div className="text-xs uppercase text-foreground">{product.title}</div>
				<div className="text-[10px] text-muted-foreground mt-0.5 h-4">
					{product.subtitle || '\u00A0'}
				</div>
			</div>

			<Divider variant="dashes" />

			<SectionLabel className="mb-2">INCLUDES</SectionLabel>

			{/* Line items */}
			<div className="mb-4 space-y-px">
				{product.items.map((item) => (
					<div key={item.name} className="flex justify-between items-start text-xs">
						<span className="flex-1 uppercase break-words text-foreground">{item.name}</span>
						<span className="min-w-[72px] text-right shrink-0 text-foreground">{item.value}</span>
					</div>
				))}
			</div>

			<Divider variant="dashes" />

			{/* Total */}
			<div className="mb-4">
				<div className="flex justify-between text-xs font-bold">
					<span className="uppercase text-foreground">TOTAL:</span>
					<span className="text-foreground">{product.total}</span>
				</div>
			</div>

			{/* CTA */}
			<a
				href={product.link}
				className={cn(
					'inline-flex items-center justify-center gap-2 w-full text-center',
					'px-6 py-3 text-[11px] uppercase tracking-wide border border-foreground',
					'bg-foreground text-background no-underline cursor-pointer',
					'hover:opacity-80 transition-opacity',
					'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
				)}
			>
				{product.cta}
			</a>

			{/* Footer */}
			<div className="text-center pt-4 text-[11px]">
				<a
					href={product.learnMoreLink ?? product.link}
					className="text-[11px] no-underline lowercase text-muted-foreground hover:text-foreground transition-colors"
				>
					learn more
				</a>
			</div>
		</div>
	)
}
