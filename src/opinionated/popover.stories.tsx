import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery } from '../_storybook/gallery'
import { Button } from '../_internal/button'
import { Grid } from '../_internal/grid'
import { Input } from '../_internal/input'
import { Label } from '../_internal/label'
import {
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
} from '../_internal/popover'
import { VStack } from '../_internal/stack'

const meta = {
	title: 'Overlays/Popover',
	parameters: {
		docs: {
			description: { component: 'Anchored floating content and lightweight panels.' },
		},
	},
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
	render: () => (
		<Gallery>
			<Popover>
				<PopoverTrigger render={<Button variant="outline" />}>Open Popover</PopoverTrigger>
				<PopoverContent>
					<PopoverHeader>
						<PopoverTitle>Dimensions</PopoverTitle>
						<PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
					</PopoverHeader>
					<Grid columns={2} gap={3}>
						<VStack gap={1}>
							<Label>Width</Label>
							<Input defaultValue="100%" />
						</VStack>
						<VStack gap={1}>
							<Label>Height</Label>
							<Input defaultValue="auto" />
						</VStack>
					</Grid>
				</PopoverContent>
			</Popover>
		</Gallery>
	),
}
