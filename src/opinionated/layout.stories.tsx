import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery, Group } from '../_storybook/gallery'
import { Button } from '../_internal/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../_internal/card'
import { Grid } from '../_internal/grid'
import { Skeleton } from '../_internal/skeleton'

const meta = {
	title: 'Layout/Responsive grid',
	parameters: {
		docs: {
			description: { component: 'Auto-fitting grid patterns for repeated content.' },
		},
	},
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const CardGrid123Cols: Story = {
	name: 'Card grid (1 → 2 → 3 cols)',
	render: () => (
		<Gallery>
			<Group label="Card grid (1 → 2 → 3 cols)">
				<Grid columns={1} gap={6} className="sm:grid-cols-2 lg:grid-cols-3">
					{[
						['Policies', 'Manage insurance policies'],
						['Claims', 'Process and review claims'],
						['Customers', 'Customer database'],
						['Quotes', 'Generate new quotes'],
						['Payments', 'Payment processing'],
						['Reports', 'Analytics dashboard'],
					].map(([title, desc]) => (
						<Card key={title}>
							<CardHeader>
								<CardTitle>{title}</CardTitle>
								<CardDescription>{desc}</CardDescription>
							</CardHeader>
							<CardContent>
								<Skeleton className="h-20 w-full" />
							</CardContent>
							<CardFooter>
								<Button variant="outline" size="sm">
									View
								</Button>
							</CardFooter>
						</Card>
					))}
				</Grid>
			</Group>
		</Gallery>
	),
}
