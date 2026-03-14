/**
 * Layout Showcase
 * ─────────────────────────────────────────────────────────────────────────────
 * Comprehensive showcase for all Phase 1 layout primitives:
 * Section, FlexSpacer, NewspaperGrid, NewspaperCell
 */

import {
	FlexSpacer,
	NewspaperCell,
	NewspaperGrid,
	Section,
} from "@/components/ui/layout"
import { VStack } from "@/components/ui/stack"
import { Typography } from "@/components/ui/typography"
import { ShowcaseSection } from "./showcase-section"

// ── Helpers ───────────────────────────────────────────────────────────────────

function CellContent({ title, body }: { title: string; body?: string }) {
	return (
		<div>
			<div className="text-xs font-bold uppercase mb-1">{title}</div>
			{body && <div className="text-xs text-muted-foreground leading-relaxed">{body}</div>}
		</div>
	)
}

// ── Sections ─────────────────────────────────────────────────────────────────

function SectionSpacingDemo() {
	return (
		<VStack gap={4}>
			<Typography variant="heading-300">Section — Spacing Variants</Typography>
			<p className="text-xs text-muted-foreground">
				Uses <code>--space-layout-sm/md/lg</code> tokens (default: 6×/12×/24× of <code>--spacing</code>).
				The colored bands show the vertical padding area.
			</p>
			<VStack gap={0}>
				<div className="border border-border">
					<div className="bg-muted/50 text-center text-[10px] text-muted-foreground py-0.5">sm spacing ({`--space-layout-sm`})</div>
					<Section spacing="sm" className="border-t border-b border-dashed border-border/50 bg-card">
						<div className="border border-border p-3 text-xs text-center text-muted-foreground">
							Section content — py-[var(--space-layout-sm)]
						</div>
					</Section>
				</div>
				<div className="border border-border border-t-0">
					<div className="bg-muted/50 text-center text-[10px] text-muted-foreground py-0.5">md spacing ({`--space-layout-md`}) — default</div>
					<Section spacing="md" className="border-t border-b border-dashed border-border/50 bg-card">
						<div className="border border-border p-3 text-xs text-center text-muted-foreground">
							Section content — py-[var(--space-layout-md)]
						</div>
					</Section>
				</div>
				<div className="border border-border border-t-0">
					<div className="bg-muted/50 text-center text-[10px] text-muted-foreground py-0.5">lg spacing ({`--space-layout-lg`})</div>
					<Section spacing="lg" className="border-t border-b border-dashed border-border/50 bg-card">
						<div className="border border-border p-3 text-xs text-center text-muted-foreground">
							Section content — py-[var(--space-layout-lg)]
						</div>
					</Section>
				</div>
			</VStack>
		</VStack>
	)
}

function FlexSpacerDemo() {
	return (
		<VStack gap={4}>
			<Typography variant="heading-300">FlexSpacer</Typography>
			<p className="text-xs text-muted-foreground">
				Pushes content apart inside flex containers. aria-hidden — decorative only.
			</p>
			<VStack gap={3}>
				<div className="border border-border p-3">
					<div className="text-[10px] text-muted-foreground mb-2">Navbar pattern: logo | spacer | actions</div>
					<div className="flex items-center border border-dashed border-border/50 p-2">
						<span className="text-xs font-bold">LOGO</span>
						<FlexSpacer />
						<div className="flex gap-2">
							<span className="text-xs border border-border px-2 py-0.5">Docs</span>
							<span className="text-xs border border-border px-2 py-0.5">Sign In</span>
						</div>
					</div>
				</div>
				<div className="border border-border p-3">
					<div className="text-[10px] text-muted-foreground mb-2">Row: label | spacer | badge</div>
					<div className="flex items-center border border-dashed border-border/50 p-2">
						<span className="text-xs">System Status</span>
						<FlexSpacer />
						<span className="text-xs text-green-600 border border-green-600/30 px-2 py-0.5">Operational</span>
					</div>
				</div>
				<div className="border border-border p-3">
					<div className="text-[10px] text-muted-foreground mb-2">Footer: copyright | spacer | links</div>
					<div className="flex items-center border border-dashed border-border/50 p-2">
						<span className="text-xs text-muted-foreground">© 2024 ACME Corp</span>
						<FlexSpacer />
						<div className="flex gap-3">
							<span className="text-xs text-muted-foreground">Privacy</span>
							<span className="text-xs text-muted-foreground">Terms</span>
						</div>
					</div>
				</div>
			</VStack>
		</VStack>
	)
}

