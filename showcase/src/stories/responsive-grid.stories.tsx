import type { Meta, StoryObj } from '@storybook/react-vite'
import { ResponsiveGridShowcase } from '../components/responsive-grid-showcase'

const meta = {
	title: 'Layout/Responsive grid',
	component: ResponsiveGridShowcase,
} satisfies Meta<typeof ResponsiveGridShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
