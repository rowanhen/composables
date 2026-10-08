import type { Meta, StoryObj } from '@storybook/react-vite'
import { DividerShowcase } from '../components/divider-showcase'

const meta = {
	title: 'Utilities/Divider',
	component: DividerShowcase,
} satisfies Meta<typeof DividerShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