function NewspaperGridDemo() {
	return (
		<VStack gap={4}>
			<Typography variant="heading-300">NewspaperGrid + NewspaperCell</Typography>
			<p className="text-xs text-muted-foreground">
				CSS grid using the newspaper-border pattern: container holds border-t + border-l;
				each cell adds border-b + border-r — every grid line drawn exactly once.
			</p>
			<VStack gap={8}>
				{/* 3-column, various spans */}
				<div>
					<div className="text-xs text-muted-foreground mb-2">3 columns — col/row spans</div>
					<NewspaperGrid cols={3}>
						<NewspaperCell span={2}>
							<CellContent
								title="Lead Story"
								body="The most important piece of content occupies prime real estate, spanning two columns. This pattern mirrors classical editorial layout."
							/>
						</NewspaperCell>
						<NewspaperCell>
							<CellContent title="Sidebar" body="Secondary content in a single column." />
						</NewspaperCell>
						<NewspaperCell>
							<CellContent title="Feature A" body="Equal-weight story." />
						</NewspaperCell>
						<NewspaperCell>
							<CellContent title="Feature B" body="Equal-weight story." />
						</NewspaperCell>
						<NewspaperCell>
							<CellContent title="Feature C" body="Equal-weight story." />
						</NewspaperCell>
					</NewspaperGrid>
				</div>

				{/* 4-column */}
				<div>
					<div className="text-xs text-muted-foreground mb-2">4 columns — standard grid</div>
					<NewspaperGrid cols={4}>
						<NewspaperCell span={3} rowSpan={2}>
							<div className="h-full flex flex-col gap-2 min-h-24">
								<CellContent title="Hero Feature" body="A large feature cell spanning 3 columns and 2 rows gives this story dominant visual weight." />
								<div className="flex gap-2 mt-auto">
									<span className="text-[10px] border border-border px-1.5 py-0.5">Analysis</span>
									<span className="text-[10px] border border-border px-1.5 py-0.5">Deep Dive</span>
								</div>
							</div>
						</NewspaperCell>
						<NewspaperCell>
							<CellContent title="Quick Read" body="Short-form content." />
						</NewspaperCell>
						<NewspaperCell>
							<CellContent title="Quick Read" body="Short-form content." />
						</NewspaperCell>
						<NewspaperCell>
							<CellContent title="Note A" />
						</NewspaperCell>
						<NewspaperCell>
							<CellContent title="Note B" />
						</NewspaperCell>
						<NewspaperCell>
							<CellContent title="Note C" />
						</NewspaperCell>
					</NewspaperGrid>
				</div>

				{/* 2-column */}
				<div>
					<div className="text-xs text-muted-foreground mb-2">2 columns — split layout</div>
					<NewspaperGrid cols={2}>
						<NewspaperCell>
							<CellContent title="Left Column" body="Primary content area with equal visual weight." />
						</NewspaperCell>
						<NewspaperCell>
							<CellContent title="Right Column" body="Secondary content area — same column width." />
						</NewspaperCell>
						<NewspaperCell span={2}>
							<CellContent title="Full-Width Footer Row" body="Spans both columns — useful for summary or call-to-action rows." />
						</NewspaperCell>
					</NewspaperGrid>
				</div>

				{/* Data grid use case */}
				<div>
					<div className="text-xs text-muted-foreground mb-2">Data grid — 4 columns, uniform cells</div>
					<NewspaperGrid cols={4}>
						{[
							{ metric: "Revenue", value: "$487k", change: "+24%" },
							{ metric: "Orders", value: "2,341", change: "+18%" },
							{ metric: "Avg Order", value: "$208", change: "+5%" },
							{ metric: "Refunds", value: "$3.2k", change: "-2%" },
							{ metric: "New Users", value: "1,284", change: "+31%" },
							{ metric: "Retention", value: "84%", change: "+3pp" },
							{ metric: "NPS", value: "+68", change: "+12" },
							{ metric: "CSAT", value: "4.7/5", change: "→" },
						].map(({ metric, value, change }) => (
							<NewspaperCell key={metric}>
								<div className="text-[10px] text-muted-foreground uppercase mb-0.5">{metric}</div>
								<div className="text-base font-bold">{value}</div>
								<div className="text-[10px] text-muted-foreground">{change}</div>
							</NewspaperCell>
						))}
					</NewspaperGrid>
				</div>
			</VStack>
		</VStack>
	)
}

export function LayoutShowcase() {
	return (
		<ShowcaseSection
			title="Layout Primitives"
			description="Rigid, snap-to-grid layout building blocks. Section controls macro vertical spacing via tokens; NewspaperGrid enforces the newspaper-border rule — each grid line drawn exactly once."
		>
			<VStack gap={12}>
				<SectionSpacingDemo />
				<FlexSpacerDemo />
				<NewspaperGridDemo />
			</VStack>
		</ShowcaseSection>
	)
}
