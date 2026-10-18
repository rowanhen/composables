import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery } from '../_storybook/gallery'
import { Button } from '../_internal/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../_internal/dialog'
import { Input } from '../_internal/input'
import { Label } from '../_internal/label'
import { VStack } from '../_internal/stack'

const meta = {
	title: 'Overlays/Dialog',
	parameters: {
		docs: {
			description: { component: 'Modal surfaces for focused tasks.' },
		},
	},
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
	render: () => (
		<Gallery>
			<Dialog>
				<DialogTrigger render={<Button variant="outline" />}>Open Dialog</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit profile</DialogTitle>
						<DialogDescription>
							Make changes to your profile here. Click save when you're done.
						</DialogDescription>
					</DialogHeader>
					<VStack gap={3}>
						<VStack gap={1}>
							<Label htmlFor="name">Name</Label>
							<Input id="name" defaultValue="Jane Doe" />
						</VStack>
						<VStack gap={1}>
							<Label htmlFor="email">Email</Label>
							<Input id="email" defaultValue="jane@example.com" />
						</VStack>
					</VStack>
					<DialogFooter showCloseButton>
						<Button>Save changes</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</Gallery>
	),
}
