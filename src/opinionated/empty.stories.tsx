import { InboxIcon } from 'lucide-react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery } from '../_storybook/gallery'
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '../_internal/empty'

const meta = {
	title: 'Utilities/Empty',
	parameters: {
		docs: {
			description: { component: 'Empty states for missing content and setup flows.' },
		},
	},
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
	render: () => (
		<Gallery>
			<Empty>
				<EmptyHeader>
					<InboxIcon className="size-10 text-muted-foreground" />
					<EmptyTitle>No results found</EmptyTitle>
					<EmptyDescription>
						Try adjusting your search or filters to find what you're looking for.
					</EmptyDescription>
				</EmptyHeader>
			</Empty>
		</Gallery>
	),
}
