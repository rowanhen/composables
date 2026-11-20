import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { ColorPicker } from './color-picker'

const meta = {
	title: 'Components/Color picker',
	component: ColorPicker,
	args: { label: 'Accent color' },
} satisfies Meta<typeof ColorPicker>

export default meta

export const Controlled: StoryObj<typeof meta> = {
	name: 'Color picker',
	render: function Render(args) {
		const [color, setColor] = useState('#4f46e5')
		return (
			<div className="flex items-center gap-3">
				<ColorPicker {...args} value={color} onValueChange={setColor} />
				<output className="font-mono">{color}</output>
			</div>
		)
	},
}
