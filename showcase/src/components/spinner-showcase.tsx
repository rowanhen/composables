// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.
import { Spinner } from '@/components/_internal/spinner'
import { HStack } from '@/components/_internal/stack'
import { ShowcaseGroup, ShowcaseSection } from './showcase-section'

export function SpinnerShowcase() {
	return (
		<ShowcaseSection title="Spinner" description="Loading indicator.">
			<ShowcaseGroup label="Variants">
				<HStack gap={6} align="center">
					<Spinner />
					<Spinner variant="dots" />
					<Spinner variant="dots" className="h-8" />
				</HStack>
			</ShowcaseGroup>
		</ShowcaseSection>
	)
}
