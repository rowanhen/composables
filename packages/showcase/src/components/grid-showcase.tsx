import { Grid, GridItem } from '@/components/_internal/grid'
import { VStack } from '@/components/_internal/stack'
import { DemoBox, ShowcaseGroup, ShowcaseSection } from './showcase-section'

export function GridShowcase() {
  return (
    <ShowcaseSection title="Grid System" description="12-column grid with semantic gutter tokens.">
      <VStack gap={8}>
        <ShowcaseGroup label="Equal columns (span 4 each)">
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
        </ShowcaseGroup>
        <ShowcaseGroup label="Sidebar + Content (3 / 9)">
          <Grid columns={12} gap={6}>
            <GridItem colSpan={3}>
              <DemoBox className="min-h-[100px]">3</DemoBox>
            </GridItem>
            <GridItem colSpan={9}>
              <DemoBox className="min-h-[100px]">9</DemoBox>
            </GridItem>
          </Grid>
        </ShowcaseGroup>
        <ShowcaseGroup label="Mixed spans">
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
        </ShowcaseGroup>
        <ShowcaseGroup label="Column offset (colStart)">
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
        </ShowcaseGroup>
      </VStack>
    </ShowcaseSection>
  )
}
