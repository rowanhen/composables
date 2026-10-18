import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery, Group } from '../_storybook/gallery'
import { Grid } from '../_internal/grid'
import { FormCalendarPopover } from './form-calendar-popover'
import { FormCheckbox } from './form-checkbox'
import { FormCombobox } from './form-combobox'
import { FormDateOfBirth } from './form-date-of-birth'
import { FormInput } from './form-input'
import { FormInputGroup } from './form-input-group'
import { FormRadioGroup } from './form-radiogroup'
import { FormSelect } from './form-select'
import { FormSlider } from './form-slider'
import { FormSwitch } from './form-switch'
import { FormTextarea } from './form-textarea'

const meta = {
	title: 'Forms/Validation states',
	parameters: {
		docs: {
			description: {
				component:
					'Every form control with assistive text, an error, and disabled - side by side so the states can be compared across presets.',
			},
		},
	},
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const HINT = 'Some assistive text'
const ERROR = 'This field is required'

const options = [
	{ label: 'Comprehensive', value: 'comprehensive' },
	{ label: 'Third party only', value: 'third-party' },
]

type State = 'assistive' | 'error' | 'disabled'
const STATES: Array<{ state: State; title: string }> = [
	{ state: 'assistive', title: 'Assistive text' },
	{ state: 'error', title: 'Error' },
	{ state: 'disabled', title: 'Disabled' },
]

// Props shared by every control for a given state.
function stateProps(state: State) {
	return {
		description: HINT,
		error: state === 'error' ? ERROR : undefined,
		disabled: state === 'disabled',
		required: true,
	}
}

function Row({ title, render }: { title: string; render: (state: State) => React.ReactNode }) {
	return (
		<Group label={title}>
			<Grid columns={3} gap={6}>
				{STATES.map(({ state, title: stateTitle }) => (
					<div key={state} className="flex min-w-0 flex-col gap-2">
						<span className="text-muted-foreground text-2xs uppercase">{stateTitle}</span>
						{render(state)}
					</div>
				))}
			</Grid>
		</Group>
	)
}

export const Inputs: Story = {
	render: () => (
		<Gallery>
			<Row
				title="Text input"
				render={(state) => (
					<FormInput label="First name" placeholder="Enter name..." {...stateProps(state)} />
				)}
			/>
			<Row
				title="Currency input"
				render={(state) => (
					<FormInputGroup
						label="Annual mileage cost"
						startText="£"
						inputProps={{ placeholder: '0.00', inputMode: 'decimal' }}
						{...stateProps(state)}
					/>
				)}
			/>
			<Row
				title="Textarea"
				render={(state) => (
					<FormTextarea label="Tell us more" placeholder="Write here..." {...stateProps(state)} />
				)}
			/>
			<Row
				title="Date of birth"
				render={(state) => <FormDateOfBirth label="Date of birth" {...stateProps(state)} />}
			/>
			<Row
				title="Date picker"
				render={(state) => <FormCalendarPopover label="Start date" {...stateProps(state)} />}
			/>
		</Gallery>
	),
}

export const Selection: Story = {
	render: () => (
		<Gallery>
			<Row
				title="Select"
				render={(state) => (
					<FormSelect
						label="Cover type"
						placeholder="Choose cover"
						options={options}
						{...stateProps(state)}
					/>
				)}
			/>
			<Row
				title="Combobox"
				render={(state) => (
					<FormCombobox
						label="Cover type"
						placeholder="Search cover"
						options={options}
						{...stateProps(state)}
					/>
				)}
			/>
			<Row
				title="Radio group"
				render={(state) => (
					<FormRadioGroup label="Payment frequency" options={options} {...stateProps(state)} />
				)}
			/>
			<Row
				title="Radio cards"
				render={(state) => (
					<FormRadioGroup
						label="Payment frequency"
						variant="card"
						options={options}
						{...stateProps(state)}
					/>
				)}
			/>
		</Gallery>
	),
}

export const Toggles: Story = {
	render: () => (
		<Gallery>
			<Row
				title="Checkbox"
				render={(state) => <FormCheckbox label="I agree to the terms" {...stateProps(state)} />}
			/>
			<Row
				title="Switch"
				render={(state) => <FormSwitch label="Email updates" {...stateProps(state)} />}
			/>
			<Row
				title="Slider"
				render={(state) => (
					<FormSlider
						label="Excess"
						defaultValue={[40]}
						{...stateProps(state)}
						disabled={state === 'disabled'}
					/>
				)}
			/>
		</Gallery>
	),
}
