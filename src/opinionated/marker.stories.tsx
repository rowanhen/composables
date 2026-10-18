import { CheckCircleIcon, ClockIcon, InfoIcon } from 'lucide-react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery, Group } from '../_storybook/gallery'
import { Marker, MarkerContent, MarkerIcon } from './marker'
import { VStack } from '../_internal/stack'

const meta = {
	title: 'Content/Marker',
	component: Marker,
	parameters: {
		docs: {
			description: {
				component: 'Small semantic indicators for timeline, list, and status layouts.',
			},
		},
	},
} satisfies Meta<typeof Marker>

export default meta
type Story = StoryObj<typeof meta>

export const Variants: Story = {
	render: () => (
		<Gallery>
			<Group label="Variants">
				<VStack gap={3}>
					<Marker>
						<MarkerIcon>
							<InfoIcon />
						</MarkerIcon>
						<MarkerContent>Draft saved locally</MarkerContent>
					</Marker>
					<Marker variant="separator">
						<MarkerIcon>
							<ClockIcon />
						</MarkerIcon>
						<MarkerContent>Today</MarkerContent>
					</Marker>
					<Marker variant="border">
						<MarkerIcon>
							<CheckCircleIcon />
						</MarkerIcon>
						<MarkerContent>Ready to publish</MarkerContent>
					</Marker>
				</VStack>
			</Group>
		</Gallery>
	),
}

export const More: Story = {
	render: () => (
		<Gallery>
			<VStack gap={4} className="max-w-xl"></VStack>
		</Gallery>
	),
}
