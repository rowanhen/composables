import type { Meta, StoryObj } from '@storybook/react-vite'
import { ColorTokensShowcase } from '../components/color-tokens'

const meta = {
	title: 'Foundations/Color tokens',
	component: ColorTokensShowcase,
} satisfies Meta<typeof ColorTokensShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
