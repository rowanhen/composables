import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery } from '../_storybook/gallery'
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
import { HStack } from '../_internal/stack'
import { Typography } from '../_internal/typography'

const meta = {
	title: 'Content/Card',
	component: Card,
	parameters: {
		docs: {
			description: {
				component: 'Framed content blocks with consistent padding, borders, and hierarchy.',
			},
		},
	},
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
	render: () => (
		<Gallery>
			<Grid columns={1} gap={6} className="sm:grid-cols-2 lg:grid-cols-3">
				<Card>
					<CardHeader>
						<CardTitle>Default Card</CardTitle>
						<CardDescription>Standard card with all slots</CardDescription>
					</CardHeader>
					<CardContent>
						<Typography variant="body-100">Card body content goes here.</Typography>
					</CardContent>
					<CardFooter>
						<HStack gap={2}>
							<Button size="sm">Save</Button>
							<Button size="sm" variant="outline">
								Cancel
							</Button>
						</HStack>
					</CardFooter>
				</Card>
				<Card size="sm">
					<CardHeader>
						<CardTitle>Compact Card</CardTitle>
						<CardDescription>size="sm" for tighter spacing</CardDescription>
					</CardHeader>
					<CardContent>
						<Typography variant="body-100">Compact variant for dense UIs.</Typography>
					</CardContent>
				</Card>
				<Card className="border-stroke-brand">
					<CardHeader>
						<CardTitle>Branded Card</CardTitle>
						<CardDescription>Using brand border token</CardDescription>
					</CardHeader>
					<CardContent>
						<Typography variant="body-100">Custom border via semantic token.</Typography>
					</CardContent>
				</Card>
			</Grid>
		</Gallery>
	),
}

export const Promo: Story = {
	name: 'Promo (composition)',
	render: () => (
		<Gallery>
			<Card className="max-w-xl flex-row items-center gap-(--card-space) px-(--card-space)">
				<div
					className="bg-surface-brand size-20 shrink-0 rounded-(--card-radius)"
					aria-hidden="true"
				/>
				<div className="flex flex-1 flex-col gap-(--card-space)">
					<CardHeader className="px-0">
						<CardTitle>Add breakdown cover</CardTitle>
						<CardDescription>Roadside help from £4.99 a month.</CardDescription>
					</CardHeader>
					<HStack gap={2}>
						<Button size="sm" variant="secondary">
							Add cover
						</Button>
						<Button size="sm" variant="neutral">
							Not now
						</Button>
					</HStack>
				</div>
			</Card>
			<Card variant="raised" className="max-w-xl">
				<CardHeader>
					<CardTitle>Raised card</CardTitle>
					<CardDescription>Sits on the popover surface (white).</CardDescription>
				</CardHeader>
			</Card>
		</Gallery>
	),
}
