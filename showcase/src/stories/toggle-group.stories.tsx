import type { Meta, StoryObj } from '@storybook/react-vite'
import { ToggleGroupShowcase } from '../components/toggle-group-showcase'

const meta = {
	title: 'Forms/Toggle group',
	component: ToggleGroupShowcase,
} satisfies Meta<typeof ToggleGroupShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
