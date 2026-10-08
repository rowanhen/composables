import type { Meta, StoryObj } from '@storybook/react-vite'
import { DropdownMenuShowcase } from '../components/dropdown-menu-showcase'

const meta = {
	title: 'Overlays/Dropdown menu',
	component: DropdownMenuShowcase,
} satisfies Meta<typeof DropdownMenuShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
