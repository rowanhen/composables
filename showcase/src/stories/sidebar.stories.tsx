import type { Meta, StoryObj } from '@storybook/react-vite'
import { SidebarShowcase } from '../components/sidebar-showcase'

const meta = {
	title: 'Navigation/Sidebar',
	component: SidebarShowcase,
} satisfies Meta<typeof SidebarShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
