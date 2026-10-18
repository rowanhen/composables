import {
	AlertTriangleIcon,
	CheckCircleIcon,
	DownloadIcon,
	InfoIcon,
	MailIcon,
	PlusIcon,
	TrashIcon,
} from 'lucide-react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery, Group } from '../_storybook/gallery'
import { Button } from '../_internal/button'
import { HStack, VStack } from '../_internal/stack'

const meta = {
	title: 'Actions/Button',
	component: Button,
	args: { children: 'Button' },
	parameters: {
		docs: {
			description: {
				component: 'Command controls, variants, sizes, loading states, and icon layouts.',
			},
		},
	},
	argTypes: {
		variant: {
			control: 'select',
			options: [
				'default',
				'secondary',
				'outline',
				'neutral',
				'inverse',
				'ghost',
				'destructive',
				'success',
				'warning',
				'info',
				'brand',
				'brand-2',
				'brand-3',
				'brand-4',
				'brand-5',
				'emphasis',
				'link',
			],
		},
		size: {
			control: 'select',
			options: ['xs', 'sm', 'default', 'lg', 'icon-xs', 'icon-sm', 'icon', 'icon-lg'],
		},
		shape: { control: 'inline-radio', options: ['default', 'pill'] },
		disabled: { control: 'boolean' },
	},
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
	render: () => (
		<Gallery>
			<Group label="Variants">
				<HStack gap={3} wrap align="center">
					<Button variant="default">Default</Button>
					<Button variant="secondary">Secondary</Button>
					<Button variant="outline">Outline</Button>
					<Button variant="neutral">Neutral</Button>
					<Button variant="inverse">Inverse</Button>
					<Button variant="ghost">Ghost</Button>
					<Button variant="destructive">Destructive</Button>
					<Button variant="success">Success</Button>
					<Button variant="warning">Warning</Button>
					<Button variant="info">Info</Button>
					<Button variant="brand">Brand</Button>
					<Button variant="brand-2">Brand 2</Button>
					<Button variant="brand-3">Brand 3</Button>
					<Button variant="brand-4">Brand 4</Button>
					<Button variant="brand-5">Brand 5</Button>
					<Button variant="emphasis">Emphasis</Button>
					<Button variant="link">Link</Button>
				</HStack>
			</Group>
		</Gallery>
	),
}

export const Sizes: Story = {
	render: () => (
		<Gallery>
			<Group label="Sizes">
				<HStack gap={3} wrap align="center">
					<Button size="xs">Extra Small</Button>
					<Button size="sm">Small</Button>
					<Button size="default">Default</Button>
					<Button size="lg">Large</Button>
				</HStack>
			</Group>
		</Gallery>
	),
}

export const Shape: Story = {
	render: () => (
		<Gallery>
			<Group label="Shape">
				<HStack gap={3} wrap align="center">
					<Button shape="pill">Pill</Button>
					<Button variant="secondary" shape="pill">
						Pill secondary
					</Button>
					<Button variant="outline" shape="pill">
						Pill outline
					</Button>
					<Button size="icon" shape="pill">
						<PlusIcon />
					</Button>
					<Button size="icon-lg" shape="pill" variant="secondary">
						<PlusIcon />
					</Button>
				</HStack>
			</Group>
		</Gallery>
	),
}

export const IconSizes: Story = {
	name: 'Icon sizes',
	render: () => (
		<Gallery>
			<Group label="Icon sizes">
				<HStack gap={3} wrap align="center">
					<Button size="icon-xs">
						<PlusIcon />
					</Button>
					<Button size="icon-sm">
						<PlusIcon />
					</Button>
					<Button size="icon">
						<PlusIcon />
					</Button>
					<Button size="icon-lg">
						<PlusIcon />
					</Button>
				</HStack>
			</Group>
		</Gallery>
	),
}

export const WithIcons: Story = {
	name: 'With icons',
	render: () => (
		<Gallery>
			<Group label="With icons">
				<HStack gap={3} wrap align="center">
					<Button>
						<MailIcon data-icon="inline-start" />
						Send Email
					</Button>
					<Button variant="outline">
						<DownloadIcon data-icon="inline-start" />
						Download
					</Button>
					<Button variant="destructive">
						<TrashIcon data-icon="inline-start" />
						Delete
					</Button>
					<Button variant="success">
						<CheckCircleIcon data-icon="inline-start" />
						Approve
					</Button>
					<Button variant="warning">
						<AlertTriangleIcon data-icon="inline-start" />
						Caution
					</Button>
					<Button variant="info">
						<InfoIcon data-icon="inline-start" />
						Details
					</Button>
				</HStack>
			</Group>
		</Gallery>
	),
}

export const Disabled: Story = {
	render: () => (
		<Gallery>
			<Group label="Disabled">
				<HStack gap={3} wrap align="center">
					<Button disabled>Disabled</Button>
					<Button variant="outline" disabled>
						Disabled Outline
					</Button>
					<Button variant="destructive" disabled>
						Disabled Destructive
					</Button>
				</HStack>
			</Group>
		</Gallery>
	),
}

export const More: Story = {
	render: () => (
		<Gallery>
			<VStack gap={6}></VStack>
		</Gallery>
	),
}
