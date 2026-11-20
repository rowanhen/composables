import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { SegmentedControl } from '@leitware/composables'

const meta = { title: 'Components/Segmented Control' } satisfies Meta
export default meta

function ReportPeriod() {
	const [period, setPeriod] = useState<string | null>('week')

	return (
		<div className="flex flex-col items-start gap-2">
			<SegmentedControl
				aria-label="Report period"
				value={period}
				onValueChange={setPeriod}
				items={[
					{ label: 'Week', value: 'week' },
					{ label: 'Month', value: 'month', disabled: true },
					{ label: 'Year', value: 'year' },
				]}
			/>
			<output>{period === 'year' ? 'Annual report' : 'Weekly report'}</output>
		</div>
	)
}

export const Overview: StoryObj<typeof meta> = {
	name: 'Segmented Control',
	render: () => <ReportPeriod />,
}
