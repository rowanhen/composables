import type { Meta, StoryObj } from '@storybook/react-vite'
import { AIPromptInputShowcase } from '../components/ai-elements-showcase'

const meta = {
	title: 'AI/Prompt input',
	component: AIPromptInputShowcase,
} satisfies Meta<typeof AIPromptInputShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
