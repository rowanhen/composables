import type { Meta, StoryObj } from '@storybook/react-vite'
import { TabsShowcase } from '../components/tabs-showcase'

const meta = {
	title: 'Navigation/Tabs',
	component: TabsShowcase,
} satisfies Meta<typeof TabsShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
