// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.
import { LineItem } from "@/components/_internal/line-item"
import { LineItemHeader } from "@/components/_internal/line-item-header"
import { Divider } from "@/components/_internal/divider"
import { Typography } from "@/components/_internal/typography"
import { HStack, VStack } from "@/components/_internal/stack"
import { ShowcaseGroup, ShowcaseSection } from "./showcase-section"
import { cn } from "@/lib/utils"

function DemoCard({
	title,
	children,
	className,
}: {
	title?: string
	children: React.ReactNode
	className?: string
}) {
	return (
		<div className={cn("w-full border border-stroke p-4 min-w-[240px] max-w-xs", className)}>
			{title && (
				<div className="text-muted-foreground mb-2 text-[10px] uppercase tracking-wider">
					{title}
				</div>
			)}
			{children}
		</div>
	)
}

function LineItemVariants() {
	return (
		<ShowcaseGroup label="LineItem Variants">
			<HStack gap={4} wrap align="start">
				<DemoCard title="default">
					<LineItem label={<Typography variant="body-100">Subtotal</Typography>} value={<Typography variant="body-100">$4,000</Typography>} variant="default" />
					<LineItem label={<Typography variant="body-100">Tax (8%)</Typography>} value={<Typography variant="body-100">$320</Typography>} variant="default" />
					<LineItem label={<Typography variant="body-100">Discount</Typography>} value={<Typography variant="body-100">-$200</Typography>} variant="default" />
				</DemoCard>
				<DemoCard title="fill — dots (default)">
					<LineItem label={<Typography variant="body-100">Consulting</Typography>} value={<Typography variant="body-100">$4,000</Typography>} variant="fill" />
					<LineItem label={<Typography variant="body-100">Hosting</Typography>} value={<Typography variant="body-100">$120</Typography>} variant="fill" />
					<LineItem label={<Typography variant="body-100">Support</Typography>} value={<Typography variant="body-100">$480</Typography>} variant="fill" />
				</DemoCard>
				<DemoCard title="fill — solid">
					<LineItem label={<Typography variant="body-100">Consulting</Typography>} value={<Typography variant="body-100">$4,000</Typography>} variant="fill" dividerVariant="solid" />
					<LineItem label={<Typography variant="body-100">Hosting</Typography>} value={<Typography variant="body-100">$120</Typography>} variant="fill" dividerVariant="solid" />
					<LineItem label={<Typography variant="body-100">Support</Typography>} value={<Typography variant="body-100">$480</Typography>} variant="fill" dividerVariant="solid" />
				</DemoCard>
				<DemoCard title="fill — pills">
					<LineItem label={<Typography variant="body-100">Consulting</Typography>} value={<Typography variant="body-100">$4,000</Typography>} variant="fill" dividerVariant="pills" />
					<LineItem label={<Typography variant="body-100">Hosting</Typography>} value={<Typography variant="body-100">$120</Typography>} variant="fill" dividerVariant="pills" />
					<LineItem label={<Typography variant="body-100">Support</Typography>} value={<Typography variant="body-100">$480</Typography>} variant="fill" dividerVariant="pills" />
				</DemoCard>
				<DemoCard title="fill — hideDivider">
					<LineItem label={<Typography variant="body-100">Consulting</Typography>} value={<Typography variant="body-100">$4,000</Typography>} variant="fill" hideDivider />
					<LineItem label={<Typography variant="body-100">Hosting</Typography>} value={<Typography variant="body-100">$120</Typography>} variant="fill" hideDivider />
					<LineItem label={<Typography variant="body-100">Support</Typography>} value={<Typography variant="body-100">$480</Typography>} variant="fill" hideDivider />
				</DemoCard>
				<DemoCard title="bold (totals)">
					<LineItem label={<Typography variant="body-100">Subtotal</Typography>} value={<Typography variant="body-100">$4,600</Typography>} variant="fill" />
					<Divider variant="solid" className="my-2" />
					<LineItem label={<Typography variant="brand-body-100">Total Due</Typography>} value={<Typography variant="brand-body-100">$4,600</Typography>} variant="bold" />
					<LineItem label={<Typography variant="brand-body-100">Paid</Typography>} value={<Typography variant="brand-body-100">-$4,600</Typography>} variant="bold" />
				</DemoCard>
				<DemoCard title="compact">
					<LineItem label={<Typography variant="caption-100">Jan 2024</Typography>} value={<Typography variant="caption-100">$800</Typography>} variant="compact" />
					<LineItem label={<Typography variant="caption-100">Feb 2024</Typography>} value={<Typography variant="caption-100">$1,200</Typography>} variant="compact" />
					<LineItem label={<Typography variant="caption-100">Mar 2024</Typography>} value={<Typography variant="caption-100">$950</Typography>} variant="compact" />
					<LineItem label={<Typography variant="caption-100">Apr 2024</Typography>} value={<Typography variant="caption-100">$1,100</Typography>} variant="compact" />
					<LineItem label={<Typography variant="caption-100">May 2024</Typography>} value={<Typography variant="caption-100">$1,400</Typography>} variant="compact" />
					<LineItem label={<Typography variant="caption-100">Jun 2024</Typography>} value={<Typography variant="caption-100">$900</Typography>} variant="compact" />
				</DemoCard>
			</HStack>
		</ShowcaseGroup>
	)
}

