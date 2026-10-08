import type { Meta, StoryObj } from '@storybook/react-vite'
import { HoverCardShowcase } from '../components/hover-card-showcase'

const meta = {
	title: 'Overlays/Hover card',
	component: HoverCardShowcase,
} satisfies Meta<typeof HoverCardShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
