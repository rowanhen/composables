/* ---- Layout primitives ---- */
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { Spacer } from "@/components/ui/spacer";
import { HStack, VStack } from "@/components/ui/stack";
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
	GlyphShowcase,
	LineItemShowcase,
	PricingCardShowcase,
	ProgressShowcase,
	ResizableShowcase,
	ResponsiveGridShowcase,
	ScrollAreaShowcase,
	SelectShowcase,
	SeparatorShowcase,
	SheetShowcase,
	SkeletonShowcase,
	SliderShowcase,
	SpacingShowcase,
	SidebarShowcase,
	StackShowcase,
	TableShowcase,
	TabsShowcase,
	ToastShowcase,
	ToggleShowcase,
	ThemeInjector,
	TooltipShowcase,
	TreeViewShowcase,
	TypographyShowcase,
} from "./components";



/* ---- APP ---- */
export function App() {
	return (
		<div className="min-h-screen bg-background text-foreground">
			<Toaster />

			{/* Floating theme injector — fixed top-right */}
			<ThemeInjector />

			<Container>
				<Spacer size={10} />

				<VStack gap={16}>
					{/* Foundations */}
					<ColorTokensShowcase />
					<TypographyShowcase />

					{/* Layout & Spacing */}
					<SpacingShowcase />
					<ContainerShowcase />
					<GridShowcase />
					<StackShowcase />
					<ResponsiveGridShowcase />
					<BentoShowcase />

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
					<ListShowcase />

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
					<SidebarShowcase />
					<TabsShowcase />
					<BreadcrumbShowcase />
					<PaginationShowcase />

					{/* Data Display */}
					<TableShowcase />
					<CarouselShowcase />
					<ProgressShowcase />
					<TreeViewShowcase />
					<CodeBlockShowcase />

					{/* Form Controls */}
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
					<BlockLoaderShowcase />

					{/* LineItem, Glyph & Pricing */}
					<LineItemShowcase />
					<GlyphShowcase />
					<PricingCardShowcase />
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
