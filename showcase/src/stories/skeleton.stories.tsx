import type { Meta, StoryObj } from '@storybook/react-vite'
import { SkeletonShowcase } from '../components/skeleton-showcase'

const meta = {
	title: 'Utilities/Skeleton',
	component: SkeletonShowcase,
} satisfies Meta<typeof SkeletonShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
