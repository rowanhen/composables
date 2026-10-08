import type { Meta, StoryObj } from '@storybook/react-vite'
import { LayerCardShowcase } from '../components/layer-card-showcase'

const meta = {
	title: 'Content/Layer card',
	component: LayerCardShowcase,
} satisfies Meta<typeof LayerCardShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
