import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery, Group } from '../_storybook/gallery'
import { Calendar } from './calendar'
import { FormCalendarPopover } from './form-calendar-popover'
import { FormDateOfBirth } from './form-date-of-birth'

const meta = {
	title: 'Components/Calendar',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// Fixed so the visual baseline doesn't change monthly.
const REFERENCE_DATE = new Date('2026-06-15T00:00:00Z')
const DAY_MS = 24 * 60 * 60 * 1000

function CalendarDemo() {
	const [date, setDate] = React.useState<Date | undefined>(undefined)
	const [dateWithLimits, setDateWithLimits] = React.useState<Date | undefined>(undefined)

	return (
		<Gallery
			title="Calendar & Date Pickers"
			description="Calendar primitive and opinionated date picker components."
		>
			<div className="flex flex-col gap-8">
				<Group label="Calendar Popover">
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-lg">
						<FormCalendarPopover
							label="Select a date"
							placeholder="Pick a date"
							value={date}
							onChange={setDate}
						/>
						<FormCalendarPopover
							label="With constraints"
							description="Min: reference date, Max: 30 days later"
							placeholder="Pick a date"
							value={dateWithLimits}
							onChange={setDateWithLimits}
							minDate={REFERENCE_DATE}
							maxDate={new Date(REFERENCE_DATE.getTime() + 30 * DAY_MS)}
						/>
					</div>
				</Group>
				<Group label="Date of Birth">
					<div className="max-w-xs">
						<FormDateOfBirth label="Date of birth" description="Enter in DD/MM/YYYY format" />
					</div>
				</Group>
				<Group label="Raw Calendar">
					<div className="flex gap-6 flex-wrap">
						<Calendar defaultMonth="2026-06" today="2026-06-15" />
					</div>
				</Group>
			</div>
		</Gallery>
	)
}

export const Overview: Story = {
	name: 'Calendar',
	render: () => <CalendarDemo />,
}
