import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery, Group } from '../_storybook/gallery'
import { Badge } from '../_internal/badge'
import { HStack, VStack } from '../_internal/stack'

const meta = {
	title: 'Actions/Badge',
	component: Badge,
	args: { children: 'Badge' },
	parameters: {
		docs: {
			description: { component: 'Compact labels for status, metadata, and emphasis.' },
		},
	},
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Variants: Story = {
	render: () => (
		<Gallery>
			<Group label="Variants">
				<HStack gap={3} wrap align="center">
					<Badge variant="default">Default</Badge>
					<Badge variant="secondary">Secondary</Badge>
					<Badge variant="outline">Outline</Badge>
					<Badge variant="destructive">Destructive</Badge>
					<Badge variant="ghost">Ghost</Badge>
					<Badge variant="success">Success</Badge>
					<Badge variant="warning">Warning</Badge>
					<Badge variant="info">Info</Badge>
					<Badge variant="brand">Brand</Badge>
					<Badge variant="brand-2">Brand 2</Badge>
					<Badge variant="brand-3">Brand 3</Badge>
					<Badge variant="brand-4">Brand 4</Badge>
					<Badge variant="brand-5">Brand 5</Badge>
					<Badge variant="emphasis">Emphasis</Badge>
					<Badge variant="link">Link</Badge>
				</HStack>
			</Group>
		</Gallery>
	),
}

export const StatusUsage: Story = {
	name: 'Status usage',
	render: () => (
		<Gallery>
			<Group label="Status usage">
				<HStack gap={3} wrap align="center">
					<Badge variant="success">Active</Badge>
					<Badge variant="warning">Pending</Badge>
					<Badge variant="destructive">Failed</Badge>
					<Badge variant="info">In Review</Badge>
					<Badge variant="outline">Draft</Badge>
					<Badge variant="secondary">Archived</Badge>
				</HStack>
			</Group>
		</Gallery>
	),
}

export const More: Story = {
	render: () => (
		<Gallery>
			<VStack gap={4}></VStack>
		</Gallery>
	),
}
