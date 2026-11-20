import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { ACCEPT_PRESETS, DropZone, FileInput, FileInputTrigger } from '@leitware/composables'
import { Gallery, Group } from '../../_storybook/gallery'

const meta = { title: 'Components/File Input' } satisfies Meta
export default meta

function AttachmentPicker() {
	const [file, setFile] = useState<File>()

	return (
		<div className="flex items-center gap-3">
			<FileInput aria-label="Attachments" onValueChange={([next]) => setFile(next)}>
				<FileInputTrigger>Choose attachment</FileInputTrigger>
			</FileInput>
			{file && <output>{file.name}</output>}
		</div>
	)
}

export const Overview: StoryObj<typeof meta> = {
	name: 'File Input',
	render: () => (
		<Gallery>
			<Group label="File picker">
				<AttachmentPicker />
			</Group>
			<Group label="PDF and images">
				<DropZone accept={[ACCEPT_PRESETS.PDF, ACCEPT_PRESETS.IMAGES].join(',')} />
			</Group>
			<Group label="Multiple files">
				<DropZone multiple maxFiles={3} />
			</Group>
			<Group label="Disabled">
				<DropZone disabled />
			</Group>
		</Gallery>
	),
}
