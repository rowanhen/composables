import type { Meta, StoryObj } from '@storybook/react-vite'
import { CodeBlockShowcase } from '../components/code-block-showcase'

const meta = {
	title: 'Data/Code block',
	component: CodeBlockShowcase,
} satisfies Meta<typeof CodeBlockShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
