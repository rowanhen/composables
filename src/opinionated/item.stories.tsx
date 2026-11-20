import { FileTextIcon, MoreHorizontalIcon, SettingsIcon, UserIcon } from 'lucide-react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery, Group } from '../_storybook/gallery'
import { Badge } from './badge'
import { Button } from './button'
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemMedia,
	ItemTitle,
} from '../components/keyframery/item'

const meta = {
	title: 'Components/Item',
	component: Item,
} satisfies Meta<typeof Item>

export default meta
type Story = StoryObj<typeof meta>

export const Variants: Story = {
	render: () => (
		<Gallery>
			<Group label="Variants">
				<ItemGroup>
					<Item variant="default">
						<ItemMedia variant="icon">
							<FileTextIcon />
						</ItemMedia>
						<ItemContent>
							<ItemTitle>Default item</ItemTitle>
							<ItemDescription>No visible border by default</ItemDescription>
						</ItemContent>
						<ItemActions>
							<Badge variant="success">Active</Badge>
						</ItemActions>
					</Item>
					<Item variant="outline">
						<ItemMedia variant="icon">
							<UserIcon />
						</ItemMedia>
						<ItemContent>
							<ItemTitle>Outline item</ItemTitle>
							<ItemDescription>Bordered variant for separation</ItemDescription>
						</ItemContent>
						<ItemActions>
							<Button variant="ghost" size="icon-sm" aria-label="More actions">
								<MoreHorizontalIcon />
							</Button>
						</ItemActions>
					</Item>
					<Item variant="muted">
						<ItemMedia variant="icon">
							<SettingsIcon />
						</ItemMedia>
						<ItemContent>
							<ItemTitle>Muted item</ItemTitle>
							<ItemDescription>Subtle background for grouping</ItemDescription>
						</ItemContent>
					</Item>
				</ItemGroup>
			</Group>
		</Gallery>
	),
}

export const Sizes: Story = {
	render: () => (
		<Gallery>
			<Group label="Sizes">
				<ItemGroup>
					<Item size="default" variant="outline">
						<ItemMedia variant="icon">
							<FileTextIcon />
						</ItemMedia>
						<ItemContent>
							<ItemTitle>Default size</ItemTitle>
							<ItemDescription>Standard padding and spacing</ItemDescription>
						</ItemContent>
					</Item>
					<Item size="sm" variant="outline">
						<ItemMedia variant="icon">
							<FileTextIcon />
						</ItemMedia>
						<ItemContent>
							<ItemTitle>Small size</ItemTitle>
							<ItemDescription>Compact layout</ItemDescription>
						</ItemContent>
					</Item>
					<Item variant="outline">
						<ItemMedia variant="icon">
							<FileTextIcon />
						</ItemMedia>
						<ItemContent>
							<ItemTitle>Compact row</ItemTitle>
							<ItemDescription>Minimal padding</ItemDescription>
						</ItemContent>
					</Item>
				</ItemGroup>
			</Group>
		</Gallery>
	),
}
