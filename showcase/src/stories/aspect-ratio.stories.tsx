import type { Meta, StoryObj } from '@storybook/react-vite'
import { AspectRatioShowcase } from '../components/aspect-ratio-showcase'

const meta = {
	title: 'Utilities/Aspect ratio',
	component: AspectRatioShowcase,
} satisfies Meta<typeof AspectRatioShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
