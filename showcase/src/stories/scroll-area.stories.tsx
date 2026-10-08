import type { Meta, StoryObj } from '@storybook/react-vite'
import { ScrollAreaShowcase } from '../components/scroll-area-showcase'

const meta = {
	title: 'Utilities/Scroll area',
	component: ScrollAreaShowcase,
} satisfies Meta<typeof ScrollAreaShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
