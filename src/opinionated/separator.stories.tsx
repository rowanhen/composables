import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery } from '../_storybook/gallery'
import { Separator } from '../_internal/separator'
import { HStack, VStack } from '../_internal/stack'
import { Typography } from '../_internal/typography'

const meta = {
	title: 'Utilities/Separator',
	component: Separator,
	parameters: {
		docs: {
			description: { component: 'Horizontal and vertical section dividers.' },
		},
	},
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
	render: () => (
		<Gallery>
			<VStack gap={4}>
				<Typography variant="body-100">Horizontal separator</Typography>
				<Separator />
				<HStack gap={4} align="center" className="h-8">
					<Typography variant="body-100">Left</Typography>
					<Separator orientation="vertical" />
					<Typography variant="body-100">Middle</Typography>
					<Separator orientation="vertical" />
					<Typography variant="body-100">Right</Typography>
				</HStack>
			</VStack>
		</Gallery>
	),
}