function LineItemHeaderVariants() {
	return (
		<ShowcaseGroup label="LineItemHeader Variants">
			<HStack gap={4} wrap align="start">
				<DemoCard title="default (filled)">
					<LineItemHeader>Services</LineItemHeader>
					<div className="py-1 space-y-px">
						<LineItem label={<Typography variant="body-100">Design</Typography>} value={<Typography variant="body-100">$2,000</Typography>} variant="fill" />
						<LineItem label={<Typography variant="body-100">Development</Typography>} value={<Typography variant="body-100">$2,000</Typography>} variant="fill" />
					</div>
					<LineItemHeader>Expenses</LineItemHeader>
					<div className="py-1 space-y-px">
						<LineItem label={<Typography variant="body-100">Travel</Typography>} value={<Typography variant="body-100">$320</Typography>} variant="fill" />
						<LineItem label={<Typography variant="body-100">Software</Typography>} value={<Typography variant="body-100">$150</Typography>} variant="fill" />
					</div>
				</DemoCard>
				<DemoCard title="bordered">
					<LineItemHeader variant="bordered">Invoice #0042</LineItemHeader>
					<div className="py-1 space-y-px">
						<LineItem label={<Typography variant="body-100">Client</Typography>} value={<Typography variant="body-100">ACME Corp</Typography>} />
						<LineItem label={<Typography variant="body-100">Date</Typography>} value={<Typography variant="body-100">2024-06-01</Typography>} />
						<LineItem label={<Typography variant="body-100">Due</Typography>} value={<Typography variant="body-100">2024-06-30</Typography>} />
					</div>
					<LineItemHeader variant="bordered">Payment</LineItemHeader>
					<div className="py-1 space-y-px">
						<LineItem label={<Typography variant="body-100">Method</Typography>} value={<Typography variant="body-100">Bank Transfer</Typography>} />
						<LineItem label={<Typography variant="body-100">Status</Typography>} value={<Typography variant="body-100">PENDING</Typography>} />
					</div>
				</DemoCard>
				<DemoCard title="centered">
					<LineItemHeader centered>Q2 Summary</LineItemHeader>
					<div className="py-1 space-y-px">
						<LineItem label={<Typography variant="body-100">Revenue</Typography>} value={<Typography variant="body-100">$24,800</Typography>} variant="fill" />
						<LineItem label={<Typography variant="body-100">Expenses</Typography>} value={<Typography variant="body-100">$8,200</Typography>} variant="fill" />
					</div>
					<LineItemHeader variant="bordered" centered>Net Total</LineItemHeader>
					<div className="py-1 space-y-px">
						<LineItem label={<Typography variant="brand-body-100">Profit</Typography>} value={<Typography variant="brand-body-100">$16,600</Typography>} variant="bold" />
					</div>
				</DemoCard>
			</HStack>
		</ShowcaseGroup>
	)
}

