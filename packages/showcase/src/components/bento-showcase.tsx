/**
 * Bento Layout Showcase
 * ─────────────────────────────────────────────────────────────────────────────
 * Comprehensive showcase for all Phase 1 bento layout primitives:
 * BentoSplit, BentoLeader, BentoQuad, BentoTriple, CellGrid, CellRow, StatCell
 */

import {
	BentoCell,
	BentoGrid,
	BentoLeader,
	BentoQuad,
	BentoSplit,
	BentoTriple,
	CellGrid,
	CellRow,
	StatCell,
} from "@/components/ui/layout-bento"
import { Glyph } from "@/components/ui/glyph"
import { VStack } from "@/components/ui/stack"
import { Typography } from "@/components/ui/typography"
import { ShowcaseSection } from "./showcase-section"

// ── Demo content helpers ──────────────────────────────────────────────────────

function ContentBlock({
	label,
	className = "",
}: {
	label: string
	className?: string
}) {
	return (
		<div className={`p-4 h-full flex flex-col gap-1 ${className}`}>
			<div className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</div>
		</div>
	)
}

function MetricContent({ label, value, trend }: { label: string; value: string; trend?: string }) {
	return (
		<div className="p-4 h-full">
			<div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{label}</div>
			<div className="text-2xl font-bold">{value}</div>
			{trend && <div className="text-xs text-muted-foreground mt-1">{trend}</div>}
		</div>
	)
}

function ChartPlaceholder({ label }: { label: string }) {
	return (
		<div className="p-4 h-32 flex flex-col justify-between">
			<div className="text-xs font-medium">{label}</div>
			<div className="flex items-end gap-1 h-16">
				{[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
					<div
						key={i}
						className="flex-1 bg-foreground/20 rounded-sm"
						style={{ height: `${h}%` }}
					/>
				))}
			</div>
		</div>
	)
}

// ── Sections ─────────────────────────────────────────────────────────────────

function BentoSplitDemo() {
	return (
		<VStack gap={4}>
			<Typography variant="heading-300">BentoSplit</Typography>
			<p className="text-xs text-muted-foreground">
				Fixed 200px icon panel (spans both rows) | content + stats stacked in the second column.
			</p>
			<BentoSplit
				icon={
					<VStack gap={2} align="center">
						<Glyph size={64} variant="filled">◆</Glyph>
						<div className="text-xs font-bold text-center">ACME</div>
					</VStack>
				}
				content={
					<div className="p-4">
						<div className="text-lg font-bold mb-1">Q2 2024 Summary</div>
						<div className="text-xs text-muted-foreground mb-3">
							Revenue up 24% quarter-over-quarter. All major targets exceeded.
						</div>
						<div className="flex gap-2 flex-wrap">
							<span className="text-xs border border-border px-2 py-0.5">Growth ↑</span>
							<span className="text-xs border border-border px-2 py-0.5">On Track</span>
							<span className="text-xs border border-border px-2 py-0.5">Q3 Ready</span>
						</div>
					</div>
				}
				stats={
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
						<div className="p-3 border-b sm:border-b-0 sm:border-r border-border">
							<div className="text-[10px] text-muted-foreground uppercase mb-0.5">Revenue</div>
							<div className="text-sm font-bold">$124k</div>
						</div>
						<div className="p-3 border-b sm:border-b-0 sm:border-r border-border">
							<div className="text-[10px] text-muted-foreground uppercase mb-0.5">Users</div>
							<div className="text-sm font-bold">3,891</div>
						</div>
						<div className="p-3">
							<div className="text-[10px] text-muted-foreground uppercase mb-0.5">NPS</div>
							<div className="text-sm font-bold">+68</div>
						</div>
					</div>
				}
			/>
		</VStack>
	)
}

