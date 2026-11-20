import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery } from '../../_storybook/gallery'
import { Tabs } from './tabs'

const meta = {
	title: 'Components/Tabs',
	component: Tabs,
	args: {
		ariaLabel: 'Reports',
		items: [
			{ value: 'overview', label: 'Overview', content: 'Summary of your workspace.' },
			{ value: 'analytics', label: 'Analytics', content: 'Workspace activity and trends.' },
			{ value: 'exports', label: 'Exports', content: 'Download workspace reports.' },
		],
	},
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
	name: 'Tabs',
	render: (args) => (
		<Gallery>
			<Tabs {...args} />
		</Gallery>
	),
}
