import type { Meta, StoryObj } from '@storybook/react-vite'
import { ClipboardTextShowcase } from '../components/clipboard-text-showcase'

const meta = {
	title: 'Actions/Clipboard text',
	component: ClipboardTextShowcase,
} satisfies Meta<typeof ClipboardTextShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
