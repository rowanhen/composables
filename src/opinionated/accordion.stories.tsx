import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery } from '../_storybook/gallery'
import { Accordion } from './accordion'

const meta = {
	title: 'Components/Accordion',
	component: Accordion,
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
	name: 'Accordion',
	render: () => (
		<Gallery>
			<Accordion
				className="max-w-md"
				items={[
					{
						value: 'shipping',
						trigger: 'How long does shipping take?',
						content: 'Orders typically arrive within five business days.',
						defaultOpen: true,
					},
					{
						value: 'return',
						trigger: 'Can I return my order?',
						content: 'You can return unused items within 30 days.',
					},
				]}
			/>
		</Gallery>
	),
}
