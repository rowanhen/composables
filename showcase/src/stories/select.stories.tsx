import type { Meta, StoryObj } from '@storybook/react-vite'
import { SelectShowcase } from '../components/select-showcase'

const meta = {
	title: 'Forms/Select',
	component: SelectShowcase,
} satisfies Meta<typeof SelectShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
