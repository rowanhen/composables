// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.
import { ChevronDownIcon } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/_internal/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/_internal/collapsible'
import { HStack, VStack } from '@/components/_internal/stack'
import { Typography } from '@/components/_internal/typography'
import { ShowcaseSection } from './showcase-section'

export function CollapsibleShowcase() {
  const [open, setOpen] = React.useState(false)

  return (
    <ShowcaseSection title="Collapsible" description="Toggle visibility of a content section.">
      <div className="rounded-lg border border-stroke p-4 max-w-md">
        <Collapsible open={open} onOpenChange={setOpen}>
          <HStack justify="between" align="center">
            <Typography variant="body-200">3 items</Typography>
            <CollapsibleTrigger render={<Button variant="outline" size="sm" />}>
              <ChevronDownIcon className="size-3" />
            </CollapsibleTrigger>
          </HStack>
          <div className="mt-2 rounded-md border border-stroke px-3 py-2">
            <Typography variant="body-100">Always visible</Typography>
          </div>
          <CollapsibleContent>
            <VStack gap={2} className="mt-2">
              <div className="rounded-md border border-stroke px-3 py-2">
                <Typography variant="body-100">Hidden item 1</Typography>
              </div>
              <div className="rounded-md border border-stroke px-3 py-2">
                <Typography variant="body-100">Hidden item 2</Typography>
              </div>
            </VStack>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </ShowcaseSection>
  )
}
