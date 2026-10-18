import {
	AlertCircleIcon,
	HeartIcon,
	LoaderIcon,
	MailIcon,
	SearchIcon,
	SettingsIcon,
	StarIcon,
} from 'lucide-react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery, Group } from '../_storybook/gallery'
import { Badge } from '../_internal/badge'
import { Button } from '../_internal/button'
import { Icon } from '../_internal/icon'
import { HStack, VStack } from '../_internal/stack'
import { Typography } from '../_internal/typography'

const meta = {
	title: 'Actions/Icon',
	component: Icon,
	args: { children: <StarIcon /> },
	parameters: {
		docs: {
			description: { component: 'Tokenized icon sizing and color treatments.' },
		},
	},
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Sizes: Story = {
	render: () => (
		<Gallery>
			<Group label="Sizes">
				<HStack gap={4} align="center">
					{(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
						<VStack key={size} gap={1} align="center">
							<Icon size={size}>
								<StarIcon />
							</Icon>
							<Typography variant="caption-100">{size}</Typography>
						</VStack>
					))}
				</HStack>
			</Group>
		</Gallery>
	),
}

export const SpinAnimation: Story = {
	name: 'Spin animation',
	render: () => (
		<Gallery>
			<Group label="Spin animation">
				<HStack gap={4} align="center">
					<Icon spin>
						<LoaderIcon />
					</Icon>
					<Icon size="lg" spin>
						<SettingsIcon />
					</Icon>
					<Icon size="xl" spin>
						<LoaderIcon />
					</Icon>
				</HStack>
			</Group>
		</Gallery>
	),
}

export const ColourInheritance: Story = {
	name: 'Colour inheritance',
	render: () => (
		<Gallery>
			<Group label="Colour inheritance">
				<HStack gap={4} align="center">
					<span className="text-foreground">
						<Icon size="lg">
							<HeartIcon />
						</Icon>
					</span>
					<span className="text-critical">
						<Icon size="lg">
							<AlertCircleIcon />
						</Icon>
					</span>
					<span className="text-muted-foreground">
						<Icon size="lg">
							<SearchIcon />
						</Icon>
					</span>
					<span className="text-primary">
						<Icon size="lg">
							<MailIcon />
						</Icon>
					</span>
				</HStack>
			</Group>
		</Gallery>
	),
}

export const InsideButton: Story = {
	name: 'Inside Button',
	render: () => (
		<Gallery>
			<Group label="Inside Button">
				<HStack gap={3} align="center">
					<Button size="sm">
						<Icon size="sm">
							<MailIcon />
						</Icon>
						Send
					</Button>
					<Button variant="outline">
						<Icon>
							<SearchIcon />
						</Icon>
						Search
					</Button>
					<Button size="lg" variant="secondary">
						<Icon size="lg">
							<SettingsIcon />
						</Icon>
						Settings
					</Button>
				</HStack>
			</Group>
		</Gallery>
	),
}

export const InsideBadge: Story = {
	name: 'Inside Badge',
	render: () => (
		<Gallery>
			<Group label="Inside Badge">
				<HStack gap={3} align="center">
					<Badge variant="default">
						<Icon size="xs">
							<StarIcon />
						</Icon>
						Featured
					</Badge>
					<Badge variant="destructive">
						<Icon size="xs">
							<AlertCircleIcon />
						</Icon>
						Error
					</Badge>
					<Badge variant="success">
						<Icon size="xs">
							<HeartIcon />
						</Icon>
						Healthy
					</Badge>
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
