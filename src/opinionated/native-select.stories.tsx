import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery, Group } from '../_storybook/gallery'
import { NativeSelect } from './native-select'

const meta = {
	title: 'Components/Native select',
	component: NativeSelect,
	args: {
		options: [
			{ label: 'One', value: '1' },
			{ label: 'Two', value: '2' },
		],
	},
} satisfies Meta<typeof NativeSelect>

export default meta
type Story = StoryObj<typeof meta>

const accountOptions = [
	{ label: 'Personal workspace', value: 'personal' },
	{ label: 'Client portal', value: 'client' },
	{ label: 'Archived team', value: 'archived', disabled: true },
]

export const Sizes: Story = {
	name: 'Native select',
	render: () => (
		<Gallery>
			<Group label="Sizes">
				<div className="flex gap-4 items-center flex-wrap">
					<NativeSelect
						defaultValue="personal"
						options={accountOptions}
						aria-label="Workspace"
						className="min-w-56"
					/>
					<NativeSelect
						size="sm"
						defaultValue="client"
						options={accountOptions}
						aria-label="Compact workspace"
						className="min-w-48"
					/>
				</div>
			</Group>
			<Group label="Placeholder">
				<NativeSelect
					defaultValue=""
					placeholder="Choose workspace"
					options={accountOptions}
					aria-label="Choose workspace"
					className="min-w-56"
				/>
			</Group>
		</Gallery>
	),
}
