import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery, Group, Placeholder } from '../_storybook/gallery'
import { ScrollArea, ScrollBar } from '../_internal/scroll-area'
import { Separator } from '../_internal/separator'
import { HStack } from '../_internal/stack'
import { Typography } from '../_internal/typography'

const meta = {
	title: 'Utilities/Scroll area',
	component: ScrollArea,
	parameters: {
		docs: {
			description: { component: 'Styled overflow regions and scroll affordances.' },
		},
	},
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

export const Vertical: Story = {
	render: () => (
		<Gallery>
			<Group label="Vertical">
				<ScrollArea className="h-48 w-64 rounded-md border border-stroke">
					<div className="p-4">
						{Array.from({ length: 20 }, (_, i) => (
							<div key={i}>
								<Typography variant="body-100" className="py-1">
									Item {i + 1}
								</Typography>
								{i < 19 && <Separator />}
							</div>
						))}
					</div>
				</ScrollArea>
			</Group>
		</Gallery>
	),
}

export const Horizontal: Story = {
	render: () => (
		<Gallery>
			<Group label="Horizontal">
				<ScrollArea className="w-64 rounded-md border border-stroke">
					<div className="flex gap-4 p-4">
						{Array.from({ length: 10 }, (_, i) => (
							<Placeholder key={i} className="h-20 w-32 shrink-0 rounded-md">
								<Typography variant="body-100">Card {i + 1}</Typography>
							</Placeholder>
						))}
					</div>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
			</Group>
		</Gallery>
	),
}

export const More: Story = {
	render: () => (
		<Gallery>
			<HStack gap={6} wrap></HStack>
		</Gallery>
	),
}
