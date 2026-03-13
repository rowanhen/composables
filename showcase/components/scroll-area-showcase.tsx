import { ScrollArea, ScrollBar } from '../../src/components/ui/scroll-area'
import { Separator } from '../../src/components/ui/separator'
import { HStack, VStack } from '../../src/components/ui/stack'
import { Typography } from '../../src/components/ui/typography'
import { ShowcaseSection } from './showcase-section'

export function ScrollAreaShowcase() {
  return (
    <ShowcaseSection
      title="Scroll Area"
      description="Custom scrollbar container with vertical and horizontal support."
    >
      <HStack gap={6} wrap>
        <VStack gap={2}>
          <Typography variant="heading-200">Vertical</Typography>
          <ScrollArea className="h-48 w-64 rounded-md border border-border">
            <div className="p-4">
              {Array.from({ length: 20 }, (_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static demo list
                <div key={i}>
                  <Typography variant="body-100" className="py-1">
                    Item {i + 1}
                  </Typography>
                  {i < 19 && <Separator />}
                </div>
              ))}
            </div>
          </ScrollArea>
        </VStack>
        <VStack gap={2}>
          <Typography variant="heading-200">Horizontal</Typography>
          <ScrollArea className="w-64 rounded-md border border-border">
            <div className="flex gap-4 p-4">
              {Array.from({ length: 10 }, (_, i) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: static demo list
                  key={i}
                  className="flex h-20 w-32 shrink-0 items-center justify-center rounded-md bg-muted"
                >
                  <Typography variant="body-100">Card {i + 1}</Typography>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </VStack>
      </HStack>
    </ShowcaseSection>
  )
}
