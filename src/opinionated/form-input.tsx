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
import { Input } from './input'
import { type NumericInputOptions, useNumericInput } from '../hooks/use-numeric-input'

/**
 * Props for the opinionated FormInput component.
 *
 * Wraps an HTML input with a Field (label + description + error), handles
 * accessibility wiring, and supports a numeric mode for formatted number entry.
 *
 * @example
 * ```tsx
 * // Basic text input
 * <FormInput label="Email" type="email" placeholder="you@example.com" />
 *
 * // With validation error
 * <FormInput label="Name" error="Name is required" required />
 *
 * // Numeric mode (formatted currency input)
 * <FormInput
 *   label="Amount"
 *   numericMode="decimal"
 *   numericValue={amount}
 *   onNumericChange={setAmount}
 *   maxDecimalPlaces={2}
 * />
 * ```
 */
export interface FormInputProps
	extends Omit<React.ComponentProps<typeof Input>, 'size'>, NumericInputOptions {
	/** Label text rendered above the input. */
	label?: string
	/** Helper text rendered below the input. */
	description?: string
	/** Error message(s). Accepts a string, array of strings, or react-hook-form error array. */
	error?: FieldErrors
	/** Disables the input. @default false */
	disabled?: boolean
	/** Marks the field as required (shows asterisk + aria-required). @default false */
	required?: boolean
	/** Label/input layout direction. @default 'vertical' */
	orientation?: FieldProps['orientation']
	className?: string
}

function FormInput({
	label,
	description,
	error,
	disabled = false,
	required = false,
	orientation = 'vertical',
	className,
	id,
	numericMode,
	numericValue,
	onNumericChange,
	maxDecimalPlaces,
	value,
	onChange,
	onBlur,
	onFocus,
	type,
	...restInputProps
}: FormInputProps) {
	const errorArray = fieldErrors(error)

	const hasError = errorArray.length > 0
	const generatedId = React.useId()
	const inputId = id || generatedId

	const { inputProps: numericInputProps } = useNumericInput({
		numericMode,
		numericValue,
		onNumericChange,
		maxDecimalPlaces,
		value,
		onChange,
		onBlur,
		onFocus,
		type,
	})

	return (
		<Field orientation={orientation} className={className} invalid={hasError} disabled={disabled}>
			{label && (
				<FieldLabel htmlFor={inputId}>
					{label}
					{required && <span className="text-critical">*</span>}
				</FieldLabel>
			)}
			<FieldContent>
				<Input
					{...restInputProps}
					{...numericInputProps}
					inputMode={numericInputProps.inputMode ?? restInputProps.inputMode}
					value={
						numericInputProps.value === undefined ? undefined : String(numericInputProps.value)
					}
					id={inputId}
					disabled={disabled}
					required={required}
					aria-invalid={hasError}
					aria-required={required}
				/>
				{description && <FieldDescription>{description}</FieldDescription>}
				{hasError && <FieldError errors={errorArray} />}
			</FieldContent>
		</Field>
	)
}

export { FormInput }
