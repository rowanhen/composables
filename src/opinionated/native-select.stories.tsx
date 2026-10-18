import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery, Group } from '../_storybook/gallery'
import { NativeSelect } from './native-select'
import { HStack, VStack } from '../_internal/stack'

const meta = {
	title: 'Forms/Native select',
	component: NativeSelect,
	args: {
		options: [
			{ label: 'One', value: '1' },
			{ label: 'Two', value: '2' },
		],
	},
	parameters: {
		docs: {
			description: { component: 'Lightweight native select controls with design-system styling.' },
		},
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
	render: () => (
		<Gallery>
			<Group label="Sizes">
				<HStack gap={4} align="center" wrap>
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
				</HStack>
			</Group>
		</Gallery>
	),
}

export const Placeholder: Story = {
	render: () => (
		<Gallery>
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

export const More: Story = {
	render: () => (
		<Gallery>
			<VStack gap={4} className="max-w-xl"></VStack>
		</Gallery>
	),
}
