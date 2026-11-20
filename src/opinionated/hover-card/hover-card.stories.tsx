import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery } from '../../_storybook/gallery'
import { HoverCard } from './hover-card'

const meta = {
	title: 'Components/Hover Card',
	component: HoverCard,
} satisfies Meta<typeof HoverCard>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
	name: 'Hover Card',
	args: {
		trigger: <a href="#profile">Alex Rivera</a>,
		children: (
			<div id="profile">
				<p className="font-medium">Alex Rivera</p>
				<p className="text-sm text-content-muted">Design systems engineer</p>
			</div>
		),
	},
	render: (args) => (
		<Gallery>
			<HoverCard {...args} />
		</Gallery>
	),
}
