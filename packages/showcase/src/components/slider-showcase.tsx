import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { VStack } from '@/components/ui/stack'
import { ShowcaseSection } from './showcase-section'

export function SliderShowcase() {
  return (
    <ShowcaseSection title="Slider" description="Range slider for numeric input.">
      <VStack gap={6} className="max-w-md">
        <VStack gap={2}>
          <Label>Single value</Label>
          <Slider defaultValue={[50]} />
        </VStack>
        <VStack gap={2}>
          <Label>Range</Label>
          <Slider defaultValue={[25, 75]} />
        </VStack>
      </VStack>
    </ShowcaseSection>
  )
}
