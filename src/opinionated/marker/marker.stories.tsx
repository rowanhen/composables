import { CheckCircleIcon, ClockIcon, InfoIcon } from 'lucide-react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery, Group } from '../../_storybook/gallery'
import { Marker, MarkerContent, MarkerIcon } from './marker'

const meta = {
	title: 'Components/Marker',
	component: Marker,
} satisfies Meta<typeof Marker>

export default meta
type Story = StoryObj<typeof meta>

export const Variants: Story = {
	name: 'Marker',
	render: () => (
		<Gallery>
			<Group label="Variants">
				<div className="flex flex-col gap-3">
					<Marker>
						<MarkerIcon>
							<InfoIcon />
						</MarkerIcon>
						<MarkerContent>Draft saved locally</MarkerContent>
					</Marker>
					<Marker variant="separator">
						<MarkerIcon>
							<ClockIcon />
						</MarkerIcon>
						<MarkerContent>Today</MarkerContent>
					</Marker>
					<Marker variant="border">
						<MarkerIcon>
							<CheckCircleIcon />
						</MarkerIcon>
						<MarkerContent>Ready to publish</MarkerContent>
					</Marker>
				</div>
			</Group>
		</Gallery>
	),
}
