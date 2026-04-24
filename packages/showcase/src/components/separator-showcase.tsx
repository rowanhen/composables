// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.
import { Separator } from '@/components/_internal/separator'
import { HStack, VStack } from '@/components/_internal/stack'
import { Typography } from '@/components/_internal/typography'
import { ShowcaseSection } from './showcase-section'

export function SeparatorShowcase() {
	return (
		<ShowcaseSection title="Separator" description="Visual divider between content sections.">
			<VStack gap={4}>
				<Typography variant="body-100">Horizontal separator</Typography>
				<Separator />
				<HStack gap={4} align="center" className="h-8">
					<Typography variant="body-100">Left</Typography>
					<Separator orientation="vertical" />
					<Typography variant="body-100">Middle</Typography>
					<Separator orientation="vertical" />
					<Typography variant="body-100">Right</Typography>
				</HStack>
			</VStack>
		</ShowcaseSection>
	)
}
