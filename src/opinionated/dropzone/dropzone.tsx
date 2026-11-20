'use client'

import type { ComponentProps } from 'react'
import {
	FileInput,
	FileInputDropzone,
	FileInputDropzoneIcon,
	FileInputItem,
	FileInputItemRemove,
	FileInputList,
	FileInputTrigger,
	formatFileSize,
	type FileRejection,
} from '../../components/keyframery/file-input'

export type Accept = NonNullable<ComponentProps<typeof FileInput>['accept']>
export type DropZoneProps = Omit<ComponentProps<typeof FileInput>, 'children'> & {
	prompt?: string
}

export const DEFAULT_MAX_SIZE = 10 * 1024 * 1024
export const DEFAULT_ACCEPT = 'application/pdf,.pdf'
export const ACCEPT_PRESETS = {
	PDF: DEFAULT_ACCEPT,
	IMAGES: 'image/*',
	CSV: 'text/csv,.csv',
	EXCEL: '.xls,.xlsx',
	WORD: '.doc,.docx',
	DOCUMENTS: 'application/pdf,.pdf,.doc,.docx',
} as const

export function DropZone({ prompt = 'Drop files here or choose files', ...props }: DropZoneProps) {
	return (
		<FileInput {...props}>
			<FileInputDropzone>
				<FileInputDropzoneIcon />
				<p>{prompt}</p>
				<FileInputTrigger>Choose files</FileInputTrigger>
			</FileInputDropzone>
			<FileInputList>
				<FileInputItem>
					{({ file }) => (
						<>
							<span className="min-w-0 flex-1 truncate">{file.name}</span>
							<span className="text-muted-foreground">{formatFileSize(file.size)}</span>
							<FileInputItemRemove />
						</>
					)}
				</FileInputItem>
			</FileInputList>
		</FileInput>
	)
}

export { formatFileSize, type FileRejection }
