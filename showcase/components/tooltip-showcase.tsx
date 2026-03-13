import { MailIcon } from 'lucide-react'
import { Button } from '../../src/components/ui/button'
import { HStack } from '../../src/components/ui/stack'
import { Tooltip, TooltipContent, TooltipTrigger } from '../../src/components/ui/tooltip'
import { Typography } from '../../src/components/ui/typography'
import { ShowcaseSection } from './showcase-section'

export function TooltipShowcase() {
  return (
    <ShowcaseSection title="Tooltip" description="Informational popup on hover.">
      <HStack gap={4}>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>Hover me</TooltipTrigger>
          <TooltipContent>
            <Typography variant="body-100">This is a tooltip</Typography>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" size="sm" />}>
            <MailIcon className="size-3" />
          </TooltipTrigger>
          <TooltipContent side="bottom">Send email</TooltipContent>
        </Tooltip>
      </HStack>
    </ShowcaseSection>
  )
}
