import type { Meta, StoryObj } from '@storybook/react-vite'
import { AlertDialogShowcase } from '../components/alert-dialog-showcase'

const meta = {
	title: 'Overlays/Alert dialog',
	component: AlertDialogShowcase,
} satisfies Meta<typeof AlertDialogShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
