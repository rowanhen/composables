import type { Meta, StoryObj } from '@storybook/react-vite'
import { AIShimmerShowcase } from '../components/ai-elements-showcase'

const meta = {
	title: 'AI/Shimmer',
	component: AIShimmerShowcase,
} satisfies Meta<typeof AIShimmerShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
