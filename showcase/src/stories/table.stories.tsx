import type { Meta, StoryObj } from '@storybook/react-vite'
import { TableShowcase } from '../components/table-showcase'

const meta = {
	title: 'Data/Table',
	component: TableShowcase,
} satisfies Meta<typeof TableShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
