import type { Meta, StoryObj } from '@storybook/react-vite'
import { AIChainOfThoughtShowcase } from '../components/ai-elements-showcase'

const meta = {
	title: 'AI/Chain of thought',
	component: AIChainOfThoughtShowcase,
} satisfies Meta<typeof AIChainOfThoughtShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
