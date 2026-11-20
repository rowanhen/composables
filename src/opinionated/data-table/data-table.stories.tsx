import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from '../badge/badge'
import { DataTable, type DataTableColumn } from './data-table'

const meta = { title: 'Components/Data table' } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

type Invoice = {
	id: string
	customer: string
	status: 'paid' | 'draft'
	total: number
}

const invoices: Invoice[] = [
	{ id: 'INV-1001', customer: 'North Studio', status: 'paid', total: 420 },
	{ id: 'INV-1002', customer: 'Morrow Books', status: 'draft', total: 275 },
	{ id: 'INV-1003', customer: 'Hearth & Field', status: 'paid', total: 810 },
	{ id: 'INV-1004', customer: 'Common Ground', status: 'draft', total: 125 },
	{ id: 'INV-1005', customer: 'Lunar Goods', status: 'paid', total: 555 },
]

const currency = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' })

const columns: DataTableColumn<Invoice>[] = [
	{ id: 'customer', header: 'Customer', searchable: true, sticky: true },
	{
		id: 'status',
		header: 'Status',
		filter: {
			options: [
				{ value: 'paid', label: 'Paid' },
				{ value: 'draft', label: 'Draft' },
			],
		},
		cell: (row) => (
			<Badge variant={row.status === 'paid' ? 'success' : 'outline'}>
				{row.status === 'paid' ? 'Paid' : 'Draft'}
			</Badge>
		),
	},
	{
		id: 'total',
		header: 'Total',
		align: 'end',
		cell: (row) => currency.format(row.total),
	},
]

export const Invoices: Story = {
	name: 'Data table',
	render: () => (
		<DataTable
			className="mx-auto max-w-4xl"
			label="Invoices"
			data={invoices}
			columns={columns}
			searchPlaceholder="Find a customer"
			pageSizes={[3, 5]}
			defaultPageSize={3}
			selectable={false}
			emptyDescription="Try a different customer name or status."
		/>
	),
}
