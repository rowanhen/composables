import type { Meta, StoryObj } from '@storybook/react-vite'
import type { CSSProperties } from 'react'
import {
	Button,
	Dialog,
	DialogClose,
	FormCombobox,
	FormInput,
	FormSelect,
	FormTextarea,
} from '@leitware/composables'

const meta = { title: 'Foundations/Shared tokens' } satisfies Meta
export default meta

const tokens = {
	'--button-primary-face': 'var(--bg-fill-brand)',
	'--button-primary-ink': 'var(--text-on-fill-brand)',
	'--button-height': '2.5rem',
	'--button-radius': '0.75rem',
	'--button-font': '0.875rem',
	'--field-height': '2.75rem',
	'--field-radius': '0.75rem',
	'--field-face': 'var(--bg-surface-field)',
	'--field-font': '0.875rem',
	'--overlay-radius': '1rem',
} as CSSProperties

export const Overview: StoryObj<typeof meta> = {
	name: 'Shared tokens',
	render: () => (
		<div className="mx-auto max-w-md space-y-5" style={tokens}>
			<div className="flex flex-wrap gap-3">
				<Button variant="primary">Save settings</Button>
				<Button>Cancel changes</Button>
				<Dialog
					trigger="Open confirmation"
					title="Confirm settings"
					footer={
						<>
							<DialogClose>Cancel</DialogClose>
							<DialogClose variant="primary">Save</DialogClose>
						</>
					}
				>
					<p className="mt-3">Apply these settings to your workspace.</p>
				</Dialog>
			</div>
			<FormInput label="Name" />
			<FormSelect label="Region" options={[{ value: 'eu', label: 'Europe' }]} />
			<FormCombobox label="Team" options={[{ value: 'design', label: 'Design' }]} />
			<FormTextarea label="Notes" rows={3} />
		</div>
	),
}
