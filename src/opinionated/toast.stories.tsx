import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery } from '../_storybook/gallery'
import { Button } from './button'
import { toast, ToastRegion } from './toast'

const meta = {
	title: 'Components/Toast',
	decorators: [
		(Story) => (
			<>
				<ToastRegion />
				<Story />
			</>
		),
	],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Notifications: Story = {
	name: 'Toast',
	render: () => (
		<Gallery>
			<div className="flex flex-wrap items-center gap-2">
				<Button onClick={() => toast.success('File uploaded')}>Success</Button>
				<Button
					onClick={() => toast.error('Upload failed', { description: 'Check your connection.' })}
				>
					Error
				</Button>
				<Button
					onClick={() =>
						toast('File deleted', {
							action: { label: 'Undo', onAction: () => toast.success('File restored') },
						})
					}
				>
					With action
				</Button>
			</div>
		</Gallery>
	),
}
