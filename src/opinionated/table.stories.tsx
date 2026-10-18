import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery } from '../_storybook/gallery'
import { Badge } from '../_internal/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../_internal/table'

const meta = {
	title: 'Data/Table',
	parameters: {
		docs: {
			description: { component: 'Structured tabular content with opinionated spacing.' },
		},
	},
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function PolicyTable() {
	return (
		<div className="rounded-lg border border-stroke overflow-hidden">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Policy</TableHead>
						<TableHead>Customer</TableHead>
						<TableHead>Status</TableHead>
						<TableHead className="text-right">Premium</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{[
						['POL-001', 'Alice Smith', 'Active', '\u00A31,200'],
						['POL-002', 'Bob Jones', 'Pending', '\u00A3890'],
						['POL-003', 'Carol White', 'Active', '\u00A32,150'],
						['POL-004', 'David Brown', 'Expired', '\u00A3750'],
					].map(([policy, customer, status, premium]) => (
						<TableRow key={policy}>
							<TableCell className="font-medium">{policy}</TableCell>
							<TableCell>{customer}</TableCell>
							<TableCell>
								<Badge
									variant={
										status === 'Active' ? 'success' : status === 'Pending' ? 'warning' : 'secondary'
									}
								>
									{status}
								</Badge>
							</TableCell>
							<TableCell className="text-right">{premium}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}

export const Overview: Story = {
	render: () => (
		<Gallery>
			<PolicyTable />
		</Gallery>
	),
}
