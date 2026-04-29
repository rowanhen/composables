import type { Switch as SwitchPrimitive } from '@base-ui/react/switch'
import type { VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from '../_internal/field'
import { Switch } from '../_internal/switch'

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
export interface FormSwitchProps extends Omit<
	SwitchPrimitive.Root.Props,
	'checked' | 'onCheckedChange'
> {
	/** Label text rendered beside the switch. */
	label?: string
	/** Helper text rendered below the label. */
	description?: string
	/** Error message(s). Accepts a string, array, or react-hook-form error array. */
	error?: string | string[] | Array<{ message?: string } | undefined>
	/** Controlled checked state. @default false */
	checked?: boolean
	/** Called when the user toggles the switch. */
	onCheckedChange?: (checked: boolean) => void
	/** Disables the switch. @default false */
	disabled?: boolean
	/** Marks the field as required. @default false */
	required?: boolean
	/** Label/switch layout direction. @default 'horizontal' */
	orientation?: VariantProps<typeof Field>['orientation']
	/** Switch size variant. @default 'default' */
	size?: 'sm' | 'default'
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
	checked = false,
	onCheckedChange,
	disabled = false,
	required = false,
	orientation = 'horizontal',
	size = 'default',
	className,
	id,
	name,
	'aria-label': ariaLabel,
	'aria-labelledby': ariaLabelledBy,
	...switchProps
}: FormSwitchProps) {
	const errorArray = React.useMemo(() => {
		if (!error) return undefined
		if (Array.isArray(error)) {
			return error.map((e) => (typeof e === 'string' ? { message: e } : e))
		}
		return [{ message: error }]
	}, [error])

	const hasError = Boolean(error)
	const generatedId = React.useId()
	const switchId = id || generatedId

	const hasLabelOrDescription = Boolean(label || description)

	return (
		<Field orientation={orientation} className={className} data-invalid={hasError}>
			<FieldContent
				className={orientation === 'horizontal' ? 'flex-row items-center gap-2' : undefined}
			>
				{hasLabelOrDescription && (
					<div className="flex flex-col gap-0.5 flex-1">
						{label && (
							<FieldLabel htmlFor={switchId}>
								{label}
								{required && <span className="text-danger">*</span>}
							</FieldLabel>
						)}
						{description && <FieldDescription>{description}</FieldDescription>}
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
					aria-labelledby={ariaLabelledBy || (label ? switchId : undefined)}
					size={size}
					{...switchProps}
				/>
				{hasError && <FieldError errors={errorArray} />}
			</FieldContent>
		</Field>
	)
}

export { FormSwitch }
