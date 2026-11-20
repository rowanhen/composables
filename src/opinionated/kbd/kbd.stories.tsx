import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery } from '../../_storybook/gallery'
import { Kbd, KbdCombo } from './kbd'

const meta = { title: 'Components/Keyboard shortcut', component: Kbd } satisfies Meta<typeof Kbd>

export default meta
type Story = StoryObj<typeof meta>

export const Shortcuts: Story = {
	name: 'Keyboard shortcut',
	render: () => (
		<Gallery>
			<div className="flex items-center gap-4">
				<Kbd>Esc</Kbd>
				<Kbd pressed>Tab</Kbd>
				<KbdCombo keys={['mod', 'k']} />
				<KbdCombo keys={['shift', 'enter']} />
			</div>
		</Gallery>
	),
}
