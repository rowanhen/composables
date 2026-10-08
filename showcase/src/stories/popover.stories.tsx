import type { Meta, StoryObj } from '@storybook/react-vite'
import { PopoverShowcase } from '../components/popover-showcase'

const meta = {
	title: 'Overlays/Popover',
	component: PopoverShowcase,
} satisfies Meta<typeof PopoverShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
