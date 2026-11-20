import type { Meta, StoryObj } from '@storybook/react-vite'
import { BanknoteIcon, CircleHelpIcon, UsersIcon } from 'lucide-react'
import { Stat, StatGroup } from './stat'

const meta = { title: 'Components/Stat', component: Stat } satisfies Meta<typeof Stat>
export default meta
type Story = StoryObj<typeof meta>

const currency = new Intl.NumberFormat('en-GB', {
	style: 'currency',
	currency: 'GBP',
	maximumFractionDigits: 0,
})

export const Overview: Story = {
	name: 'Stat',
	args: { label: 'Revenue' },
	render: () => (
		<StatGroup aria-label="Monthly performance" className="mx-auto max-w-4xl">
			<Stat
				label="Revenue"
				value={24610}
				formatValue={(value) => currency.format(value)}
				delta={0.126}
				comparison="vs last month"
				icon={<BanknoteIcon />}
			/>
			<Stat
				label="Active customers"
				value={1482}
				delta={0}
				comparison="vs last month"
				icon={<UsersIcon />}
			/>
			<Stat
				label="Support requests"
				value={96}
				delta={-0.083}
				downIsGood
				comparison="vs last month"
				icon={<CircleHelpIcon />}
			/>
			<Stat label="Trial conversions" value={54} delta={-0.071} comparison="vs last month" />
		</StatGroup>
	),
}
