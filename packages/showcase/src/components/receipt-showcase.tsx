/**
 * Receipt Showcase
 * ─────────────────────────────────────────────────────────────────────────────
 * Comprehensive showcase for all Phase 1 receipt primitives:
 * Divider, SectionLabel, Row, DataTable, Glyph, Ledger
 */

import { HStack, VStack } from "@/components/ui/stack"
import { Divider } from "@/components/ui/divider"
import {
	Glyph,
	DataTable,
	Ledger,
	Row,
	SectionLabel,
} from "@/components/ui/receipt"
import { Typography } from "@/components/ui/typography"
import { ShowcaseSection } from "./showcase-section"

// ── Demo receipt container ────────────────────────────────────────────────────
function ReceiptCard({
	title,
	children,
	width = "w-64",
}: {
	title?: string
	children: React.ReactNode
	width?: string
}) {
	return (
		<div className={`border border-border p-4 font-mono text-xs ${width}`}>
			{title && (
				<div className="text-muted-foreground mb-2 text-[10px] uppercase tracking-wider">
					{title}
				</div>
			)}
			{children}
		</div>
	)
}

// ── Sub-sections ─────────────────────────────────────────────────────────────

function DividerVariants() {
	return (
		<VStack gap={4}>
			<Typography variant="heading-300">Divider Variants</Typography>
			<ReceiptCard title="All 3 variants" width="w-80">
				<div className="space-y-1">
					<div className="text-[10px] text-muted-foreground uppercase">dots (default)</div>
					<Divider variant="dots" className="my-2" />
					<div className="text-[10px] text-muted-foreground uppercase">pills</div>
					<Divider variant="pills" className="my-2" />
					<div className="text-[10px] text-muted-foreground uppercase">solid</div>
					<Divider variant="solid" className="my-2" />
				</div>
			</ReceiptCard>
		</VStack>
	)
}

function RowVariants() {
	return (
		<VStack gap={4}>
			<Typography variant="heading-300">Row Variants</Typography>
			<HStack gap={4} wrap align="start">
				<ReceiptCard title="default">
					<Row label="Subtotal" value="$4,000" variant="default" />
					<Row label="Tax (8%)" value="$320" variant="default" />
					<Row label="Discount" value="-$200" variant="default" />
				</ReceiptCard>
				<ReceiptCard title="fill (dot-leader)">
					<Row label="Consulting" value="$4,000" variant="fill" />
					<Row label="Hosting" value="$120" variant="fill" />
					<Row label="Support" value="$480" variant="fill" />
				</ReceiptCard>
				<ReceiptCard title="bold (totals)">
					<Row label="Subtotal" value="$4,600" variant="fill" />
					<Divider variant="solid" className="my-2" />
					<Row label="Total Due" value="$4,600" variant="bold" />
					<Row label="Paid" value="-$4,600" variant="bold" />
				</ReceiptCard>
				<ReceiptCard title="compact">
					<Row label="Jan 2024" value="$800" variant="compact" />
					<Row label="Feb 2024" value="$1,200" variant="compact" />
					<Row label="Mar 2024" value="$950" variant="compact" />
					<Row label="Apr 2024" value="$1,100" variant="compact" />
					<Row label="May 2024" value="$1,400" variant="compact" />
					<Row label="Jun 2024" value="$900" variant="compact" />
				</ReceiptCard>
			</HStack>
		</VStack>
	)
}

function SectionLabelVariants() {
	return (
		<VStack gap={4}>
			<Typography variant="heading-300">SectionLabel Variants</Typography>
			<HStack gap={4} wrap align="start">
				<ReceiptCard title="default (inverted)">
					<SectionLabel>Services</SectionLabel>
					<div className="py-1 space-y-px">
						<Row label="Design" value="$2,000" variant="fill" />
						<Row label="Development" value="$2,000" variant="fill" />
					</div>
					<SectionLabel>Expenses</SectionLabel>
					<div className="py-1 space-y-px">
						<Row label="Travel" value="$320" variant="fill" />
						<Row label="Software" value="$150" variant="fill" />
					</div>
				</ReceiptCard>
				<ReceiptCard title="bordered">
					<SectionLabel variant="bordered">Invoice #0042</SectionLabel>
					<div className="py-1 space-y-px">
						<Row label="Client" value="ACME Corp" />
						<Row label="Date" value="2024-06-01" />
						<Row label="Due" value="2024-06-30" />
					</div>
					<SectionLabel variant="bordered">Payment</SectionLabel>
					<div className="py-1 space-y-px">
						<Row label="Method" value="Bank Transfer" />
						<Row label="Status" value="PENDING" />
					</div>
				</ReceiptCard>
			</HStack>
		</VStack>
	)
}

