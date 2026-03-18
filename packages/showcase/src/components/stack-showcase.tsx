// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.
import { Badge } from '@/components/_internal/badge'
import { Button } from '@/components/_internal/button'
import { Grid, GridItem } from '@/components/_internal/grid'
import { HStack, VStack } from '@/components/_internal/stack'
import { Typography } from '@/components/_internal/typography'
import { DemoBox, ShowcaseGroup, ShowcaseSection } from './showcase-section'

export function StackShowcase() {
  return (
    <ShowcaseSection
      title="Stack & HStack"
      description="Flex-based layout primitives for vertical and horizontal spacing."
    >
      <Grid columns={12} gap={6}>
        <GridItem colSpan={6}>
          <ShowcaseGroup label="VStack (vertical)">
            <VStack gap={3} className="rounded-lg border border-border p-4">
              <DemoBox>Item 1</DemoBox>
              <DemoBox>Item 2</DemoBox>
              <DemoBox>Item 3</DemoBox>
            </VStack>
          </ShowcaseGroup>
        </GridItem>
        <GridItem colSpan={6}>
          <ShowcaseGroup label="HStack (horizontal)">
            <HStack gap={3} className="rounded-lg border border-border p-4">
              <DemoBox className="flex-1">1</DemoBox>
              <DemoBox className="flex-1">2</DemoBox>
              <DemoBox className="flex-1">3</DemoBox>
            </HStack>
          </ShowcaseGroup>
        </GridItem>
        <GridItem colSpan={6}>
          <ShowcaseGroup label='justify="between"'>
            <HStack
              justify="between"
              align="center"
              className="rounded-lg border border-border p-4"
            >
              <Typography variant="body-100">Left</Typography>
              <Button>Action</Button>
            </HStack>
          </ShowcaseGroup>
        </GridItem>
        <GridItem colSpan={6}>
          <ShowcaseGroup label="Wrapping tags">
            <HStack gap={2} wrap className="rounded-lg border border-border p-4">
              {Array.from({ length: 8 }, (_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static demo list
                <Badge key={i} variant="outline">
                  Tag {i + 1}
                </Badge>
              ))}
            </HStack>
          </ShowcaseGroup>
        </GridItem>
      </Grid>
    </ShowcaseSection>
  )
}
