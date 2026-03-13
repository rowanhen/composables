import { Container } from '../../src/components/ui/container'
import { VStack } from '../../src/components/ui/stack'
import { Typography } from '../../src/components/ui/typography'
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
