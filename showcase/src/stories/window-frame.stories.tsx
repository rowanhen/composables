import type { Meta, StoryObj } from '@storybook/react-vite'
import { WindowFrameShowcase } from '../components/window-frame-showcase'

const meta = {
	title: 'Layout/Window frame',
	component: WindowFrameShowcase,
} satisfies Meta<typeof WindowFrameShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
