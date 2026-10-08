import type { Meta, StoryObj } from '@storybook/react-vite'
import { SpacingShowcase } from '../components/spacing-showcase'

const meta = {
	title: 'Layout/Spacing',
	component: SpacingShowcase,
} satisfies Meta<typeof SpacingShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
