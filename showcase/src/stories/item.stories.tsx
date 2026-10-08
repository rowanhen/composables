import type { Meta, StoryObj } from '@storybook/react-vite'
import { ItemShowcase } from '../components/item-showcase'

const meta = {
	title: 'Content/Item',
	component: ItemShowcase,
} satisfies Meta<typeof ItemShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
