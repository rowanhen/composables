import type { Meta, StoryObj } from '@storybook/react-vite'
import { AvatarShowcase } from '../components/avatar-showcase'

const meta = {
	title: 'Actions/Avatar',
	component: AvatarShowcase,
} satisfies Meta<typeof AvatarShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
