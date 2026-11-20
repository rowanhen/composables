import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery } from '../../_storybook/gallery'
import { Toggle } from './toggle'

const meta = {
	title: 'Components/Toggle',
	component: Toggle,
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
	name: 'Toggle',
	render: () => (
		<Gallery>
			<div className="flex flex-col gap-4">
				<div className="flex gap-2">
					<Toggle aria-label="Bold">
						<BoldIcon />
					</Toggle>
					<Toggle aria-label="Italic">
						<ItalicIcon />
					</Toggle>
					<Toggle aria-label="Underline">
						<UnderlineIcon />
					</Toggle>
				</div>
				<div className="flex gap-2">
					<Toggle size="icon-sm" aria-label="Bold">
						<BoldIcon />
					</Toggle>
					<Toggle size="icon-sm" aria-label="Italic">
						<ItalicIcon />
					</Toggle>
					<Toggle size="icon-sm" aria-label="Underline">
						<UnderlineIcon />
					</Toggle>
				</div>
			</div>
		</Gallery>
	),
}
