import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card, Carousel, Typography, type CarouselProps } from '@leitware/composables'

const meta = { title: 'Components/Carousel' } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

const notes = [
	{
		title: 'The old bothy',
		description: 'A dry place to stop on the way into the valley.',
		alt: 'Stone cottage among golden heather below slate-grey peaks',
	},
	{
		title: 'Mist on the loch',
		description: 'The far bank appeared just as the wind dropped.',
		alt: 'Low mist drifting above a dark loch and a distant line of trees',
	},
	{
		title: 'The ridge trail',
		description: 'A narrow path through the bracken, heading north.',
		alt: 'Pale trail winding through autumn ferns toward a mountain ridge',
	},
	{
		title: 'The river crossing',
		description: 'The last bridge before the road back.',
		alt: 'Old timber footbridge spanning white water and autumn birches',
	},
] as const

function Photo({ index }: { index: number }) {
	return (
		<div className="relative aspect-[3/2] overflow-hidden bg-surface-accent">
			<img
				src="./images/highland-field-notes.jpg"
				alt={notes[index].alt}
				width={1536}
				height={1024}
				draggable={false}
				className="pointer-events-none absolute h-[200%] w-[200%] max-w-none select-none"
				style={{ top: index >= 2 ? '-100%' : 0, left: index % 2 === 1 ? '-100%' : 0 }}
			/>
		</div>
	)
}

function FieldNotes({
	title,
	description,
	rail = false,
	...props
}: CarouselProps & { title: string; description: string; rail?: boolean }) {
	return (
		<section className="mx-auto grid w-full max-w-[42rem] gap-4">
			<header className="grid gap-1">
				<Typography variant="heading-300" as="h2">
					{title}
				</Typography>
				<Typography variant="body-100" className="text-content-muted">
					{description}
				</Typography>
			</header>
			<Carousel
				aria-label={title}
				showNavigation
				showIndicators
				items={notes.map((note, index) => (
					<Card
						key={note.title}
						render={<figure />}
						className={
							rail
								? 'grid h-full grid-cols-[minmax(0,1fr)_minmax(0,2fr)] items-center gap-0 overflow-hidden py-0'
								: 'gap-0 overflow-hidden py-0'
						}
					>
						<Photo index={index} />
						<figcaption className="grid gap-1 p-3">
							<Typography variant="heading-100">{note.title}</Typography>
							<Typography variant="caption-100" as="p">
								{note.description}
							</Typography>
						</figcaption>
					</Card>
				))}
				{...props}
			/>
		</section>
	)
}

export const Basic: Story = {
	name: 'Photo journal',
	render: () => (
		<FieldNotes
			title="Highland field notes"
			description="Four stops on a wet October weekend."
			showPlayToggle
			loop
			interval={4500}
		/>
	),
}

export const MultipleItems: Story = {
	name: 'Two per page',
	render: () => (
		<FieldNotes
			title="Highland contact sheet"
			description="Browse the route two photographs at a time."
			align="start"
			slidesPerPage={2}
		/>
	),
}

export const Vertical: Story = {
	name: 'Vertical itinerary',
	render: () => (
		<FieldNotes
			title="Along the route"
			description="Scroll the itinerary or use the up and down controls."
			align="start"
			orientation="vertical"
			viewportClassName="h-72"
			slidesPerPage={2}
			rail
		/>
	),
}
