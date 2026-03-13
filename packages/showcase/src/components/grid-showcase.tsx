import { Grid, GridItem } from '@/components/ui/grid'
import { VStack } from '@/components/ui/stack'
import { Typography } from '@/components/ui/typography'
import { DemoBox, ShowcaseSection } from './showcase-section'

export function GridShowcase() {
  return (
    <ShowcaseSection title="Grid System" description="12-column grid with semantic gutter tokens.">
      <VStack gap={8}>
        <VStack gap={2}>
          <Typography variant="heading-200">Equal columns (span 4 each)</Typography>
          <Grid columns={12} gap={4}>
            <GridItem colSpan={4}>
              <DemoBox>4</DemoBox>
            </GridItem>
            <GridItem colSpan={4}>
              <DemoBox>4</DemoBox>
            </GridItem>
            <GridItem colSpan={4}>
              <DemoBox>4</DemoBox>
            </GridItem>
          </Grid>
        </VStack>
        <VStack gap={2}>
          <Typography variant="heading-200">Sidebar + Content (3 / 9)</Typography>
          <Grid columns={12} gap={6}>
            <GridItem colSpan={3}>
              <DemoBox className="min-h-[100px]">3</DemoBox>
            </GridItem>
            <GridItem colSpan={9}>
              <DemoBox className="min-h-[100px]">9</DemoBox>
            </GridItem>
          </Grid>
        </VStack>
        <VStack gap={2}>
          <Typography variant="heading-200">Mixed spans</Typography>
          <Grid columns={12} gap={4}>
            <GridItem colSpan={12}>
              <DemoBox>12</DemoBox>
            </GridItem>
            <GridItem colSpan={6}>
              <DemoBox>6</DemoBox>
            </GridItem>
            <GridItem colSpan={6}>
              <DemoBox>6</DemoBox>
            </GridItem>
            <GridItem colSpan={4}>
              <DemoBox>4</DemoBox>
            </GridItem>
            <GridItem colSpan={4}>
              <DemoBox>4</DemoBox>
            </GridItem>
            <GridItem colSpan={4}>
              <DemoBox>4</DemoBox>
            </GridItem>
            <GridItem colSpan={3}>
              <DemoBox>3</DemoBox>
            </GridItem>
            <GridItem colSpan={3}>
              <DemoBox>3</DemoBox>
            </GridItem>
            <GridItem colSpan={3}>
              <DemoBox>3</DemoBox>
            </GridItem>
            <GridItem colSpan={3}>
              <DemoBox>3</DemoBox>
            </GridItem>
          </Grid>
        </VStack>
        <VStack gap={2}>
          <Typography variant="heading-200">Column offset (colStart)</Typography>
          <Grid columns={12} gap={4}>
            <GridItem colSpan={4} colStart={1}>
              <DemoBox>start 1</DemoBox>
            </GridItem>
            <GridItem colSpan={4} colStart={5}>
              <DemoBox>start 5</DemoBox>
            </GridItem>
            <GridItem colSpan={6} colStart={4}>
              <DemoBox>start 4, span 6</DemoBox>
            </GridItem>
          </Grid>
        </VStack>
      </VStack>
    </ShowcaseSection>
  )
}
