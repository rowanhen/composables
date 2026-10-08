import type { Meta, StoryObj } from '@storybook/react-vite'
import { MarkerShowcase } from '../components/marker-showcase'

const meta = {
	title: 'Content/Marker',
	component: MarkerShowcase,
} satisfies Meta<typeof MarkerShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
