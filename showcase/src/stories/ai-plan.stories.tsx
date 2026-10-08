import type { Meta, StoryObj } from '@storybook/react-vite'
import { AIPlanShowcase } from '../components/ai-elements-showcase'

const meta = {
	title: 'AI/Plan',
	component: AIPlanShowcase,
} satisfies Meta<typeof AIPlanShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