function DataTableDemo() {
	return (
		<VStack gap={4}>
			<Typography variant="heading-300">DataTable</Typography>
			<ReceiptCard title="service breakdown" width="w-96">
				<DataTable
					columns={[
						{ label: "Service", width: 18 },
						{ label: "Qty", width: 4, align: "right" },
						{ label: "Rate", width: 8, align: "right" },
						{ label: "Amount", align: "right" },
					]}
					rows={[
						["Design", "1", "$2,000", "$2,000"],
						["Dev", "2", "$1,500", "$3,000"],
						["QA", "1", "$800", "$800"],
						["Deploy", "1", "$200", "$200"],
					]}
				/>
			</ReceiptCard>
			<ReceiptCard title="monthly revenue" width="w-80">
				<DataTable
					columns={[
						{ label: "Month", width: 10 },
						{ label: "Orders", width: 8, align: "right" },
						{ label: "Revenue", align: "right" },
					]}
					rows={[
						["Jan", "42", "$8,400"],
						["Feb", "58", "$11,600"],
						["Mar", "51", "$10,200"],
						["Apr", "67", "$13,400"],
					]}
				/>
			</ReceiptCard>
		</VStack>
	)
}

function GlyphVariants() {
	return (
		<VStack gap={4}>
			<Typography variant="heading-300">Glyph Variants</Typography>
			<VStack gap={4}>
				<div>
					<div className="text-xs text-muted-foreground mb-2">Variants at size 48</div>
					<HStack gap={3} wrap>
						<VStack gap={1} align="center">
							<Glyph size={48} variant="default">★</Glyph>
							<span className="text-[10px] text-muted-foreground">default</span>
						</VStack>
						<VStack gap={1} align="center">
							<Glyph size={48} variant="filled">★</Glyph>
							<span className="text-[10px] text-muted-foreground">filled</span>
						</VStack>
						<VStack gap={1} align="center">
							<Glyph size={48} variant="circle">★</Glyph>
							<span className="text-[10px] text-muted-foreground">circle</span>
						</VStack>
						<VStack gap={1} align="center">
							<Glyph size={48} variant="circle-inverted">★</Glyph>
							<span className="text-[10px] text-muted-foreground">circle-inverted</span>
						</VStack>
					</HStack>
				</div>
				<div>
					<div className="text-xs text-muted-foreground mb-2">All sizes (filled variant)</div>
					<HStack gap={3} wrap align="end">
						{([16, 24, 32, 48, 64, 96] as const).map((size) => (
							<VStack key={size} gap={1} align="center">
								<Glyph size={size} variant="filled">#</Glyph>
								<span className="text-[10px] text-muted-foreground">{size}px</span>
							</VStack>
						))}
					</HStack>
				</div>
				<div>
					<div className="text-xs text-muted-foreground mb-2">Common symbols</div>
					<HStack gap={2} wrap>
						{(["✓", "✕", "!", "?", "→", "↑", "◆", "●", "▲", "■"] as const).map((char) => (
							<Glyph key={char} size={32} variant="default">{char}</Glyph>
						))}
					</HStack>
				</div>
			</VStack>
		</VStack>
	)
}

