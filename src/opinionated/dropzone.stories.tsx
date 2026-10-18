import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery, Group } from '../_storybook/gallery'
import {
	ACCEPT_PRESETS,
	DropZone,
	DropZoneArea,
	DropZoneContent,
	DropZoneFile,
	DropZoneInput,
} from '../_internal/dropzone'
import { VStack } from '../_internal/stack'

const meta = {
	title: 'Forms/Dropzone',
	parameters: {
		docs: {
			description: { component: 'File upload drop targets and selected file states.' },
		},
	},
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function DropzoneDemo() {
	const [file, setFile] = React.useState<File | null>(null)

	return (
		<Gallery title="Dropzone" description="File upload area with drag-and-drop support.">
			<VStack gap={6} className="max-w-md">
				<Group label="Default">
					<DropZone
						onDrop={(accepted) => {
							if (accepted.length > 0) setFile(accepted[0])
						}}
						accept={{
							...ACCEPT_PRESETS.PDF,
							...ACCEPT_PRESETS.IMAGES,
						}}
						hasFiles={!!file}
					>
						<DropZoneArea>
							<DropZoneInput />
							{file ? (
								<DropZoneFile file={file} onRemove={() => setFile(null)} />
							) : (
								<DropZoneContent title="Upload a file" />
							)}
						</DropZoneArea>
					</DropZone>
				</Group>
				<Group label="Disabled">
					<DropZone onDrop={() => {}} disabled>
						<DropZoneArea>
							<DropZoneInput />
							<DropZoneContent title="Upload disabled" />
						</DropZoneArea>
					</DropZone>
				</Group>
			</VStack>
		</Gallery>
	)
}

export const Overview: Story = {
	render: () => <DropzoneDemo />,
}
