import type { Meta, StoryObj } from '@storybook/react-vite'
import { BubbleShowcase } from '../components/bubble-showcase'

const meta = {
	title: 'Content/Bubble',
	component: BubbleShowcase,
} satisfies Meta<typeof BubbleShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
