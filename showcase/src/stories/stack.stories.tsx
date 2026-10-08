import type { Meta, StoryObj } from '@storybook/react-vite'
import { StackShowcase } from '../components/stack-showcase'

const meta = {
	title: 'Layout/Stack',
	component: StackShowcase,
} satisfies Meta<typeof StackShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
