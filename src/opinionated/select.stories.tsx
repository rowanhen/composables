import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery } from '../_storybook/gallery'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../_internal/select'
import { HStack } from '../_internal/stack'

const meta = {
	title: 'Forms/Select',
	parameters: {
		docs: {
			description: { component: 'Composed select menus and option lists.' },
		},
	},
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
	render: () => (
		<Gallery>
			<HStack gap={4} wrap>
				<Select defaultValue="apple">
					<SelectTrigger>
						<SelectValue placeholder="Pick a fruit" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="apple">Apple</SelectItem>
						<SelectItem value="banana">Banana</SelectItem>
						<SelectItem value="cherry">Cherry</SelectItem>
						<SelectItem value="grape">Grape</SelectItem>
					</SelectContent>
				</Select>
				<Select defaultValue="sm">
					<SelectTrigger size="sm">
						<SelectValue placeholder="Size" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="sm">Small</SelectItem>
						<SelectItem value="md">Medium</SelectItem>
						<SelectItem value="lg">Large</SelectItem>
					</SelectContent>
				</Select>
			</HStack>
		</Gallery>
	),
}
