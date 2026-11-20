import { useId } from 'react'
import { Checkbox, type CheckboxProps } from '../checkbox/checkbox'
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldLabel,
	fieldErrors,
	type FieldErrors,
	type FieldProps,
} from '../field/field'

/**
 * Props for the opinionated FormCheckbox component.
 *
 * @example
 * ```tsx
 * <FormCheckbox label="I agree to the terms" checked={agreed} onCheckedChange={setAgreed} />
 * <FormCheckbox
 *   label="Subscribe to newsletter"
 *   description="We'll send you updates once a week."
 *   checked={subscribed}
 *   onCheckedChange={setSubscribed}
 * />
 * ```
 */
export interface FormCheckboxProps extends Omit<CheckboxProps, 'checked' | 'onCheckedChange'> {
	/** Label text rendered beside the checkbox. */
	label?: string
	/** Helper text rendered below the label. */
	description?: string
	/** Error message(s). Accepts a string, array, or react-hook-form error array. */
	error?: FieldErrors
	/** Controlled checked state. Omit (or use `defaultChecked`) for uncontrolled. */
	checked?: boolean
	/** Called when the user toggles the checkbox. */
	onCheckedChange?: (checked: boolean) => void
	/** Disables the checkbox. @default false */
	disabled?: boolean
	/** Marks the field as required. @default false */
	required?: boolean
	/** Label/checkbox layout direction. @default 'horizontal' */
	orientation?: FieldProps['orientation']
	className?: string
	id?: string
	name?: string
	'aria-label'?: string
	'aria-labelledby'?: string
}

function FormCheckbox({
	label,
	description,
	error,
	checked,
	onCheckedChange,
	disabled = false,
	required = false,
	orientation = 'horizontal',
	className,
	id,
	name,
	'aria-label': ariaLabel,
	'aria-labelledby': ariaLabelledBy,
	...checkboxProps
}: FormCheckboxProps) {
	const errorArray = fieldErrors(error)
	const hasError = errorArray.length > 0
	const generatedId = useId()
	const checkboxId = id || generatedId

	return (
		<Field orientation={orientation} className={className} invalid={hasError} disabled={disabled}>
			<FieldContent>
				<div className="flex flex-row items-center gap-2">
					<Checkbox
						id={checkboxId}
						name={name}
						checked={checked}
						onCheckedChange={onCheckedChange && ((value) => onCheckedChange(value === true))}
						disabled={disabled}
						required={required}
						aria-invalid={hasError}
						aria-required={required}
						aria-label={ariaLabel}
						aria-labelledby={ariaLabelledBy}
						{...checkboxProps}
					/>
					{label && (
						<FieldLabel htmlFor={checkboxId}>
							{label}
							{required && <span className="text-critical">*</span>}
						</FieldLabel>
					)}
				</div>
				{description && <FieldDescription>{description}</FieldDescription>}
				{hasError && <FieldError errors={errorArray} />}
			</FieldContent>
		</Field>
	)
}

export { FormCheckbox }
