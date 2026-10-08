import type { Meta, StoryObj } from '@storybook/react-vite'
import { FlowShowcase } from '../components/flow-showcase'

const meta = {
	title: 'Data/Flow',
	component: FlowShowcase,
} satisfies Meta<typeof FlowShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
