import type { Meta, StoryObj } from '@storybook/react-vite'
import { TooltipShowcase } from '../components/tooltip-showcase'

const meta = {
	title: 'Overlays/Tooltip',
	component: TooltipShowcase,
} satisfies Meta<typeof TooltipShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
