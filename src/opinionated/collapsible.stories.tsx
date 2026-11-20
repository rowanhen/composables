import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery } from '../_storybook/gallery'
import { Collapsible } from './collapsible'

const meta = {
	title: 'Components/Collapsible',
	component: Collapsible,
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
	name: 'Collapsible',
	render: () => (
		<Gallery>
			<Collapsible className="max-w-md" trigger="Delivery details">
				<p className="px-2.5 py-2 text-sm">Your order usually arrives in five business days.</p>
			</Collapsible>
		</Gallery>
	),
}
