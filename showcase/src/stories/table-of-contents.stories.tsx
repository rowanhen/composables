import type { Meta, StoryObj } from '@storybook/react-vite'
import { TableOfContentsShowcase } from '../components/table-of-contents-showcase'

const meta = {
	title: 'Navigation/Table of contents',
	component: TableOfContentsShowcase,
} satisfies Meta<typeof TableOfContentsShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
