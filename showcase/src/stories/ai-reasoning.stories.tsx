import type { Meta, StoryObj } from '@storybook/react-vite'
import { AIReasoningShowcase } from '../components/ai-elements-showcase'

const meta = {
	title: 'AI/Reasoning',
	component: AIReasoningShowcase,
} satisfies Meta<typeof AIReasoningShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
