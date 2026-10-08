import type { Meta, StoryObj } from '@storybook/react-vite'
import { ToggleShowcase } from '../components/toggle-showcase'

const meta = {
	title: 'Forms/Toggle',
	component: ToggleShowcase,
} satisfies Meta<typeof ToggleShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
