import { Separator } from '../../src/components/ui/separator'
import { HStack, VStack } from '../../src/components/ui/stack'
import { Typography } from '../../src/components/ui/typography'
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
