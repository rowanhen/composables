import { Card } from '@/components/ui-opinionated/card'
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
						<Card className="max-w-md bg-surface-brand py-3 text-right text-brand">
							<p className="mb-3">واجهة عربية تجريبية</p>
							<ToggleGroup defaultValue="one" variant="outline" spacing="sm">
								<ToggleGroupItem value="one">واحد</ToggleGroupItem>
								<ToggleGroupItem value="two">اثنان</ToggleGroupItem>
								<ToggleGroupItem value="three">ثلاثة</ToggleGroupItem>
							</ToggleGroup>
						</Card>
					</DirectionProvider>
				</ShowcaseGroup>
			</VStack>
		</ShowcaseSection>
	)
}