function BentoLeaderDemo() {
	return (
		<VStack gap={4}>
			<Typography variant="heading-300">BentoLeader</Typography>
			<p className="text-xs text-muted-foreground">
				Full-width header spanning all columns, then N equal columns below.
			</p>
			<BentoLeader
				header={
					<ChartPlaceholder label="Monthly Revenue — Jan to Dec 2024" />
				}
				columns={[
					<MetricContent key="r" label="Total Revenue" value="$487k" trend="↑ 24% vs last year" />,
					<MetricContent key="o" label="Orders" value="2,341" trend="↑ 18% vs last year" />,
					<MetricContent key="c" label="Customers" value="891" trend="↑ 31% vs last year" />,
					<MetricContent key="a" label="Avg Order Value" value="$208" trend="↑ 5% vs last year" />,
				]}
			/>
			<BentoLeader
				header={
					<div className="p-4">
						<div className="text-sm font-bold">Server Status</div>
						<div className="text-xs text-muted-foreground">All systems operational</div>
					</div>
				}
				columns={[
					<MetricContent key="u" label="Uptime" value="99.98%" trend="Last 90 days" />,
					<MetricContent key="l" label="Avg Latency" value="42ms" trend="p50" />,
					<MetricContent key="e" label="Errors" value="0.01%" trend="Last 24h" />,
				]}
			/>
		</VStack>
	)
}

function BentoQuadDemo() {
	return (
		<VStack gap={4}>
			<Typography variant="heading-300">BentoQuad</Typography>
			<p className="text-xs text-muted-foreground">
				2×2 grid with [2fr | 1fr] column ratio. Mobile: stacked.
			</p>
			<BentoQuad
				topLeft={
					<div className="p-4">
						<div className="text-sm font-bold mb-2">Active Projects</div>
						<div className="space-y-2">
							{["Redesign — 80%", "API v2 — 45%", "Dashboard — 92%"].map((p) => {
								const [name, pct] = p.split(" — ")
								return (
									<div key={name}>
										<div className="flex justify-between text-xs mb-0.5">
											<span>{name}</span>
											<span className="text-muted-foreground">{pct}</span>
										</div>
										<div className="h-1 bg-border rounded-full overflow-hidden">
											<div
												className="h-full bg-foreground"
												style={{ width: pct }}
											/>
										</div>
									</div>
								)
							})}
						</div>
					</div>
				}
				topRight={
					<MetricContent label="Sprint Velocity" value="42pts" trend="↑ from 36" />
				}
				bottomLeft={
					<ChartPlaceholder label="Commits — Last 30 days" />
				}
				bottomRight={
					<MetricContent label="Open PRs" value="7" trend="3 awaiting review" />
				}
			/>
		</VStack>
	)
}

function BentoTripleDemo() {
	return (
		<VStack gap={4}>
			<Typography variant="heading-300">BentoTriple</Typography>
			<p className="text-xs text-muted-foreground">
				Header (full width) | aside + body | footer (full width). Aside = [1fr], body = [2fr].
			</p>
			<BentoTriple
				header={
					<div className="p-4 flex items-center justify-between">
						<div>
							<div className="text-sm font-bold">Product Analytics</div>
							<div className="text-xs text-muted-foreground">Week of 3–9 Jun 2024</div>
						</div>
						<div className="flex gap-2">
							<span className="text-xs border border-border px-2 py-0.5">Export</span>
							<span className="text-xs border border-border px-2 py-0.5">Share</span>
						</div>
					</div>
				}
				aside={
					<VStack gap={3} className="p-4">
						<StatCell label="DAU" value="1,284" large />
						<StatCell label="MAU" value="18,441" />
						<StatCell label="Retention D7" value="42%" />
						<StatCell label="Retention D30" value="28%" />
					</VStack>
				}
				body={
					<ChartPlaceholder label="Daily Active Users — past 30 days" />
				}
				footer={
					<div className="p-3 flex gap-8">
						<div className="text-xs"><span className="text-muted-foreground">Top feature: </span>Dashboard</div>
						<div className="text-xs"><span className="text-muted-foreground">Top source: </span>Organic</div>
						<div className="text-xs"><span className="text-muted-foreground">Avg session: </span>4m 22s</div>
					</div>
				}
			/>
		</VStack>
	)
}

