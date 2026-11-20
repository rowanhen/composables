import { useId } from 'react'
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
import { Switch, type SwitchProps } from '../switch/switch'

/**
 * Props for the opinionated FormSwitch component.
 *
 * @example
 * ```tsx
 * <FormSwitch label="Email notifications" checked={enabled} onCheckedChange={setEnabled} />
 * <FormSwitch
 *   label="Dark mode"
 *   description="Applies immediately across the app"
 *   checked={darkMode}
 *   onCheckedChange={setDarkMode}
 * />
 * ```
 */
export interface FormSwitchProps extends Omit<SwitchProps, 'checked' | 'onCheckedChange'> {
	/** Label text rendered beside the switch. */
	label?: string
	/** Helper text rendered below the label. */
	description?: string
	/** Error message(s). Accepts a string, array, or react-hook-form error array. */
	error?: FieldErrors
	/** Controlled checked state. Omit (or use `defaultChecked`) for uncontrolled. */
	checked?: boolean
	/** Called when the user toggles the switch. */
	onCheckedChange?: (checked: boolean) => void
	/** Disables the switch. @default false */
	disabled?: boolean
	/** Marks the field as required. @default false */
	required?: boolean
	/** Label/switch layout direction. @default 'horizontal' */
	orientation?: FieldProps['orientation']
	className?: string
	id?: string
	name?: string
	'aria-label'?: string
	'aria-labelledby'?: string
}

function FormSwitch({
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
	...switchProps
}: FormSwitchProps) {
	const errorArray = fieldErrors(error)
	const hasError = errorArray.length > 0
	const generatedId = useId()
	const switchId = id || generatedId

	const hasLabelOrDescription = Boolean(label || description)

	return (
		<Field orientation={orientation} className={className} invalid={hasError} disabled={disabled}>
			<FieldContent
				className={orientation === 'horizontal' ? 'flex-row items-start gap-2' : undefined}
			>
				{/* Text column: label, assistive text and error stack beside the switch. */}
				{(hasLabelOrDescription || hasError) && (
					<div className="flex flex-col gap-1.5 flex-1">
						{label && (
							<FieldLabel htmlFor={switchId}>
								{label}
								{required && <span className="text-critical">*</span>}
							</FieldLabel>
						)}
						{description && <FieldDescription>{description}</FieldDescription>}
						{hasError && <FieldError errors={errorArray} />}
					</div>
				)}
				<Switch
					id={switchId}
					name={name}
					checked={checked}
					onCheckedChange={onCheckedChange}
					disabled={disabled}
					required={required}
					aria-invalid={hasError}
					aria-required={required}
					aria-label={ariaLabel}
					aria-labelledby={ariaLabelledBy}
					{...switchProps}
				/>
			</FieldContent>
		</Field>
	)
}

export { FormSwitch }
