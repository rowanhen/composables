import type { Meta, StoryObj } from '@storybook/react-vite'
import { CopyIcon } from 'lucide-react'
import { Gallery } from '../_storybook/gallery'
import { Button } from './button'
import { Tooltip } from './tooltip'

const meta = { title: 'Components/Tooltip', component: Tooltip } satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
	name: 'Tooltip',
	args: {
		content: 'Copies a link everyone can open.',
		children: (
			<Button size="icon" aria-label="Copy link">
				<CopyIcon />
			</Button>
		),
	},
	render: (args) => (
		<Gallery>
			<Tooltip {...args} />
		</Gallery>
	),
}
