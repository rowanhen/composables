import type { Meta, StoryObj } from '@storybook/react-vite'
import { CollapsibleShowcase } from '../components/collapsible-showcase'

const meta = {
	title: 'Content/Collapsible',
	component: CollapsibleShowcase,
} satisfies Meta<typeof CollapsibleShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
