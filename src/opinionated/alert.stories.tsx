import { AlertCircleIcon, AlertTriangleIcon, CheckCircleIcon, InfoIcon } from 'lucide-react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery, Group } from '../_storybook/gallery'
import { Alert, AlertDescription, AlertTitle } from '../_internal/alert'
import { VStack } from '../_internal/stack'

const meta = {
	title: 'Content/Alert',
	component: Alert,
	parameters: {
		docs: {
			description: { component: 'Status messaging with semantic tone support.' },
		},
	},
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Variants: Story = {
	render: () => (
		<Gallery>
			<Group label="Variants">
				<Alert>
					<AlertTitle>Default Alert</AlertTitle>
					<AlertDescription>Informational message with default styling.</AlertDescription>
				</Alert>
				<Alert variant="info">
					<InfoIcon />
					<AlertTitle>Info Alert</AlertTitle>
					<AlertDescription>
						Helpful context or additional information for the user.
					</AlertDescription>
				</Alert>
				<Alert variant="success">
					<CheckCircleIcon />
					<AlertTitle>Success Alert</AlertTitle>
					<AlertDescription>The operation completed successfully.</AlertDescription>
				</Alert>
				<Alert variant="warning">
					<AlertTriangleIcon />
					<AlertTitle>Warning Alert</AlertTitle>
					<AlertDescription>This action may have unintended consequences.</AlertDescription>
				</Alert>
				<Alert variant="destructive">
					<AlertCircleIcon />
					<AlertTitle>Destructive Alert</AlertTitle>
					<AlertDescription>Something went wrong. Please try again.</AlertDescription>
				</Alert>
				<Alert variant="brand">
					<AlertTitle>Brand Alert</AlertTitle>
					<AlertDescription>Primary brand identity messaging.</AlertDescription>
				</Alert>
				<Alert variant="brand-2">
					<AlertTitle>Brand 2 Alert</AlertTitle>
					<AlertDescription>Secondary brand identity messaging.</AlertDescription>
				</Alert>
				<Alert variant="brand-3">
					<AlertTitle>Brand 3 Alert</AlertTitle>
					<AlertDescription>Tertiary brand identity messaging.</AlertDescription>
				</Alert>
				<Alert variant="brand-4">
					<AlertTitle>Brand 4 Alert</AlertTitle>
					<AlertDescription>Fourth brand identity messaging.</AlertDescription>
				</Alert>
				<Alert variant="brand-5">
					<AlertTitle>Brand 5 Alert</AlertTitle>
					<AlertDescription>Fifth brand identity messaging.</AlertDescription>
				</Alert>
			</Group>
		</Gallery>
	),
}

export const WithoutIcons: Story = {
	name: 'Without icons',
	render: () => (
		<Gallery>
			<Group label="Without icons">
				<Alert variant="info">
					<AlertTitle>Info</AlertTitle>
					<AlertDescription>Alerts work without icons too.</AlertDescription>
				</Alert>
				<Alert variant="success">
					<AlertTitle>Success</AlertTitle>
					<AlertDescription>Clean and minimal success message.</AlertDescription>
				</Alert>
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
