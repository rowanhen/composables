import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery } from '../../_storybook/gallery'
import { Button } from '../button/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../../components/keyframery/card'

const meta = {
	title: 'Components/Card',
	component: Card,
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
	render: () => (
		<Gallery>
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				<Card>
					<CardHeader>
						<CardTitle>Default Card</CardTitle>
						<CardDescription>Standard card with all slots</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-sm">Card body content goes here.</p>
					</CardContent>
					<CardFooter>
						<div className="flex gap-2">
							<Button variant="primary">Save</Button>
							<Button variant="ghost">Cancel</Button>
						</div>
					</CardFooter>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Compact Card</CardTitle>
						<CardDescription>Compact card layout</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-sm">Compact variant for dense UIs.</p>
					</CardContent>
				</Card>
				<Card className="border-stroke-brand">
					<CardHeader>
						<CardTitle>Branded Card</CardTitle>
						<CardDescription>Using brand border token</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-sm">Custom border via semantic token.</p>
					</CardContent>
				</Card>
			</div>
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
					<div className="flex gap-2">
						<Button variant="primary">Add cover</Button>
						<Button variant="ghost">Not now</Button>
					</div>
				</div>
			</Card>
			<Card interactive className="max-w-xl">
				<CardHeader>
					<CardTitle>Interactive card</CardTitle>
					<CardDescription>Lifts on hover and sinks while pressed.</CardDescription>
				</CardHeader>
			</Card>
		</Gallery>
	),
}
