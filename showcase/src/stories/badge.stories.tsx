import type { Meta, StoryObj } from '@storybook/react-vite'
import { BadgesShowcase } from '../components/badges-showcase'

const meta = {
	title: 'Actions/Badge',
	component: BadgesShowcase,
} satisfies Meta<typeof BadgesShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
