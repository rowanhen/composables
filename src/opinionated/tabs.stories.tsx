import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery } from '../_storybook/gallery'
import { Card, CardContent } from '../_internal/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../_internal/tabs'
import { Typography } from '../_internal/typography'

const meta = {
	title: 'Navigation/Tabs',
	parameters: {
		docs: {
			description: { component: 'Tabbed content sections and navigation.' },
		},
	},
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
	render: () => (
		<Gallery>
			<Tabs defaultValue="overview">
				<TabsList>
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="analytics">Analytics</TabsTrigger>
					<TabsTrigger value="reports">Reports</TabsTrigger>
				</TabsList>
				<TabsContent value="overview" className="pt-4">
					<Card>
						<CardContent className="pt-4">
							<Typography variant="body-200">Overview content here.</Typography>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="analytics" className="pt-4">
					<Card>
						<CardContent className="pt-4">
							<Typography variant="body-200">Analytics content here.</Typography>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="reports" className="pt-4">
					<Card>
						<CardContent className="pt-4">
							<Typography variant="body-200">Reports content here.</Typography>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</Gallery>
	),
}

export const Segmented: Story = {
	render: () => (
		<Gallery>
			<Tabs defaultValue="monthly">
				<TabsList variant="segmented">
					<TabsTrigger value="monthly">Monthly</TabsTrigger>
					<TabsTrigger value="annually">Annually</TabsTrigger>
				</TabsList>
			</Tabs>
		</Gallery>
	),
}
