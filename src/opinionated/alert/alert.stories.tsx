import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery } from '../../_storybook/gallery'
import { Alert } from './alert'

const meta = { title: 'Components/Alert', component: Alert } satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Variants: Story = {
	name: 'Alert',
	render: () => (
		<Gallery>
			<Alert
				type="notice"
				title="Scheduled maintenance"
				message="The workspace will restart at 2 p.m."
			/>
			<Alert type="positive" title="Upload complete" message="You can share your files now." />
			<Alert type="negative" title="Export failed" message="Try exporting again." dismissible />
		</Gallery>
	),
}
