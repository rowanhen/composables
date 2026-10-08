import type { Meta, StoryObj } from '@storybook/react-vite'
import { FormControlsShowcase } from '../components/form-controls-showcase'

const meta = {
	title: 'Forms/Form controls',
	component: FormControlsShowcase,
} satisfies Meta<typeof FormControlsShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
