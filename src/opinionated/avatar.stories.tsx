import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery, Group } from '../_storybook/gallery'
import { Avatar, AvatarFallback, AvatarImage } from '../components/keyframery/avatar'

const meta = {
	title: 'Components/Avatar',
	component: Avatar,
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Sizes: Story = {
	render: () => (
		<Gallery>
			<Group label="Sizes">
				<div className="flex gap-3 items-center">
					<Avatar className="size-5">
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
					<Avatar className="size-14">
						<AvatarImage src="images/avatar-5.svg" alt="User" />
						<AvatarFallback>GH</AvatarFallback>
					</Avatar>
				</div>
				<span className="text-xs text-muted-foreground">xs · sm · md · lg · xl</span>
			</Group>
		</Gallery>
	),
}

export const Fallbacks: Story = {
	render: () => (
		<Gallery>
			<Group label="Fallbacks">
				<div className="flex gap-3 items-center">
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
					<Avatar size="lg">
						<AvatarImage src="/broken-image.jpg" alt="Broken" />
						<AvatarFallback>AB</AvatarFallback>
					</Avatar>
				</div>
				<span className="text-xs text-muted-foreground">
					Shows initials when image fails to load
				</span>
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
