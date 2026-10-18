import React from 'react'
import { ChevronDownIcon } from 'lucide-react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery } from '../_storybook/gallery'
import { Button } from '../_internal/button'
import { Card } from '../_internal/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../_internal/collapsible'
import { HStack, VStack } from '../_internal/stack'
import { Typography } from '../_internal/typography'

const meta = {
	title: 'Content/Collapsible',
	component: Collapsible,
	parameters: {
		docs: {
			description: { component: 'Single-section disclosure behavior.' },
		},
	},
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

function CollapsibleDemo() {
	const [open, setOpen] = React.useState(false)

	return (
		<Gallery title="Collapsible" description="Toggle visibility of a content section.">
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
		</Gallery>
	)
}

export const Overview: Story = {
	render: () => <CollapsibleDemo />,
}
