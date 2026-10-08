import type { Meta, StoryObj } from '@storybook/react-vite'
import { ResizableShowcase } from '../components/resizable-showcase'

const meta = {
	title: 'Utilities/Resizable',
	component: ResizableShowcase,
} satisfies Meta<typeof ResizableShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
