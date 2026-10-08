import type { Meta, StoryObj } from '@storybook/react-vite'
import { AITaskShowcase } from '../components/ai-elements-showcase'

const meta = {
	title: 'AI/Task',
	component: AITaskShowcase,
} satisfies Meta<typeof AITaskShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
