import type { Meta, StoryObj } from '@storybook/react-vite'
import { AIConfirmationShowcase } from '../components/ai-elements-showcase'

const meta = {
	title: 'AI/Confirmation',
	component: AIConfirmationShowcase,
} satisfies Meta<typeof AIConfirmationShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
