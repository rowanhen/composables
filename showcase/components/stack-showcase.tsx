import { Badge } from '../../src/components/ui/badge'
import { Button } from '../../src/components/ui/button'
import { Grid, GridItem } from '../../src/components/ui/grid'
import { HStack, VStack } from '../../src/components/ui/stack'
import { Typography } from '../../src/components/ui/typography'
import { DemoBox, ShowcaseSection } from './showcase-section'

export function StackShowcase() {
  return (
    <ShowcaseSection
      title="Stack & HStack"
      description="Flex-based layout primitives for vertical and horizontal spacing."
    >
      <Grid columns={12} gap={6}>
        <GridItem colSpan={6}>
          <VStack gap={3}>
            <Typography variant="heading-200">VStack (vertical)</Typography>
            <VStack gap={3} className="rounded-lg border border-border p-4">
              <DemoBox>Item 1</DemoBox>
              <DemoBox>Item 2</DemoBox>
              <DemoBox>Item 3</DemoBox>
            </VStack>
          </VStack>
        </GridItem>
        <GridItem colSpan={6}>
          <VStack gap={3}>
            <Typography variant="heading-200">HStack (horizontal)</Typography>
            <HStack gap={3} className="rounded-lg border border-border p-4">
              <DemoBox className="flex-1">1</DemoBox>
              <DemoBox className="flex-1">2</DemoBox>
              <DemoBox className="flex-1">3</DemoBox>
            </HStack>
          </VStack>
        </GridItem>
        <GridItem colSpan={6}>
          <VStack gap={3}>
            <Typography variant="heading-200">justify="between"</Typography>
            <HStack
              justify="between"
              align="center"
              className="rounded-lg border border-border p-4"
            >
              <Typography variant="body-100">Left</Typography>
              <Button>Action</Button>
            </HStack>
          </VStack>
        </GridItem>
        <GridItem colSpan={6}>
          <VStack gap={3}>
            <Typography variant="heading-200">Wrapping tags</Typography>
            <HStack gap={2} wrap className="rounded-lg border border-border p-4">
              {Array.from({ length: 8 }, (_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static demo list
                <Badge key={i} variant="outline">
                  Tag {i + 1}
                </Badge>
              ))}
            </HStack>
          </VStack>
        </GridItem>
      </Grid>
    </ShowcaseSection>
  )
}
