import * as React from 'react'

import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldLabel,
	type FieldErrors,
	type FieldProps,
	fieldErrors,
} from './field'
import { Textarea } from './textarea'

/**
 * Props for the opinionated FormTextarea component.
 *
 * @example
 * ```tsx
 * <FormTextarea label="Message" placeholder="Write something..." rows={5} />
 * <FormTextarea label="Bio" description="Max 300 characters" error={errors.bio?.message} />
 * ```
 */
export interface FormTextareaProps extends Omit<React.ComponentProps<typeof Textarea>, 'size'> {
	/** Label text rendered above the textarea. */
	label?: string
	/** Helper text rendered below the textarea. */
	description?: string
	/** Error message(s). Accepts a string, array, or react-hook-form error array. */
	error?: FieldErrors
	/** Disables the textarea. @default false */
	disabled?: boolean
	/** Marks the field as required. @default false */
	required?: boolean
	/** Label/textarea layout direction. @default 'vertical' */
	orientation?: FieldProps['orientation']
	className?: string
}

function FormTextarea({
	label,
	description,
	error,
	disabled = false,
	required = false,
	orientation = 'vertical',
	className,
	id,
	...textareaProps
}: FormTextareaProps) {
	const errorArray = fieldErrors(error)

	const hasError = errorArray.length > 0
	const generatedId = React.useId()
	const textareaId = id || generatedId

	return (
		<Field orientation={orientation} className={className} invalid={hasError} disabled={disabled}>
			{label && (
				<FieldLabel htmlFor={textareaId}>
					{label}
					{required && <span className="text-critical">*</span>}
				</FieldLabel>
			)}
			<FieldContent>
				<Textarea
					id={textareaId}
					disabled={disabled}
					required={required}
					aria-invalid={hasError}
					aria-required={required}
					{...textareaProps}
				/>
				{description && <FieldDescription>{description}</FieldDescription>}
				{hasError && <FieldError errors={errorArray} />}
			</FieldContent>
		</Field>
	)
}

export { FormTextarea }
