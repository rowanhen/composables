// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.

/* ---- Layout primitives ---- */
import { Separator } from '@/components/_internal/separator'
import { Toaster } from '@/components/_internal/sonner'
import { Spacer } from '@/components/_internal/spacer'
import { HStack, VStack } from '@/components/_internal/stack'
import { Typography } from '@/components/_internal/typography'

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
} from './components'

/* ---- APP ---- */
export function App() {
	return (
		<div className="min-h-screen bg-page text-foreground">
			<Toaster />

			{/* Floating theme injector — fixed top-right */}
			<ThemeInjector />

			<div className="wrap">
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
			</div>
		</div>
	)
}
