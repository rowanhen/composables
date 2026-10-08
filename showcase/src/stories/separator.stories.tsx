import type { Meta, StoryObj } from '@storybook/react-vite'
import { SeparatorShowcase } from '../components/separator-showcase'

const meta = {
	title: 'Utilities/Separator',
	component: SeparatorShowcase,
} satisfies Meta<typeof SeparatorShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
