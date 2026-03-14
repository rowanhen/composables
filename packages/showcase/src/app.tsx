import React from "react";
/* ---- UI components ---- */
import { Badge } from "@/components/ui/badge";
/* ---- Layout primitives ---- */
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { Spacer } from "@/components/ui/spacer";
import { HStack, VStack } from "@/components/ui/stack";
import { Switch } from "@/components/ui/switch";
import { Typography } from "@/components/ui/typography";

/* ---- Showcase components ---- */
import {
	AccordionShowcase,
	AlertDialogShowcase,
	AlertsShowcase,
	AspectRatioShowcase,
	AvatarShowcase,
	BadgesShowcase,
	BentoShowcase,
	BlockLoaderShowcase,
	BreadcrumbShowcase,
	ButtonsShowcase,
	CalendarShowcase,
	CardsShowcase,
	CarouselShowcase,
	CodeBlockShowcase,
	CollapsibleShowcase,
	ColorTokensShowcase,
	ContainerShowcase,
	DialogShowcase,
	DividerShowcase,
	DropdownMenuShowcase,
	DropzoneShowcase,
	EmptyShowcase,
	FormControlsShowcase,
	GridShowcase,
	HoverCardShowcase,
	IconShowcase,
	ItemShowcase,
	ListShowcase,
	PaginationShowcase,
	PopoverShowcase,
	PricingReceiptShowcase,
	ProgressShowcase,
	ReceiptShowcase,
	ResizableShowcase,
	ResponsiveGridShowcase,
	ScrollAreaShowcase,
	SelectShowcase,
	SeparatorShowcase,
	SheetShowcase,
	SkeletonShowcase,
	SliderShowcase,
	SpacingShowcase,
	StackShowcase,
	TableShowcase,
	TabsShowcase,
	ToastShowcase,
	ToggleShowcase,
	TokenConfigPanel,
	TooltipShowcase,
	TreeViewShowcase,
	TypographyShowcase,
} from "./components";

/* ---- NAV ---- */
const navItems = [
	"Color Tokens",
	"Typography",
	"Spacing Scale",
	"Container",
	"Grid System",
	"Stack & HStack",
	"Responsive Grid",
	"Buttons",
	"Badges",
	"Brand",
	"Icon",
	"Avatar",
	"Cards",
	"Alerts",
	"Accordion",
	"Collapsible",
	"Dialog",
	"Alert Dialog",
	"Sheet",
	"Dropdown Menu",
	"Popover",
	"Tooltip",
	"Hover Card",
	"Toast",
	"Tabs",
	"Table",
	"Carousel",
	"Progress",
	"Form Controls",
	"Select",
	"Toggle",
	"Slider",
	"Breadcrumb",
	"Pagination",
	"Calendar & Date Pickers",
	"Dropzone",
	"Scroll Area",
	"Resizable",
	"Aspect Ratio",
	"Item",
	"Empty State",
	"Skeletons",
	"Separator",
	"Divider",
	"Tree View",
	"Code Block",
	"Block Loader",
	"List",
	"Pricing Receipt",
	"Receipt Primitives",
	"Bento Layout",
];

/* ── Grid overlay styles ─────────────────────────────────────────────── */
const GRID_OVERLAY_STYLE: React.CSSProperties = {
	position: "fixed",
	inset: 0,
	pointerEvents: "none",
	zIndex: 9999,
	backgroundImage: `
		repeating-linear-gradient(
			to right,
			var(--grid-line-color) 0px,
			var(--grid-line-color) var(--border-width-base, 1px),
			transparent var(--border-width-base, 1px),
			transparent calc(var(--spacing) * 12)
		),
		repeating-linear-gradient(
			to bottom,
			var(--grid-line-color) 0px,
			var(--grid-line-color) var(--border-width-base, 1px),
			transparent var(--border-width-base, 1px),
			transparent calc(var(--spacing) * 12)
		)
	`,
	backgroundPosition: "center center",
};