function LineItemLongContent() {
	return (
		<ShowcaseGroup label="Long Content">
			<HStack gap={4} wrap align="start">
				<DemoCard title="long label">
					<LineItem
						label={<Typography variant="body-100">Brand identity design including logo, color palette, and typography guidelines</Typography>}
						value={<Typography variant="body-100">$3,200</Typography>}
						variant="fill"
					/>
					<LineItem
						label={<Typography variant="body-100">Frontend development and responsive implementation</Typography>}
						value={<Typography variant="body-100">$4,800</Typography>}
						variant="fill"
					/>
				</DemoCard>
				<DemoCard title="long value">
					<LineItem
						label={<Typography variant="body-100">Payment</Typography>}
						value={<Typography variant="body-100">Wire transfer to First National Bank, Account #4821</Typography>}
						variant="fill"
					/>
					<LineItem
						label={<Typography variant="body-100">Notes</Typography>}
						value={<Typography variant="body-100">Net 30, early payment discount of 2% available</Typography>}
						variant="fill"
					/>
				</DemoCard>
				<DemoCard title="long both">
					<LineItem
						label={<Typography variant="body-100">User experience research and usability testing</Typography>}
						value={<Typography variant="body-100">40 hours @ $120/hr</Typography>}
						variant="fill"
					/>
					<LineItem
						label={<Typography variant="body-100">Full-stack application development and deployment</Typography>}
						value={<Typography variant="body-100">120 hours @ $150/hr</Typography>}
						variant="fill"
					/>
				</DemoCard>
			</HStack>
		</ShowcaseGroup>
	)
}

function LineItemComposition() {
	return (
		<ShowcaseGroup label="Composition">
			<HStack gap={4} wrap align="start">
				<div className="w-full border border-stroke p-4 max-w-sm">
					<LineItemHeader>Services</LineItemHeader>
					<div className="py-1 space-y-px">
						<LineItem label={<Typography variant="body-100">Brand Identity</Typography>} value={<Typography variant="body-100">$3,200</Typography>} variant="fill" />
						<LineItem label={<Typography variant="body-100">UI Design (20h)</Typography>} value={<Typography variant="body-100">$2,400</Typography>} variant="fill" />
						<LineItem label={<Typography variant="body-100">Development</Typography>} value={<Typography variant="body-100">$4,800</Typography>} variant="fill" />
					</div>
					<LineItemHeader>Expenses</LineItemHeader>
					<div className="py-1 space-y-px">
						<LineItem label={<Typography variant="body-100">Stock photography</Typography>} value={<Typography variant="body-100">$180</Typography>} variant="fill" />
						<LineItem label={<Typography variant="body-100">Font licenses</Typography>} value={<Typography variant="body-100">$60</Typography>} variant="fill" />
					</div>
					<Divider variant="pills" className="my-2" />
					<LineItem label={<Typography variant="body-100">Subtotal</Typography>} value={<Typography variant="body-100">$10,640</Typography>} />
					<LineItem label={<Typography variant="caption-100">Discount (5%)</Typography>} value={<Typography variant="caption-100">-$532</Typography>} variant="compact" />
					<LineItem label={<Typography variant="caption-100">VAT (20%)</Typography>} value={<Typography variant="caption-100">$2,022</Typography>} variant="compact" />
					<Divider variant="solid" className="my-2" />
					<LineItem label={<Typography variant="brand-body-100">Total Due</Typography>} value={<Typography variant="brand-body-100">$12,130</Typography>} variant="bold" />
				</div>
				<div className="w-full border border-stroke p-4 max-w-sm">
					<Typography variant="heading-200" className="mb-3">Mixed Typography</Typography>
					<LineItem
						label={<Typography variant="heading-100">Consulting</Typography>}
						value={<Typography variant="body-100" className="text-muted-foreground">$4,000</Typography>}
						variant="fill"
					/>
					<LineItem
						label={<Typography variant="heading-100">Development</Typography>}
						value={<Typography variant="body-100" className="text-muted-foreground">$8,000</Typography>}
						variant="fill"
					/>
					<Divider variant="solid" className="my-2" />
					<LineItem
						label={<Typography variant="brand-heading-200">Total</Typography>}
						value={<Typography variant="brand-heading-200">$12,000</Typography>}
						variant="bold"
					/>
				</div>
			</HStack>
		</ShowcaseGroup>
	)
}

export function LineItemShowcase() {
	return (
		<ShowcaseSection
			title="LineItem & LineItemHeader"
			description="Key-value row and section header primitives for receipt-style layouts. LineItem supports dot, solid, and pills divider leaders. LineItemHeader separates content sections with filled or bordered labels."
		>
			<VStack gap={12}>
				<LineItemVariants />
				<LineItemHeaderVariants />
				<LineItemLongContent />
				<LineItemComposition />
			</VStack>
		</ShowcaseSection>
	)
}
