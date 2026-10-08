import type { Meta, StoryObj } from '@storybook/react-vite'
import { ToastShowcase } from '../components/toast-showcase'

const meta = {
	title: 'Overlays/Toast',
	component: ToastShowcase,
} satisfies Meta<typeof ToastShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
