import {
	AlignCenterIcon,
	AlignLeftIcon,
	AlignRightIcon,
	BoldIcon,
	ItalicIcon,
	UnderlineIcon,
} from 'lucide-react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery, Group } from '../_storybook/gallery'
import { ToggleGroup, ToggleGroupItem } from './toggle-group'
import { HStack, VStack } from '../_internal/stack'

const meta = {
	title: 'Forms/Toggle group',
	parameters: {
		docs: {
			description: { component: 'Single and multiple selection toggle groups.' },
		},
	},
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const SingleValue: Story = {
	name: 'Single value',
	render: () => (
		<Gallery>
			<Group label="Single value">
				<ToggleGroup
					defaultValue="left"
					variant="outline"
					options={[
						{ value: 'left', label: 'Left', icon: <AlignLeftIcon /> },
						{ value: 'center', label: 'Center', icon: <AlignCenterIcon /> },
						{ value: 'right', label: 'Right', icon: <AlignRightIcon /> },
					]}
				/>
			</Group>
		</Gallery>
	),
}

export const MultipleValues: Story = {
	name: 'Multiple values',
	render: () => (
		<Gallery>
			<Group label="Multiple values">
				<ToggleGroup defaultValue={['bold']} multiple variant="outline">
					<ToggleGroupItem value="bold" aria-label="Bold">
						<BoldIcon />
					</ToggleGroupItem>
					<ToggleGroupItem value="italic" aria-label="Italic">
						<ItalicIcon />
					</ToggleGroupItem>
					<ToggleGroupItem value="underline" aria-label="Underline">
						<UnderlineIcon />
					</ToggleGroupItem>
				</ToggleGroup>
			</Group>
		</Gallery>
	),
}

export const Spacing: Story = {
	render: () => (
		<Gallery>
			<Group label="Spacing">
				<HStack gap={4} wrap>
					<ToggleGroup defaultValue="left" variant="outline" spacing="sm">
						<ToggleGroupItem value="left">Left</ToggleGroupItem>
						<ToggleGroupItem value="center">Center</ToggleGroupItem>
						<ToggleGroupItem value="right">Right</ToggleGroupItem>
					</ToggleGroup>
					<ToggleGroup defaultValue="top" orientation="vertical" variant="outline">
						<ToggleGroupItem value="top">Top</ToggleGroupItem>
						<ToggleGroupItem value="middle">Middle</ToggleGroupItem>
						<ToggleGroupItem value="bottom">Bottom</ToggleGroupItem>
					</ToggleGroup>
				</HStack>
			</Group>
		</Gallery>
	),
}

export const More: Story = {
	render: () => (
		<Gallery>
			<VStack gap={4}></VStack>
		</Gallery>
	),
}
