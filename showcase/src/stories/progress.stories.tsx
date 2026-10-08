import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProgressShowcase } from '../components/progress-showcase'

const meta = {
	title: 'Data/Progress',
	component: ProgressShowcase,
} satisfies Meta<typeof ProgressShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
