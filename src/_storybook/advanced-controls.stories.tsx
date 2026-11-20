import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery } from './gallery'
import {
	Autocomplete,
	DatePicker,
	Field,
	FieldLabel,
	FormMultiCombobox,
	NumberInput,
	TimeInput,
	type FormMultiComboboxOption,
} from '@leitware/composables'

const meta = { title: 'Components/Advanced controls' } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

const regions: FormMultiComboboxOption[] = [
	{ id: 'eu', value: 'Europe' },
	{ id: 'apac', value: 'Asia Pacific' },
	{ id: 'na', value: 'North America' },
]

function PreferencesDemo() {
	const [selectedRegions, setSelectedRegions] = useState(regions.slice(0, 1))
	return (
		<Gallery>
			<div className="flex max-w-sm flex-col gap-6">
				<Autocomplete
					label="Office"
					placeholder="Search or enter a city"
					items={['London', 'Manchester', 'Edinburgh']}
				/>
				<FormMultiCombobox
					label="Regions"
					options={regions}
					value={selectedRegions}
					onValueChange={setSelectedRegions}
				/>
				<NumberInput label="Seats" name="seat-count" min={1} max={20} defaultValue={2} />
			</div>
		</Gallery>
	)
}

export const Preferences: Story = { render: () => <PreferencesDemo /> }

export const Schedule: Story = {
	render: () => (
		<Gallery>
			<div className="flex max-w-sm flex-col gap-6">
				<Field>
					<FieldLabel>Appointment date</FieldLabel>
					<DatePicker name="appointment-date" locale="en-GB" defaultMonth="2026-06" />
				</Field>
				<Field>
					<FieldLabel>Appointment time</FieldLabel>
					<TimeInput name="appointment-time" defaultValue="09:00" locale="en-GB" />
				</Field>
			</div>
		</Gallery>
	),
}
