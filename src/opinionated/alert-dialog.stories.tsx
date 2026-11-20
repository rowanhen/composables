import type { Meta, StoryObj } from '@storybook/react-vite'
import { TrashIcon } from 'lucide-react'
import { Gallery } from '../_storybook/gallery'
import { AlertDialog } from './alert-dialog'
import { Button } from './button'

const meta = {
	title: 'Components/Alert Dialog',
	component: AlertDialog,
} satisfies Meta<typeof AlertDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
	name: 'Alert Dialog',
	args: { title: 'Delete project?' },
	render: (args) => (
		<Gallery>
			<AlertDialog
				{...args}
				trigger={<Button variant="destructive">Delete project</Button>}
				description="This will remove the project and its files."
				actionText="Delete"
				media={<TrashIcon />}
				onAction={() => new Promise<void>((resolve) => setTimeout(resolve, 650))}
			/>
		</Gallery>
	),
}
