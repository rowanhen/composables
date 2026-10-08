import type { Meta, StoryObj } from '@storybook/react-vite'
import { AISuggestionShowcase } from '../components/ai-elements-showcase'

const meta = {
	title: 'AI/Suggestions',
	component: AISuggestionShowcase,
} satisfies Meta<typeof AISuggestionShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
