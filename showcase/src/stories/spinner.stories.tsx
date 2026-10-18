import type { Meta, StoryObj } from '@storybook/react-vite'
import { SpinnerShowcase } from '../components/spinner-showcase'

const meta = {
	title: 'Utilities/Spinner',
	component: SpinnerShowcase,
} satisfies Meta<typeof SpinnerShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