function LedgerVariants() {
	return (
		<VStack gap={4}>
			<Typography variant="heading-300">Ledger</Typography>
			<HStack gap={4} wrap align="start">
				<ReceiptCard title="simple ledger">
					<Ledger
						title="Services"
						rows={[
							{ label: "Design", value: "$2,000", variant: "fill" },
							{ label: "Development", value: "$3,000", variant: "fill" },
							{ label: "QA Testing", value: "$800", variant: "fill" },
						]}
						total={{ label: "Total", value: "$5,800" }}
					/>
				</ReceiptCard>
				<ReceiptCard title="multi-section ledger">
					<Ledger
						title="Phase 1"
						rows={[
							{ label: "Discovery", value: "$1,500", variant: "fill" },
							{ label: "Wireframes", value: "$800", variant: "fill" },
						]}
					/>
					<div className="mt-2" />
					<Ledger
						title="Phase 2"
						rows={[
							{ label: "Design", value: "$2,000", variant: "fill" },
							{ label: "Development", value: "$3,000", variant: "fill" },
							{ label: "Testing", value: "$600", variant: "fill" },
						]}
						total={{ label: "Project Total", value: "$7,900" }}
					/>
				</ReceiptCard>
				<ReceiptCard title="mixed variants">
					<Ledger
						rows={[
							{ label: "Consulting (10hrs)", value: "$1,500", variant: "fill" },
							{ label: "Hosting (annual)", value: "$240", variant: "fill" },
							{ label: "Support retainer", value: "$600", variant: "fill" },
							{ label: "Subtotal", value: "$2,340", variant: "bold" },
							{ label: "Discount (10%)", value: "-$234", variant: "compact" },
							{ label: "Tax (8%)", value: "$168", variant: "compact" },
						]}
						total={{ label: "Amount Due", value: "$2,274" }}
					/>
				</ReceiptCard>
			</HStack>
		</VStack>
	)
}

function CompleteReceiptComposition() {
	return (
		<VStack gap={4}>
			<Typography variant="heading-300">Complete Composition</Typography>
			<div className="border border-border p-4 font-mono text-xs w-80">
				{/* Header */}
				<div className="text-center mb-3">
					<Glyph size={32} variant="filled" className="mx-auto mb-1">◆</Glyph>
					<div className="font-bold uppercase text-sm">ACME CORP</div>
					<div className="text-muted-foreground text-[10px]">123 Business St, London EC1A 1BB</div>
					<div className="text-muted-foreground text-[10px]">VAT: GB123456789</div>
				</div>
				<Divider variant="solid" className="my-2" />
				<Row label="Invoice #" value="INV-2024-042" />
				<Row label="Date" value="01 Jun 2024" />
				<Row label="Due Date" value="30 Jun 2024" />
				<Divider variant="pills" className="my-2" />
				<SectionLabel>Services</SectionLabel>
				<div className="py-1 space-y-px">
					<Row label="Brand Identity" value="$3,200" variant="fill" />
					<Row label="UI Design (20h)" value="$2,400" variant="fill" />
					<Row label="Development" value="$4,800" variant="fill" />
				</div>
				<SectionLabel>Expenses</SectionLabel>
				<div className="py-1 space-y-px">
					<Row label="Stock photography" value="$180" variant="fill" />
					<Row label="Font licenses" value="$60" variant="fill" />
				</div>
				<Divider variant="pills" className="my-2" />
				<Row label="Subtotal" value="$10,640" />
				<Row label="Discount (5%)" value="-$532" variant="compact" />
				<Row label="VAT (20%)" value="$2,022" variant="compact" />
				<Divider variant="solid" className="my-2" />
				<Row label="Total Due" value="$12,130" variant="bold" />
				<Divider variant="dots" className="my-2" />
				<DataTable
					columns={[
						{ label: "Payment terms", width: 18 },
						{ label: "Status", align: "right" },
					]}
					rows={[
						["Bank Transfer", "PENDING"],
						["Net 30", "DUE"],
					]}
				/>
				<Divider variant="dots" className="my-2" />
				<div className="text-center text-[10px] text-muted-foreground">
					Thank you for your business.
				</div>
			</div>
		</VStack>
	)
}

export function ReceiptShowcase() {
	return (
		<ShowcaseSection
			title="Receipt Primitives"
			description="Thermal receipt-inspired layout primitives for information-dense data UIs. All components adapt to the active preset's base tokens."
		>
			<VStack gap={12}>
				<DividerVariants />
				<RowVariants />
				<SectionLabelVariants />
				<DataTableDemo />
				<GlyphVariants />
				<LedgerVariants />
				<CompleteReceiptComposition />
			</VStack>
		</ShowcaseSection>
	)
}
