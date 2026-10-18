import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery, Group } from '../_storybook/gallery'
import { HStack } from '../_internal/stack'
import { Spinner } from './spinner'

const meta = {
	title: 'Utilities/Spinner',
	component: Spinner,
	parameters: {
		docs: {
			description: { component: 'Indeterminate loading indicators.' },
		},
	},
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
	render: () => (
		<Gallery>
			<Group label="Default">
				<Spinner />
			</Group>
			<Group label="Brand">
				<HStack gap={4} align="center">
					<Spinner variant="dots" />
					<Spinner variant="dots" className="h-8" />
					<Spinner variant="dots" className="text-foreground h-8" />
				</HStack>
			</Group>
		</Gallery>
	),
}