function CellGridDemo() {
	return (
		<VStack gap={4}>
			<Typography variant="heading-300">CellGrid + StatCell</Typography>
			<p className="text-xs text-muted-foreground">
				Equal-column grid using gap-as-border. StatCell is the canonical cell child.
			</p>
			<VStack gap={4}>
				<div>
					<div className="text-xs text-muted-foreground mb-2">2-column</div>
					<CellGrid cols={2}>
						<StatCell label="Revenue" value="$124,820" large />
						<StatCell label="Expenses" value="$48,340" large />
					</CellGrid>
				</div>
				<div>
					<div className="text-xs text-muted-foreground mb-2">3-column</div>
					<CellGrid cols={3}>
						<StatCell label="New Users" value="1,284" />
						<StatCell label="Active" value="891" />
						<StatCell label="Churned" value="43" />
					</CellGrid>
				</div>
				<div>
					<div className="text-xs text-muted-foreground mb-2">4-column</div>
					<CellGrid cols={4}>
						<StatCell label="P1 Issues" value="0" />
						<StatCell label="P2 Issues" value="3" />
						<StatCell label="Open PRs" value="7" />
						<StatCell label="Deploys" value="12" />
					</CellGrid>
				</div>
				<div>
					<div className="text-xs text-muted-foreground mb-2">5-column (subtle)</div>
					<CellGrid cols={5} subtle>
						<StatCell label="Mon" value="142" />
						<StatCell label="Tue" value="198" />
						<StatCell label="Wed" value="176" />
						<StatCell label="Thu" value="221" />
						<StatCell label="Fri" value="167" />
					</CellGrid>
				</div>
			</VStack>
		</VStack>
	)
}

function CellRowDemo() {
	return (
		<VStack gap={4}>
			<Typography variant="heading-300">CellRow</Typography>
			<p className="text-xs text-muted-foreground">
				Flex-direction flip — mobile: stacked, desktop: side-by-side. Uses gap-as-divider.
			</p>
			<VStack gap={3}>
				<CellRow>
					<div className="bg-card p-4 md:w-48 md:shrink-0">
						<div className="text-[10px] text-muted-foreground uppercase mb-1">Label / Icon</div>
						<div className="text-sm font-bold">Profile</div>
					</div>
					<div className="bg-card p-4 flex-1">
						<div className="text-xs text-muted-foreground mb-1">Full Name</div>
						<div className="text-sm font-medium">Jane Doe</div>
					</div>
					<div className="bg-card p-4 flex-1">
						<div className="text-xs text-muted-foreground mb-1">Email</div>
						<div className="text-sm font-medium">jane@example.com</div>
					</div>
				</CellRow>
				<CellRow>
					<div className="bg-card p-4 md:w-48 md:shrink-0">
						<div className="text-[10px] text-muted-foreground uppercase mb-1">Stats</div>
						<Glyph size={32} variant="filled">▲</Glyph>
					</div>
					<div className="bg-card p-4 flex-1">
						<StatCell label="This week" value="+$4,200" large />
					</div>
					<div className="bg-card p-4 flex-1">
						<StatCell label="This month" value="+$18,900" large />
					</div>
					<div className="bg-card p-4 flex-1">
						<StatCell label="This year" value="+$124k" large />
					</div>
				</CellRow>
			</VStack>
		</VStack>
	)
}

function BentoGridDemo() {
	return (
		<VStack gap={4}>
			<Typography variant="heading-300">BentoGrid + BentoCell</Typography>
			<p className="text-xs text-muted-foreground">
				General-purpose grid with col/row span control. Background = border color; gap exposes it as lines.
			</p>
			<BentoGrid cols={3}>
				<BentoCell colSpan={2}>
					<ChartPlaceholder label="Revenue Trend" />
				</BentoCell>
				<BentoCell>
					<MetricContent label="MRR" value="$42k" trend="↑ 8% MoM" />
				</BentoCell>
				<BentoCell>
					<MetricContent label="Churn" value="1.2%" trend="↓ 0.3% MoM" />
				</BentoCell>
				<BentoCell>
					<MetricContent label="CAC" value="$84" trend="↓ $12 vs prev" />
				</BentoCell>
				<BentoCell>
					<MetricContent label="LTV" value="$1,248" trend="↑ $88 vs prev" />
				</BentoCell>
			</BentoGrid>
		</VStack>
	)
}

export function BentoShowcase() {
	return (
		<ShowcaseSection
			title="Bento Layout"
			description="Gap-as-border grid layouts for information-dense dashboards. The container background IS the border color — gap exposes it as ruled lines."
		>
			<VStack gap={12}>
				<BentoSplitDemo />
				<BentoLeaderDemo />
				<BentoQuadDemo />
				<BentoTripleDemo />
				<CellGridDemo />
				<CellRowDemo />
				<BentoGridDemo />
			</VStack>
		</ShowcaseSection>
	)
}
