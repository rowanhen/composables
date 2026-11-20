import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery, Group, Placeholder } from '../_storybook/gallery'
import { ScrollArea } from './scroll-area'
import { Separator } from '../components/keyframery/separator'

const meta = {
	title: 'Utilities/Scroll area',
	component: ScrollArea,
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

export const Vertical: Story = {
	render: () => (
		<Gallery>
			<Group label="Vertical">
				<ScrollArea className="h-48 w-64 rounded-md border border-stroke">
					<div className="p-4">
						{Array.from({ length: 20 }, (_, i) => (
							<div key={i}>
								<p className="text-sm py-1">Item {i + 1}</p>
								{i < 19 && <Separator />}
							</div>
						))}
					</div>
				</ScrollArea>
			</Group>
		</Gallery>
	),
}

export const Horizontal: Story = {
	render: () => (
		<Gallery>
			<Group label="Horizontal">
				<ScrollArea showHorizontal className="w-64 rounded-md border border-stroke">
					<div className="flex gap-4 p-4">
						{Array.from({ length: 10 }, (_, i) => (
							<Placeholder key={i} className="h-20 w-32 shrink-0 rounded-md">
								<p className="text-sm">Card {i + 1}</p>
							</Placeholder>
						))}
					</div>
				</ScrollArea>
			</Group>
		</Gallery>
	),
}
