import type { Meta, StoryObj } from '@storybook/react-vite'
import { BentoShowcase } from '../components/bento-showcase'

const meta = {
	title: 'Layout/Bento',
	component: BentoShowcase,
} satisfies Meta<typeof BentoShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
