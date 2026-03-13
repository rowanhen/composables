import { ChevronDownIcon } from 'lucide-react'
import React from 'react'
import { Button } from '../../src/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../src/components/ui/collapsible'
import { HStack, VStack } from '../../src/components/ui/stack'
import { Typography } from '../../src/components/ui/typography'
import { ShowcaseSection } from './showcase-section'

export function CollapsibleShowcase() {
  const [open, setOpen] = React.useState(false)

  return (
    <ShowcaseSection title="Collapsible" description="Toggle visibility of a content section.">
      <div className="rounded-lg border border-border p-4 max-w-md">
        <Collapsible open={open} onOpenChange={setOpen}>
          <HStack justify="between" align="center">
            <Typography variant="body-200">3 items</Typography>
            <CollapsibleTrigger render={<Button variant="outline" size="sm" />}>
              <ChevronDownIcon className="size-3" />
            </CollapsibleTrigger>
          </HStack>
          <div className="mt-2 rounded-md border border-border px-3 py-2">
            <Typography variant="body-100">Always visible</Typography>
          </div>
          <CollapsibleContent>
            <VStack gap={2} className="mt-2">
              <div className="rounded-md border border-border px-3 py-2">
                <Typography variant="body-100">Hidden item 1</Typography>
              </div>
              <div className="rounded-md border border-border px-3 py-2">
                <Typography variant="body-100">Hidden item 2</Typography>
              </div>
            </VStack>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </ShowcaseSection>
  )
}
