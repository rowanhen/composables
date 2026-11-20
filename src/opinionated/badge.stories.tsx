import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery } from '../_storybook/gallery'
import { Badge } from './badge'

const meta = { title: 'Components/Badge', component: Badge } satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Variants: Story = {
	name: 'Badge',
	render: () => (
		<Gallery>
			<div className="flex flex-wrap items-center gap-2">
				<Badge>New</Badge>
				<Badge variant="secondary">Archived</Badge>
				<Badge variant="outline">Draft</Badge>
				<Badge variant="success">Active</Badge>
				<Badge variant="destructive">Failed</Badge>
			</div>
		</Gallery>
	),
}
