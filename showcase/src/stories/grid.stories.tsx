import type { Meta, StoryObj } from '@storybook/react-vite'
import { GridShowcase } from '../components/grid-showcase'

const meta = {
	title: 'Layout/Grid',
	component: GridShowcase,
} satisfies Meta<typeof GridShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
