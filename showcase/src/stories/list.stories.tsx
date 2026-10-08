import type { Meta, StoryObj } from '@storybook/react-vite'
import { ListShowcase } from '../components/list-showcase'

const meta = {
	title: 'Content/List',
	component: ListShowcase,
} satisfies Meta<typeof ListShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
