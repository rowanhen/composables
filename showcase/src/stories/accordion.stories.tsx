import type { Meta, StoryObj } from '@storybook/react-vite'
import { AccordionShowcase } from '../components/accordion-showcase'

const meta = {
	title: 'Content/Accordion',
	component: AccordionShowcase,
} satisfies Meta<typeof AccordionShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
