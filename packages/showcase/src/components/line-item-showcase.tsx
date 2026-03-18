// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.
import { LineItem } from "@/components/_internal/line-item"
import { LineItemHeader } from "@/components/_internal/line-item-header"
import { Divider } from "@/components/_internal/divider"
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
		<div className={cn("w-full border border-border p-4 font-mono text-xs min-w-[240px] max-w-xs", className)}>
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
					<LineItem label="Subtotal" value="$4,000" variant="default" />
					<LineItem label="Tax (8%)" value="$320" variant="default" />
					<LineItem label="Discount" value="-$200" variant="default" />
				</DemoCard>
				<DemoCard title="fill — dots (default)">
					<LineItem label="Consulting" value="$4,000" variant="fill" />
					<LineItem label="Hosting" value="$120" variant="fill" />
					<LineItem label="Support" value="$480" variant="fill" />
				</DemoCard>
				<DemoCard title="fill — solid">
					<LineItem label="Consulting" value="$4,000" variant="fill" dividerVariant="solid" />
					<LineItem label="Hosting" value="$120" variant="fill" dividerVariant="solid" />
					<LineItem label="Support" value="$480" variant="fill" dividerVariant="solid" />
				</DemoCard>
				<DemoCard title="fill — pills">
					<LineItem label="Consulting" value="$4,000" variant="fill" dividerVariant="pills" />
					<LineItem label="Hosting" value="$120" variant="fill" dividerVariant="pills" />
					<LineItem label="Support" value="$480" variant="fill" dividerVariant="pills" />
				</DemoCard>
				<DemoCard title="fill — hideDivider">
					<LineItem label="Consulting" value="$4,000" variant="fill" hideDivider />
					<LineItem label="Hosting" value="$120" variant="fill" hideDivider />
					<LineItem label="Support" value="$480" variant="fill" hideDivider />
				</DemoCard>
				<DemoCard title="bold (totals)">
					<LineItem label="Subtotal" value="$4,600" variant="fill" />
					<Divider variant="solid" className="my-2" />
					<LineItem label="Total Due" value="$4,600" variant="bold" />
					<LineItem label="Paid" value="-$4,600" variant="bold" />
				</DemoCard>
				<DemoCard title="compact">
					<LineItem label="Jan 2024" value="$800" variant="compact" />
					<LineItem label="Feb 2024" value="$1,200" variant="compact" />
					<LineItem label="Mar 2024" value="$950" variant="compact" />
					<LineItem label="Apr 2024" value="$1,100" variant="compact" />
					<LineItem label="May 2024" value="$1,400" variant="compact" />
					<LineItem label="Jun 2024" value="$900" variant="compact" />
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
						<LineItem label="Design" value="$2,000" variant="fill" />
						<LineItem label="Development" value="$2,000" variant="fill" />
					</div>
					<LineItemHeader>Expenses</LineItemHeader>
					<div className="py-1 space-y-px">
						<LineItem label="Travel" value="$320" variant="fill" />
						<LineItem label="Software" value="$150" variant="fill" />
					</div>
				</DemoCard>
				<DemoCard title="bordered">
					<LineItemHeader variant="bordered">Invoice #0042</LineItemHeader>
					<div className="py-1 space-y-px">
						<LineItem label="Client" value="ACME Corp" />
						<LineItem label="Date" value="2024-06-01" />
						<LineItem label="Due" value="2024-06-30" />
					</div>
					<LineItemHeader variant="bordered">Payment</LineItemHeader>
					<div className="py-1 space-y-px">
						<LineItem label="Method" value="Bank Transfer" />
						<LineItem label="Status" value="PENDING" />
					</div>
				</DemoCard>
				<DemoCard title="centered">
					<LineItemHeader centered>Q2 Summary</LineItemHeader>
					<div className="py-1 space-y-px">
						<LineItem label="Revenue" value="$24,800" variant="fill" />
						<LineItem label="Expenses" value="$8,200" variant="fill" />
					</div>
					<LineItemHeader variant="bordered" centered>Net Total</LineItemHeader>
					<div className="py-1 space-y-px">
						<LineItem label="Profit" value="$16,600" variant="bold" />
					</div>
				</DemoCard>
			</HStack>
		</ShowcaseGroup>
	)
}

function LineItemComposition() {
	return (
		<ShowcaseGroup label="Composition">
			<div className="w-full border border-border p-4 font-mono text-xs max-w-sm">
				<LineItemHeader>Services</LineItemHeader>
				<div className="py-1 space-y-px">
					<LineItem label="Brand Identity" value="$3,200" variant="fill" />
					<LineItem label="UI Design (20h)" value="$2,400" variant="fill" />
					<LineItem label="Development" value="$4,800" variant="fill" />
				</div>
				<LineItemHeader>Expenses</LineItemHeader>
				<div className="py-1 space-y-px">
					<LineItem label="Stock photography" value="$180" variant="fill" />
					<LineItem label="Font licenses" value="$60" variant="fill" />
				</div>
				<Divider variant="pills" className="my-2" />
				<LineItem label="Subtotal" value="$10,640" />
				<LineItem label="Discount (5%)" value="-$532" variant="compact" />
				<LineItem label="VAT (20%)" value="$2,022" variant="compact" />
				<Divider variant="solid" className="my-2" />
				<LineItem label="Total Due" value="$12,130" variant="bold" />
			</div>
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
				<LineItemComposition />
			</VStack>
		</ShowcaseSection>
	)
}
