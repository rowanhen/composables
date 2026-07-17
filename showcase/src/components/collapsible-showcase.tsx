// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.
import { ChevronDownIcon } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/_internal/button'
import { Card } from '@/components/_internal/card'
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
			<Card className="max-w-md p-4">
				<Collapsible open={open} onOpenChange={setOpen}>
					<HStack justify="between" align="center">
						<Typography variant="body-200">3 items</Typography>
						<CollapsibleTrigger render={<Button variant="outline" size="sm" />}>
							<ChevronDownIcon className="size-3" />
						</CollapsibleTrigger>
					</HStack>
					<Card size="sm" className="mt-2 rounded-md px-3 py-2">
						<Typography variant="body-100">Always visible</Typography>
					</Card>
					<CollapsibleContent>
						<VStack gap={2} className="mt-2">
							<Card size="sm" className="rounded-md px-3 py-2">
								<Typography variant="body-100">Hidden item 1</Typography>
							</Card>
							<Card size="sm" className="rounded-md px-3 py-2">
								<Typography variant="body-100">Hidden item 2</Typography>
							</Card>
						</VStack>
					</CollapsibleContent>
				</Collapsible>
			</Card>
		</ShowcaseSection>
	)
}
