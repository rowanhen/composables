import { Button } from '../../src/components/ui/button'
import { Grid } from '../../src/components/ui/grid'
import { Input } from '../../src/components/ui/input'
import { Label } from '../../src/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '../../src/components/ui/popover'
import { VStack } from '../../src/components/ui/stack'
import { ShowcaseSection } from './showcase-section'

export function PopoverShowcase() {
  return (
    <ShowcaseSection title="Popover" description="Floating content anchored to a trigger.">
      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}>Open Popover</PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Dimensions</PopoverTitle>
            <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
          </PopoverHeader>
          <Grid columns={2} gap={3}>
            <VStack gap={1}>
              <Label>Width</Label>
              <Input defaultValue="100%" />
            </VStack>
            <VStack gap={1}>
              <Label>Height</Label>
              <Input defaultValue="auto" />
            </VStack>
          </Grid>
        </PopoverContent>
      </Popover>
    </ShowcaseSection>
  )
}
