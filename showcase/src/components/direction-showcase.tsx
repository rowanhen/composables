import { DirectionProvider } from '@/components/ui-opinionated/direction'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui-opinionated/toggle-group'
import { VStack } from '@/components/_internal/stack'
import { ShowcaseGroup, ShowcaseSection } from './showcase-section'

export function DirectionShowcase() {
	return (
		<ShowcaseSection
			title="Direction Provider"
			description="Reading direction context for Base UI."
		>
			<VStack gap={4}>
				<ShowcaseGroup label="RTL context">
					<DirectionProvider direction="rtl">
						<div className="max-w-md rounded-lg border border-stroke bg-surface-brand px-4 py-3 text-right text-xs/relaxed text-brand">
							<p className="mb-3">واجهة عربية تجريبية</p>
							<ToggleGroup defaultValue="one" variant="outline" spacing="sm">
								<ToggleGroupItem value="one">واحد</ToggleGroupItem>
								<ToggleGroupItem value="two">اثنان</ToggleGroupItem>
								<ToggleGroupItem value="three">ثلاثة</ToggleGroupItem>
							</ToggleGroup>
						</div>
					</DirectionProvider>
				</ShowcaseGroup>
			</VStack>
		</ShowcaseSection>
	)
}
