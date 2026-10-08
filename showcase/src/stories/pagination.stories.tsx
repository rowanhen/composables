import type { Meta, StoryObj } from '@storybook/react-vite'
import { PaginationShowcase } from '../components/pagination-showcase'

const meta = {
	title: 'Navigation/Pagination',
	component: PaginationShowcase,
} satisfies Meta<typeof PaginationShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
