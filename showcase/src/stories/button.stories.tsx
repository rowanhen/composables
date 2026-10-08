import type { Meta, StoryObj } from '@storybook/react-vite'
import { ButtonsShowcase } from '../components/buttons-showcase'

const meta = {
	title: 'Actions/Button',
	component: ButtonsShowcase,
} satisfies Meta<typeof ButtonsShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
