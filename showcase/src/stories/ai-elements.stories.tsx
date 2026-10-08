import type { Meta, StoryObj } from '@storybook/react-vite'
import { AIElementsShowcase } from '../components/ai-elements-showcase'

const meta = {
	title: 'AI/AI elements',
	component: AIElementsShowcase,
} satisfies Meta<typeof AIElementsShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
