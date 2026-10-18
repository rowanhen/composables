import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery } from '../_storybook/gallery'
import { Label } from '../_internal/label'
import { Slider } from '../_internal/slider'
import { VStack } from '../_internal/stack'

const meta = {
	title: 'Forms/Slider',
	component: Slider,
	parameters: {
		docs: {
			description: { component: 'Range controls and value selection.' },
		},
	},
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
	render: () => (
		<Gallery>
			<VStack gap={6} className="max-w-md">
				<VStack gap={2}>
					<Label>Single value</Label>
					<Slider defaultValue={[50]} />
				</VStack>
				<VStack gap={2}>
					<Label>Range</Label>
					<Slider defaultValue={[25, 75]} />
				</VStack>
			</VStack>
		</Gallery>
	),
}
