import type { Meta, StoryObj } from '@storybook/react-vite'
import { TypographyShowcase } from '../components/typography-showcase'

const meta = {
	title: 'Foundations/Typography',
	component: TypographyShowcase,
} satisfies Meta<typeof TypographyShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
