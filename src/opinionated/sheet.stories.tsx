import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery } from '../_storybook/gallery'
import { Button } from '../_internal/button'
import { Input } from '../_internal/input'
import { Label } from '../_internal/label'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '../_internal/sheet'
import { HStack, VStack } from '../_internal/stack'
import { Typography } from '../_internal/typography'

const meta = {
	title: 'Overlays/Sheet',
	parameters: {
		docs: {
			description: { component: 'Edge-anchored panels for secondary workflows.' },
		},
	},
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
	render: () => (
		<Gallery>
			<HStack gap={3} wrap>
				<Sheet>
					<SheetTrigger render={<Button variant="outline" />}>Right (default)</SheetTrigger>
					<SheetContent side="right">
						<SheetHeader>
							<SheetTitle>Edit settings</SheetTitle>
							<SheetDescription>Adjust your preferences here.</SheetDescription>
						</SheetHeader>
						<VStack gap={3} className="p-6">
							<VStack gap={1}>
								<Label>Display name</Label>
								<Input defaultValue="Jane Doe" />
							</VStack>
							<VStack gap={1}>
								<Label>Email</Label>
								<Input defaultValue="jane@example.com" />
							</VStack>
						</VStack>
						<SheetFooter>
							<Button>Save changes</Button>
						</SheetFooter>
					</SheetContent>
				</Sheet>
				<Sheet>
					<SheetTrigger render={<Button variant="outline" />}>Left</SheetTrigger>
					<SheetContent side="left">
						<SheetHeader>
							<SheetTitle>Navigation</SheetTitle>
							<SheetDescription>Side panel from the left edge.</SheetDescription>
						</SheetHeader>
						<VStack gap={2} className="p-6">
							<Typography variant="body-100">Dashboard</Typography>
							<Typography variant="body-100">Settings</Typography>
							<Typography variant="body-100">Profile</Typography>
						</VStack>
					</SheetContent>
				</Sheet>
				<Sheet>
					<SheetTrigger render={<Button variant="outline" />}>Top</SheetTrigger>
					<SheetContent side="top">
						<SheetHeader>
							<SheetTitle>Announcement</SheetTitle>
							<SheetDescription>Top sheet for banners and announcements.</SheetDescription>
						</SheetHeader>
					</SheetContent>
				</Sheet>
				<Sheet>
					<SheetTrigger render={<Button variant="outline" />}>Bottom</SheetTrigger>
					<SheetContent side="bottom">
						<SheetHeader>
							<SheetTitle>Actions</SheetTitle>
							<SheetDescription>Bottom sheet for action menus.</SheetDescription>
						</SheetHeader>
					</SheetContent>
				</Sheet>
			</HStack>
		</Gallery>
	),
}
