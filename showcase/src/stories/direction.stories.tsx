import type { Meta, StoryObj } from '@storybook/react-vite'
import { DirectionShowcase } from '../components/direction-showcase'

const meta = {
	title: 'Utilities/Direction',
	component: DirectionShowcase,
} satisfies Meta<typeof DirectionShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
