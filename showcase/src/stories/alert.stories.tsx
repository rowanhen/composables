import type { Meta, StoryObj } from '@storybook/react-vite'
import { AlertsShowcase } from '../components/alerts-showcase'

const meta = {
	title: 'Content/Alert',
	component: AlertsShowcase,
} satisfies Meta<typeof AlertsShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
