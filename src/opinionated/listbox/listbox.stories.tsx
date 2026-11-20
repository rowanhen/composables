import type { Meta, StoryObj } from '@storybook/react-vite'
import { Listbox } from '@leitware/composables'

const meta = { title: 'Components/Listbox' } satisfies Meta
export default meta

export const Overview: StoryObj<typeof meta> = {
	name: 'Listbox',
	render: () => (
		<Listbox items={['Daily', 'Weekly']} aria-label="Frequency" defaultValue="Weekly" />
	),
}
