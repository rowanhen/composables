import type { Meta, StoryObj } from '@storybook/react-vite'
import { AIFullChatShowcase } from '../components/ai-elements-showcase'

const meta = {
	title: 'AI/Full chat',
	component: AIFullChatShowcase,
} satisfies Meta<typeof AIFullChatShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
