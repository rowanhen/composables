// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.
import { Container } from '@/components/_internal/container'
import { VStack } from '@/components/_internal/stack'
import { Typography } from '@/components/_internal/typography'
import { ShowcaseSection } from './showcase-section'

export function ContainerShowcase() {
	return (
		<ShowcaseSection
			title="Container"
			description="Responsive max-width container with auto inline padding per breakpoint."
		>
			<VStack gap={4}>
				{(['sm', 'md', 'lg', 'xl', '2xl', 'full'] as const).map((mw) => (
					<Container
						key={mw}
						maxWidth={mw}
						className="bg-[var(--bg-surface-emphasis)] rounded-lg py-3 text-center"
					>
						<Typography variant="body-100" className="text-[var(--text-emphasis)]">
							maxWidth="{mw}"
						</Typography>
					</Container>
				))}
			</VStack>
		</ShowcaseSection>
	)
}
