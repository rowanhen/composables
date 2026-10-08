import type { Meta, StoryObj } from '@storybook/react-vite'
import { DialogShowcase } from '../components/dialog-showcase'

const meta = {
	title: 'Overlays/Dialog',
	component: DialogShowcase,
} satisfies Meta<typeof DialogShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
