import type { Meta, StoryObj } from '@storybook/react-vite'
import { EmptyShowcase } from '../components/empty-showcase'

const meta = {
	title: 'Utilities/Empty',
	component: EmptyShowcase,
} satisfies Meta<typeof EmptyShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
