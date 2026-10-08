import type { Meta, StoryObj } from '@storybook/react-vite'
import { ContainerShowcase } from '../components/container-showcase'

const meta = {
	title: 'Layout/Container',
	component: ContainerShowcase,
} satisfies Meta<typeof ContainerShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
