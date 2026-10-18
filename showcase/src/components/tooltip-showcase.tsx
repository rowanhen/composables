// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.
import { MailIcon } from 'lucide-react'
import { Button } from '@/components/_internal/button'
import { HStack } from '@/components/_internal/stack'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/_internal/tooltip'
import { Typography } from '@/components/_internal/typography'
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
				<Tooltip>
					<TooltipTrigger render={<Button variant="outline" />}>Inverse</TooltipTrigger>
					<TooltipContent variant="inverse">Inverse tooltip</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger render={<Button variant="outline" />}>Brand</TooltipTrigger>
					<TooltipContent variant="brand">Brand tooltip</TooltipContent>
				</Tooltip>
				<Typography variant="body-100">
					Inline{' '}
					<Tooltip>
						<TooltipTrigger variant="underline">underlined term</TooltipTrigger>
						<TooltipContent>Explains the term</TooltipContent>
					</Tooltip>{' '}
					with a tooltip.
				</Typography>
			</HStack>
		</ShowcaseSection>
	)
}
