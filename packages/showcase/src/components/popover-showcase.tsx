import { Button } from '@/components/_internal/button'
import { Grid } from '@/components/_internal/grid'
import { Input } from '@/components/_internal/input'
import { Label } from '@/components/_internal/label'
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/_internal/popover'
import { VStack } from '@/components/_internal/stack'
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
