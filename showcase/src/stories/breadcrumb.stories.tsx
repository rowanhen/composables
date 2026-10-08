import type { Meta, StoryObj } from '@storybook/react-vite'
import { BreadcrumbShowcase } from '../components/breadcrumb-showcase'

const meta = {
	title: 'Navigation/Breadcrumb',
	component: BreadcrumbShowcase,
} satisfies Meta<typeof BreadcrumbShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
