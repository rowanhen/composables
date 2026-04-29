import type { VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from '../_internal/field'
import { Input } from '../_internal/input'
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
	extends Omit<React.ComponentProps<'input'>, 'size'>, NumericInputOptions {
	/** Label text rendered above the input. */
	label?: string
	/** Helper text rendered below the input. */
	description?: string
	/** Error message(s). Accepts a string, array of strings, or react-hook-form error array. */
	error?: string | string[] | Array<{ message?: string } | undefined>
	/** Disables the input. @default false */
	disabled?: boolean
	/** Marks the field as required (shows asterisk + aria-required). @default false */
	required?: boolean
	/** Label/input layout direction. @default 'vertical' */
	orientation?: VariantProps<typeof Field>['orientation']
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
	const errorArray = React.useMemo(() => {
		if (!error) return undefined
		if (Array.isArray(error)) {
			return error.map((e) => (typeof e === 'string' ? { message: e } : e))
		}
		return [{ message: error }]
	}, [error])

	const hasError = Boolean(error)
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
		<Field orientation={orientation} className={className} data-invalid={hasError}>
			{label && (
				<FieldLabel htmlFor={inputId}>
					{label}
					{required && <span className="text-danger">*</span>}
				</FieldLabel>
			)}
			<FieldContent>
				<Input
					{...restInputProps}
					{...numericInputProps}
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
