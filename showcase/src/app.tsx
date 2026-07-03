// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.

/* ---- Layout primitives ---- */
import { Separator } from '@/components/_internal/separator'
import { Spacer } from '@/components/_internal/spacer'
import { HStack, VStack } from '@/components/_internal/stack'
import { Typography } from '@/components/_internal/typography'
import { Container } from '@/components/ui-opinionated/container'

/* ---- Showcase components ---- */
import {
	AIElementsShowcase,
	AccordionShowcase,
	AlertDialogShowcase,
	AlertsShowcase,
	AspectRatioShowcase,
	AvatarShowcase,
	BadgesShowcase,
	BentoShowcase,
	BreadcrumbShowcase,
	BubbleShowcase,
	ButtonsShowcase,
	CalendarShowcase,
	CardsShowcase,
	CarouselShowcase,
	CodeBlockShowcase,
	CollapsibleShowcase,
	ColorTokensShowcase,
	ContainerShowcase,
	DialogShowcase,
	DirectionShowcase,
	DividerShowcase,
	DropdownMenuShowcase,
	DropzoneShowcase,
	EmptyShowcase,
	FormControlsShowcase,
	GridShowcase,
	HoverCardShowcase,
	IconShowcase,
	ItemShowcase,
	KbdShowcase,
	ListShowcase,
	MarkerShowcase,
	MessageShowcase,
	NativeSelectShowcase,
	PaginationShowcase,
	PopoverShowcase,
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
	ToggleGroupShowcase,
	ToggleShowcase,
	TooltipShowcase,
	TypographyShowcase,
} from './components'

/* ---- APP ---- */
export function App() {
	return (
		<Container maxWidth="2xl" className="py-10">
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
				<KbdShowcase />

				{/* Content */}
				<CardsShowcase />
				<AlertsShowcase />
				<AccordionShowcase />
				<CollapsibleShowcase />
				<ItemShowcase />
				<MessageShowcase />
				<BubbleShowcase />
				<MarkerShowcase />
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
				<CodeBlockShowcase />

				{/* Form Controls */}
				<FormControlsShowcase />
				<NativeSelectShowcase />
				<SelectShowcase />
				<ToggleShowcase />
				<ToggleGroupShowcase />
				<SliderShowcase />
				<CalendarShowcase />
				<DropzoneShowcase />

				{/* AI Elements */}
				<AIElementsShowcase />

				{/* Utilities */}
				<ScrollAreaShowcase />
				<ResizableShowcase />
				<DirectionShowcase />
				<AspectRatioShowcase />
				<EmptyShowcase />
				<SkeletonShowcase />
				<SeparatorShowcase />
				<DividerShowcase />
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
	)
}
