import type { Meta, StoryObj } from '@storybook/react-vite'
import { AIToolShowcase } from '../components/ai-elements-showcase'

const meta = {
	title: 'AI/Tool',
	component: AIToolShowcase,
} satisfies Meta<typeof AIToolShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
