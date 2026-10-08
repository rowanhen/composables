import type { Meta, StoryObj } from '@storybook/react-vite'
import { SheetShowcase } from '../components/sheet-showcase'

const meta = {
	title: 'Overlays/Sheet',
	component: SheetShowcase,
} satisfies Meta<typeof SheetShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
