import type { Meta, StoryObj } from '@storybook/react-vite'
import { AIConversationShowcase } from '../components/ai-elements-showcase'

const meta = {
	title: 'AI/Conversation',
	component: AIConversationShowcase,
} satisfies Meta<typeof AIConversationShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
