import type { Meta, StoryObj } from '@storybook/react-vite'
import { AIMessageShowcase } from '../components/ai-elements-showcase'

const meta = {
	title: 'AI/Message',
	component: AIMessageShowcase,
} satisfies Meta<typeof AIMessageShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
