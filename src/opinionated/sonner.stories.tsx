import { Loader2Icon } from 'lucide-react'
import { toast } from 'sonner'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery, Group } from '../_storybook/gallery'
import { Button } from '../_internal/button'
import { Toaster } from '../_internal/sonner'
import { HStack, VStack } from '../_internal/stack'

const meta = {
	title: 'Overlays/Toast',
	decorators: [
		(Story) => (
			<>
				<Toaster />
				<Story />
			</>
		),
	],
	parameters: {
		docs: {
			description: { component: 'Transient notifications and feedback.' },
		},
	},
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Variants: Story = {
	render: () => (
		<Gallery>
			<Group label="Variants">
				<HStack gap={2} wrap>
					<Button
						variant="outline"
						onClick={() =>
							toast('Default Toast', {
								description: 'This is a default notification.',
							})
						}
					>
						Default
					</Button>
					<Button
						variant="outline"
						onClick={() =>
							toast.success('Success', {
								description: 'The operation completed successfully.',
							})
						}
					>
						Success
					</Button>
					<Button
						variant="outline"
						onClick={() =>
							toast.error('Error', {
								description: 'Something went wrong. Please try again.',
							})
						}
					>
						Error
					</Button>
					<Button
						variant="outline"
						onClick={() =>
							toast.warning('Warning', {
								description: 'This action may have unintended consequences.',
							})
						}
					>
						Warning
					</Button>
					<Button
						variant="outline"
						onClick={() =>
							toast.info('Info', {
								description: 'Helpful context or additional information.',
							})
						}
					>
						Info
					</Button>
				</HStack>
			</Group>
		</Gallery>
	),
}

export const WithActions: Story = {
	name: 'With actions',
	render: () => (
		<Gallery>
			<Group label="With actions">
				<HStack gap={2} wrap>
					<Button
						variant="outline"
						onClick={() =>
							toast('File deleted', {
								description: 'The file has been moved to trash.',
								action: {
									label: 'Undo',
									onClick: () => toast.success('Restored'),
								},
							})
						}
					>
						With action
					</Button>
					<Button
						variant="outline"
						onClick={() =>
							toast.error('Upload failed', {
								description: 'Could not upload the file.',
								action: {
									label: 'Retry',
									onClick: () => toast.success('Retrying...'),
								},
							})
						}
					>
						Error with action
					</Button>
				</HStack>
			</Group>
		</Gallery>
	),
}

export const Promise: Story = {
	render: () => (
		<Gallery>
			<Group label="Promise">
				<Button
					variant="outline"
					onClick={() => {
						const id = toast('Loading', {
							icon: <Loader2Icon className="size-4 animate-spin text-muted-foreground" />,
						})
						setTimeout(() => {
							toast.success('Operation complete', { id, icon: undefined })
						}, 2000)
					}}
				>
					Promise toast
				</Button>
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
