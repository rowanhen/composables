import type { Meta, StoryObj } from '@storybook/react-vite'
import { CarouselShowcase } from '../components/carousel-showcase'

const meta = {
	title: 'Data/Carousel',
	component: CarouselShowcase,
} satisfies Meta<typeof CarouselShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
