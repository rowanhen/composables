import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react'
import { HStack, VStack } from '@/components/_internal/stack'
import { Toggle } from '@/components/_internal/toggle'
import { ShowcaseSection } from './showcase-section'

export function ToggleShowcase() {
  return (
    <ShowcaseSection title="Toggle" description="A two-state button that can be on or off.">
      <VStack gap={4}>
        <HStack gap={2}>
          <Toggle aria-label="Bold">
            <BoldIcon />
          </Toggle>
          <Toggle aria-label="Italic">
            <ItalicIcon />
          </Toggle>
          <Toggle aria-label="Underline">
            <UnderlineIcon />
          </Toggle>
        </HStack>
        <HStack gap={2}>
          <Toggle variant="outline" aria-label="Bold">
            <BoldIcon />
          </Toggle>
          <Toggle variant="outline" aria-label="Italic">
            <ItalicIcon />
          </Toggle>
          <Toggle variant="outline" aria-label="Underline">
            <UnderlineIcon />
          </Toggle>
        </HStack>
      </VStack>
    </ShowcaseSection>
  )
}
