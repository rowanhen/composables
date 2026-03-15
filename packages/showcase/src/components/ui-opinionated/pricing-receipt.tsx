/**
 * PricingReceipt (opinionated)
 * ─────────────────────────────────────────────────────────────────────────────
 * Receipt-styled pricing card. Composes composables primitives:
 *   - Divider / SectionLabel from receipt
 *   - Typography for all text
 *   - Button for the CTA
 *
 * All colors come from composables semantic tokens (bg-card, bg-muted,
 * text-muted-foreground, bg-foreground, text-background, etc.).
 *
 * Usage:
 *   <PricingReceipt product={myProduct} />
 */

import { Divider } from '@/components/ui/divider'
import { SectionLabel } from '@/components/ui/receipt'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
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
				'bg-card border border-border rounded-lg w-full flex-1 p-6 leading-tight font-mono',
				className,
			)}
		>
			{/* Header */}
			<div className="text-center mb-3">
				<Typography variant="heading-200" as="div" className="mb-1 font-mono">
					# {product.orderNum}
				</Typography>
				<Typography variant="label-100" as="div">
					{product.title}
				</Typography>
				<Typography variant="caption-100" as="div" className="mt-0.5 h-4">
					{product.subtitle || '\u00A0'}
				</Typography>
			</div>

			<Divider variant="pills" className="my-2" />

			<SectionLabel className="mb-2">INCLUDES</SectionLabel>

			{/* Line items */}
			<div className="mb-4 space-y-1">
				{product.items.map((item) => (
					<div key={item.name} className="flex justify-between items-start">
						<Typography variant="label-100" as="span" className="flex-1 break-words">
							{item.name}
						</Typography>
						<Typography variant="label-100" as="span" className="min-w-[72px] text-right shrink-0">
							{item.value}
						</Typography>
					</div>
				))}
			</div>

			<Divider variant="pills" className="my-2" />

			{/* Total */}
			<div className="mb-4 flex justify-between items-baseline">
				<Typography variant="label-100" as="span">
					TOTAL:
				</Typography>
				<Typography variant="brand-body-100" as="span" className="font-mono">
					{product.total}
				</Typography>
			</div>

			{/* CTA */}
			<Button
				variant="default"
				size="lg"
				className="w-full"
				render={<a href={product.link} />}
			>
				{product.cta}
			</Button>

			{/* Footer */}
			<div className="text-center pt-4">
				<Typography variant="caption-100" as="a" href={product.learnMoreLink ?? product.link} className="no-underline hover:text-foreground transition-colors">
					learn more
				</Typography>
			</div>
		</div>
	)
}
