import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery } from '../_storybook/gallery'
import { Dialog, DialogClose } from './dialog'
import { FormInput } from './form-input'

const meta = {
	title: 'Components/Dialog',
	component: Dialog,
	args: {
		title: 'Edit profile',
		description: 'Update the name and email on your profile.',
		trigger: 'Edit profile',
	},
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
	name: 'Dialog',
	render: (args) => (
		<Gallery>
			<Dialog
				{...args}
				footer={
					<>
						<DialogClose>Cancel</DialogClose>
						<DialogClose variant="primary">Save changes</DialogClose>
					</>
				}
			>
				<div className="mt-4 space-y-3">
					<FormInput label="Name" defaultValue="Jane Doe" />
					<FormInput label="Email" defaultValue="jane@example.com" />
				</div>
			</Dialog>
		</Gallery>
	),
}
