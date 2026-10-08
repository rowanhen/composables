import type { Meta, StoryObj } from '@storybook/react-vite'
import { MessageShowcase } from '../components/message-showcase'

const meta = {
	title: 'Content/Message',
	component: MessageShowcase,
} satisfies Meta<typeof MessageShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
