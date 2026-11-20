'use client'

import type { ComponentProps } from 'react'
import { DateInput } from '../../components/keyframery/date-input'
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldLabel,
	type FieldErrors,
	fieldErrors,
} from '../field/field'

/** A complete birth date in ISO YYYY-MM-DD format, or null when empty or incomplete. */
export type DateOfBirthValue = string | null

export type FormDateOfBirthProps = Omit<
	ComponentProps<typeof DateInput>,
	'children' | 'className' | 'granularity' | 'onChange' | 'onValueChange'
> & {
	label?: string
	description?: string
	error?: FieldErrors
	orientation?: ComponentProps<typeof Field>['orientation']
	className?: string
	onChange?: (value: DateOfBirthValue) => void
}

export function FormDateOfBirth({
	label = 'Date of birth',
	description,
	error,
	disabled,
	required,
	orientation,
	className,
	locale = 'en-GB',
	onChange,
	...props
}: FormDateOfBirthProps) {
	const errors = fieldErrors(error)
	const invalid = errors.length > 0

	return (
		<Field orientation={orientation} className={className} invalid={invalid} disabled={disabled}>
			<FieldLabel>
				{label}
				{required && <span className="text-critical">*</span>}
			</FieldLabel>
			<FieldContent>
				<DateInput
					locale={locale}
					disabled={disabled}
					required={required}
					onValueChange={onChange}
					{...props}
				/>
				{description && <FieldDescription>{description}</FieldDescription>}
				{invalid && <FieldError errors={errors} />}
			</FieldContent>
		</Field>
	)
}