/* ---- APP ---- */
export function App() {
	const [dark, setDark] = React.useState(false);
	const [gridOn, setGridOn] = React.useState(false);

	React.useEffect(() => {
		if (dark) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [dark]);

	// Inject --grid-line-color onto :root only while grid is active
	React.useEffect(() => {
		if (gridOn) {
			const color = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
			document.documentElement.style.setProperty("--grid-line-color", color);
		} else {
			document.documentElement.style.removeProperty("--grid-line-color");
		}
	}, [dark, gridOn]);

	return (
		<div className="min-h-screen bg-background text-foreground">
			<Toaster />

			{/* Grid overlay */}
			{gridOn && <div aria-hidden="true" style={GRID_OVERLAY_STYLE} />}

			{/* Header */}
			<header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
				<Container>
					<HStack align="center" justify="between" className="h-14">
						<HStack gap={3} align="center">
							<Typography variant="heading-300" as="h1">
								Composables
							</Typography>
							<Badge variant="outline">v0.1.0</Badge>
						</HStack>
						<HStack gap={3} align="center">
							<TokenConfigPanel />
							<Typography variant="caption-100" className="text-muted-foreground">
								Grid
							</Typography>
							<Switch
								checked={gridOn}
								onCheckedChange={setGridOn}
								aria-label="Toggle grid overlay"
							/>
							<Typography variant="caption-100">Dark mode</Typography>
							<Switch checked={dark} onCheckedChange={(checked) => setDark(checked)} />
						</HStack>
					</HStack>
				</Container>
			</header>

			<Container>
				<Spacer size={6} />

				{/* Quick nav */}
				<HStack gap={2} wrap className="pb-6">
					{navItems.map((item) => (
						<a
							key={item}
							href={`#${item.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
							className="text-xs text-muted-foreground hover:text-foreground transition-colors"
						>
							{item}
						</a>
					))}
				</HStack>

				<Separator />
				<Spacer size={10} />

				<VStack gap={16}>
					{/* Foundations */}
					<ColorTokensShowcase />
					<TypographyShowcase />
					<SpacingShowcase />

					{/* Layout */}
					<ContainerShowcase />
					<GridShowcase />
					<StackShowcase />
					<ResponsiveGridShowcase />

					{/* Actions */}
					<ButtonsShowcase />
					<BadgesShowcase />
					<IconShowcase />
					<AvatarShowcase />

					{/* Content */}
					<CardsShowcase />
					<AlertsShowcase />
					<AccordionShowcase />
					<CollapsibleShowcase />
					<ItemShowcase />

					{/* Overlays */}
					<DialogShowcase />
					<AlertDialogShowcase />
					<SheetShowcase />
					<DropdownMenuShowcase />
					<PopoverShowcase />
					<TooltipShowcase />
					<HoverCardShowcase />
					<ToastShowcase />

					{/* Navigation */}
					<TabsShowcase />
					<BreadcrumbShowcase />
					<PaginationShowcase />

					{/* Data display */}
					<TableShowcase />
					<CarouselShowcase />
					<ProgressShowcase />

					{/* Form controls */}
					<FormControlsShowcase />
					<SelectShowcase />
					<ToggleShowcase />
					<SliderShowcase />
					<CalendarShowcase />
					<DropzoneShowcase />

					{/* Utilities */}
					<ScrollAreaShowcase />
					<ResizableShowcase />
					<AspectRatioShowcase />
					<EmptyShowcase />
					<SkeletonShowcase />
					<SeparatorShowcase />
					<DividerShowcase />

					{/* Phase 2 */}
					<TreeViewShowcase />
					<CodeBlockShowcase />
					<BlockLoaderShowcase />
					<ListShowcase />
					<PricingReceiptShowcase />

					{/* Phase 1 — Receipt, Bento */}
					<ReceiptShowcase />
					<BentoShowcase />
				</VStack>

				<Spacer size={24} />

				{/* Footer */}
				<Separator />
				<Spacer size={6} />
				<HStack justify="between" align="center" className="pb-8">
					<Typography variant="caption-100">@leitware/composables</Typography>
					<Typography variant="caption-100">Composables Design System</Typography>
				</HStack>
			</Container>
		</div>
	);
}
