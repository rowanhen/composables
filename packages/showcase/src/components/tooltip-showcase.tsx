import { MailIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HStack } from '@/components/ui/stack'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Typography } from '@/components/ui/typography'
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
