import { AlertTriangleIcon, TrashIcon } from 'lucide-react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery } from '../_storybook/gallery'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogMedia,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '../_internal/alert-dialog'
import { Button } from '../_internal/button'
import { HStack } from '../_internal/stack'

const meta = {
	title: 'Overlays/Alert dialog',
	parameters: {
		docs: {
			description: { component: 'Confirmation and destructive-action dialogs.' },
		},
	},
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
	render: () => (
		<Gallery>
			<HStack gap={3} wrap>
				<AlertDialog>
					<AlertDialogTrigger render={<Button variant="destructive" />}>
						Delete item
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogMedia>
								<TrashIcon />
							</AlertDialogMedia>
							<AlertDialogTitle>Delete this item?</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone. This will permanently delete the item and all
								associated data.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction variant="destructive">Delete</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
				<AlertDialog>
					<AlertDialogTrigger render={<Button variant="outline" />}>
						Confirm action
					</AlertDialogTrigger>
					<AlertDialogContent size="sm">
						<AlertDialogHeader>
							<AlertDialogMedia>
								<AlertTriangleIcon />
							</AlertDialogMedia>
							<AlertDialogTitle>Are you sure?</AlertDialogTitle>
							<AlertDialogDescription>
								This will apply changes to your account settings.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction>Confirm</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</HStack>
		</Gallery>
	),
}
