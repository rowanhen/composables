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
} from '../field/field'
import { Select, type SelectOption, type SelectProps } from '../select/select'

/** A single option in a FormSelect. */
export type FormSelectOption = SelectOption

/**
 * Props for the opinionated FormSelect component.
 *
 * Wraps a Select dropdown with a Field (label + description + error) and
 * accepts a flat `options` array rather than requiring manual `SelectItem` assembly.
 *
 * @example
 * ```tsx
 * <FormSelect
 *   label="Country"
 *   options={[
 *     { label: 'United Kingdom', value: 'gb' },
 *     { label: 'United States', value: 'us' },
 *   ]}
 *   value={country}
 *   onValueChange={setCountry}
 * />
 *
 * // With error and placeholder
 * <FormSelect
 *   label="Status"
 *   placeholder="Choose a status..."
 *   options={statusOptions}
 *   error={errors.status?.message}
 *   required
 * />
 * ```
 */
export interface FormSelectProps extends Omit<SelectProps, 'triggerProps' | 'contentProps'> {
	ref?: React.Ref<HTMLButtonElement>
	/** Label text rendered above the select. */
	label?: string
	/** Helper text rendered below the select. */
	description?: string
	/** Error message(s). Accepts a string, array, or react-hook-form error array. */
	error?: FieldErrors
	/** Label/select layout direction. @default 'vertical' */
	orientation?: FieldProps['orientation']
	/** Which side of the trigger the dropdown opens on. @default 'bottom' */
	side?: 'top' | 'bottom' | 'left' | 'right'
	sideOffset?: number
	align?: 'start' | 'center' | 'end'
	alignOffset?: number
	id?: string
	name?: string
}

function FormSelect({
	ref,
	label,
	description,
	error,
	placeholder = 'Select an option...',
	options,
	disabled = false,
	required = false,
	orientation = 'vertical',
	className,
	side = 'bottom',
	sideOffset = 4,
	align = 'center',
	alignOffset = 0,
	id,
	...selectProps
}: FormSelectProps) {
	const errorArray = fieldErrors(error)

	const hasError = errorArray.length > 0
	const generatedId = React.useId()
	const selectId = id || generatedId

	return (
		<Field orientation={orientation} className={className} invalid={hasError} disabled={disabled}>
			{label && (
				<FieldLabel id={`${selectId}-label`} htmlFor={selectId}>
					{label}
					{required && <span className="text-critical">*</span>}
				</FieldLabel>
			)}
			<FieldContent>
				<Select
					options={options}
					placeholder={placeholder}
					disabled={disabled}
					required={required}
					className="w-full"
					triggerProps={{
						ref,
						id: selectId,
						'aria-invalid': hasError || undefined,
						'aria-labelledby': label ? `${selectId}-label` : undefined,
					}}
					contentProps={{ side, sideOffset, align, alignOffset }}
					{...selectProps}
				/>
				{description && <FieldDescription>{description}</FieldDescription>}
				{hasError && <FieldError errors={errorArray} />}
			</FieldContent>
		</Field>
	)
}

export { FormSelect }
