import type { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group'
import type { VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from '../_internal/field'
import { Label } from '../_internal/label'
import { RadioGroup, RadioGroupItem } from '../_internal/radio-group'

export interface FormRadioGroupOption {
	label: string
	value: string
	disabled?: boolean
}

export interface FormRadioGroupProps extends Omit<
	RadioGroupPrimitive.Props,
	'value' | 'onValueChange'
> {
	label?: string
	description?: string
	error?: string | string[] | Array<{ message?: string } | undefined>
	options: FormRadioGroupOption[]
	value?: string | null
	onValueChange?: (value: string | null) => void
	disabled?: boolean
	required?: boolean
	orientation?: VariantProps<typeof Field>['orientation']
	className?: string
	// Additional props
	id?: string
	name?: string
}

function FormRadioGroup({
	label,
	description,
	error,
	options,
	value,
	onValueChange,
	disabled = false,
	required = false,
	orientation = 'vertical',
	className,
	id,
	name,
	...radioGroupProps
}: FormRadioGroupProps) {
	const errorArray = React.useMemo(() => {
		if (!error) return undefined
		if (Array.isArray(error)) {
			return error.map((e) => (typeof e === 'string' ? { message: e } : e))
		}
		return [{ message: error }]
	}, [error])

	const hasError = Boolean(error)
	const generatedId = React.useId()
	const radioGroupId = id || generatedId

	// Wrap onValueChange to match the primitive's signature
	const handleValueChange = React.useCallback(
		(newValue: unknown) => {
			if (onValueChange) {
				onValueChange(typeof newValue === 'string' ? newValue : null)
			}
		},
		[onValueChange],
	)

	return (
		<Field orientation={orientation} className={className} data-invalid={hasError}>
			{label && (
				<FieldLabel id={`${radioGroupId}-label`}>
					{label}
					{required && <span className="text-danger">*</span>}
				</FieldLabel>
			)}
			<FieldContent>
				<RadioGroup
					id={radioGroupId}
					value={value ?? undefined}
					onValueChange={handleValueChange}
					disabled={disabled}
					aria-invalid={hasError}
					aria-required={required}
					aria-labelledby={label ? `${radioGroupId}-label` : undefined}
					{...radioGroupProps}
				>
					{options.map((option) => {
						const optionId = `${radioGroupId}-${option.value}`
						return (
							<div key={option.value} className="flex items-center space-x-2">
								<RadioGroupItem
									value={option.value}
									id={optionId}
									disabled={disabled || option.disabled}
									aria-invalid={hasError}
								/>
								<Label htmlFor={optionId} className="text-sm font-normal cursor-pointer">
									{option.label}
								</Label>
							</div>
						)
					})}
				</RadioGroup>
				{name && (
					<input type="hidden" name={name} value={value ?? ''} aria-hidden="true" tabIndex={-1} />
				)}
				{description && <FieldDescription>{description}</FieldDescription>}
				{hasError && <FieldError errors={errorArray} />}
			</FieldContent>
		</Field>
	)
}

export { FormRadioGroup }
