import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery } from '../_storybook/gallery'
import { HStack, VStack } from '../_internal/stack'
import { Toggle } from '../_internal/toggle'

const meta = {
	title: 'Forms/Toggle',
	component: Toggle,
	parameters: {
		docs: {
			description: { component: 'Pressed-state buttons and binary controls.' },
		},
	},
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
	render: () => (
		<Gallery>
			<VStack gap={4}>
				<HStack gap={2}>
					<Toggle aria-label="Bold">
						<BoldIcon />
					</Toggle>
					<Toggle aria-label="Italic">
						<ItalicIcon />
					</Toggle>
					<Toggle aria-label="Underline">
						<UnderlineIcon />
					</Toggle>
				</HStack>
				<HStack gap={2}>
					<Toggle variant="outline" aria-label="Bold">
						<BoldIcon />
					</Toggle>
					<Toggle variant="outline" aria-label="Italic">
						<ItalicIcon />
					</Toggle>
					<Toggle variant="outline" aria-label="Underline">
						<UnderlineIcon />
					</Toggle>
				</HStack>
			</VStack>
		</Gallery>
	),
}
