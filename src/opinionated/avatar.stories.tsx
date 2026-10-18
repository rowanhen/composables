import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery, Group } from '../_storybook/gallery'
import { Avatar, AvatarFallback, AvatarImage } from '../_internal/avatar'
import { HStack, VStack } from '../_internal/stack'
import { Typography } from '../_internal/typography'

const meta = {
	title: 'Actions/Avatar',
	component: Avatar,
	parameters: {
		docs: {
			description: { component: 'User and entity identity surfaces.' },
		},
	},
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Sizes: Story = {
	render: () => (
		<Gallery>
			<Group label="Sizes">
				<HStack gap={3} align="center">
					<Avatar size="xs">
						<AvatarImage src="images/avatar-1.svg" alt="User" />
						<AvatarFallback>U</AvatarFallback>
					</Avatar>
					<Avatar size="sm">
						<AvatarImage src="images/avatar-2.svg" alt="User" />
						<AvatarFallback>AB</AvatarFallback>
					</Avatar>
					<Avatar size="md">
						<AvatarImage src="images/avatar-3.svg" alt="User" />
						<AvatarFallback>CD</AvatarFallback>
					</Avatar>
					<Avatar size="lg">
						<AvatarImage src="images/avatar-4.svg" alt="User" />
						<AvatarFallback>EF</AvatarFallback>
					</Avatar>
					<Avatar size="xl">
						<AvatarImage src="images/avatar-5.svg" alt="User" />
						<AvatarFallback>GH</AvatarFallback>
					</Avatar>
				</HStack>
				<Typography variant="caption-100" className="text-muted-foreground">
					xs · sm · md · lg · xl
				</Typography>
			</Group>
		</Gallery>
	),
}

export const Fallbacks: Story = {
	render: () => (
		<Gallery>
			<Group label="Fallbacks">
				<HStack gap={3} align="center">
					<Avatar size="lg">
						<AvatarImage src="/broken-image.jpg" alt="Broken" />
						<AvatarFallback>JD</AvatarFallback>
					</Avatar>
					<Avatar size="lg">
						<AvatarImage src="/broken-image.jpg" alt="Broken" />
						<AvatarFallback>MK</AvatarFallback>
					</Avatar>
					<Avatar size="lg">
						<AvatarImage src="/broken-image.jpg" alt="Broken" />
						<AvatarFallback>RS</AvatarFallback>
					</Avatar>
					<Avatar size="lg" variant="brand">
						<AvatarImage src="/broken-image.jpg" alt="Broken" />
						<AvatarFallback>AB</AvatarFallback>
					</Avatar>
				</HStack>
				<Typography variant="caption-100" className="text-muted-foreground">
					Shows initials when image fails to load
				</Typography>
			</Group>
		</Gallery>
	),
}

export const AvatarGroup: Story = {
	name: 'Avatar Group',
	render: () => (
		<Gallery>
			<Group label="Avatar Group">
				<div className="flex -space-x-2">
					<Avatar size="md" className="ring-2 ring-background">
						<AvatarImage src="images/avatar-1.svg" alt="User" />
						<AvatarFallback>A</AvatarFallback>
					</Avatar>
					<Avatar size="md" className="ring-2 ring-background">
						<AvatarImage src="images/avatar-2.svg" alt="User" />
						<AvatarFallback>B</AvatarFallback>
					</Avatar>
					<Avatar size="md" className="ring-2 ring-background">
						<AvatarImage src="images/avatar-3.svg" alt="User" />
						<AvatarFallback>C</AvatarFallback>
					</Avatar>
					<Avatar size="md" className="ring-2 ring-background">
						<AvatarFallback className="text-2xs">+3</AvatarFallback>
					</Avatar>
				</div>
			</Group>
		</Gallery>
	),
}

export const More: Story = {
	render: () => (
		<Gallery>
			<VStack gap={6}></VStack>
		</Gallery>
	),
}
