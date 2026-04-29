// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.
import { ScrollArea, ScrollBar } from '@/components/_internal/scroll-area'
import { Separator } from '@/components/_internal/separator'
import { HStack } from '@/components/_internal/stack'
import { Typography } from '@/components/_internal/typography'
import { ShowcaseGroup, ShowcaseSection } from './showcase-section'

export function ScrollAreaShowcase() {
	return (
		<ShowcaseSection
			title="Scroll Area"
			description="Custom scrollbar container with vertical and horizontal support."
		>
			<HStack gap={6} wrap>
				<ShowcaseGroup label="Vertical">
					<ScrollArea className="h-48 w-64 rounded-md border border-stroke">
						<div className="p-4">
							{Array.from({ length: 20 }, (_, i) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: static demo list
								<div key={i}>
									<Typography variant="body-100" className="py-1">
										Item {i + 1}
									</Typography>
									{i < 19 && <Separator />}
								</div>
							))}
						</div>
					</ScrollArea>
				</ShowcaseGroup>
				<ShowcaseGroup label="Horizontal">
					<ScrollArea className="w-64 rounded-md border border-stroke">
						<div className="flex gap-4 p-4">
							{Array.from({ length: 10 }, (_, i) => (
								<div
									// biome-ignore lint/suspicious/noArrayIndexKey: static demo list
									key={i}
									className="flex h-20 w-32 shrink-0 items-center justify-center rounded-md bg-muted"
								>
									<Typography variant="body-100">Card {i + 1}</Typography>
								</div>
							))}
						</div>
						<ScrollBar orientation="horizontal" />
					</ScrollArea>
				</ShowcaseGroup>
			</HStack>
		</ShowcaseSection>
	)
}
