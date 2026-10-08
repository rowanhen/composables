import type { Meta, StoryObj } from '@storybook/react-vite'
import { KbdShowcase } from '../components/kbd-showcase'

const meta = {
	title: 'Actions/Kbd',
	component: KbdShowcase,
} satisfies Meta<typeof KbdShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
