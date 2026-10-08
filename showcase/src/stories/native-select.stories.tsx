import type { Meta, StoryObj } from '@storybook/react-vite'
import { NativeSelectShowcase } from '../components/native-select-showcase'

const meta = {
	title: 'Forms/Native select',
	component: NativeSelectShowcase,
} satisfies Meta<typeof NativeSelectShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
