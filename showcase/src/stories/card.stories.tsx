import type { Meta, StoryObj } from '@storybook/react-vite'
import { CardsShowcase } from '../components/cards-showcase'

const meta = {
	title: 'Content/Card',
	component: CardsShowcase,
} satisfies Meta<typeof CardsShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
