import type { Meta, StoryObj } from '@storybook/react-vite'
import { AISourcesShowcase } from '../components/ai-elements-showcase'

const meta = {
	title: 'AI/Sources',
	component: AISourcesShowcase,
} satisfies Meta<typeof AISourcesShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
