import type { Meta, StoryObj } from '@storybook/react-vite'
import { CalendarShowcase } from '../components/calendar-showcase'

const meta = {
	title: 'Forms/Calendar',
	component: CalendarShowcase,
} satisfies Meta<typeof CalendarShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
