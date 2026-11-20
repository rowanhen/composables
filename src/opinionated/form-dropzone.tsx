'use client'

import type { ComponentProps, Ref } from 'react'
import { useState } from 'react'
import { DEFAULT_ACCEPT, DEFAULT_MAX_SIZE, DropZone, formatFileSize } from './dropzone'
import type { Accept } from './dropzone'
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldLabel,
	type FieldErrors,
	fieldErrors,
} from './field'

interface DropZoneFieldProps {
	ref?: Ref<HTMLDivElement>
	label?: string
	description?: string
	prompt?: string
	error?: FieldErrors
	maxSizeBytes?: number
	maxFiles?: number
	accept?: Accept
	disabled?: boolean
	required?: boolean
	orientation?: ComponentProps<typeof Field>['orientation']
	className?: string
	name?: string
}

export interface FormDropZoneProps extends Omit<DropZoneFieldProps, 'maxFiles'> {
	value: File | null
	onChange: (file: File | null) => void
}

export function FormDropZone({ value, onChange, ...props }: FormDropZoneProps) {
	return (
		<DropZoneField
			value={value ? [value] : []}
			onChange={(files) => onChange(files[0] ?? null)}
			{...props}
		/>
	)
}

export function DropZoneField({
	ref,
	value,
	onChange,
	label,
	description,
	prompt,
	error,
	maxSizeBytes = DEFAULT_MAX_SIZE,
	maxFiles,
	accept = DEFAULT_ACCEPT,
	disabled,
	required,
	orientation,
	className,
	name,
	multiple,
}: DropZoneFieldProps & {
	value: File[]
	onChange: (files: File[]) => void
	multiple?: boolean
}) {
	const [rejectionError, setRejectionError] = useState<string>()
	const errors = fieldErrors(error ?? rejectionError)
	const invalid = errors.length > 0

	return (
		<Field
			ref={ref}
			orientation={orientation}
			className={className}
			invalid={invalid}
			disabled={disabled}
		>
			{label && <FieldLabel>{label}</FieldLabel>}
			<FieldContent>
				<DropZone
					value={value}
					onValueChange={(files) => {
						setRejectionError(undefined)
						onChange(files)
					}}
					onReject={(rejections) => {
						const reason = rejections[0]?.reasons[0]
						setRejectionError(
							reason === 'file-too-large'
								? `Choose a file no larger than ${formatFileSize(maxSizeBytes)}.`
								: reason === 'too-many-files'
									? 'Too many files selected.'
									: 'The file could not be accepted.',
						)
					}}
					accept={accept}
					maxSize={maxSizeBytes}
					maxFiles={maxFiles}
					multiple={multiple}
					disabled={disabled}
					required={required}
					name={name}
					prompt={prompt}
				/>
				{description && <FieldDescription>{description}</FieldDescription>}
				{invalid && <FieldError errors={errors} />}
			</FieldContent>
		</Field>
	)
}
