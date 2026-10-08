import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconShowcase } from '../components/icon-showcase'

const meta = {
	title: 'Actions/Icon',
	component: IconShowcase,
} satisfies Meta<typeof IconShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
