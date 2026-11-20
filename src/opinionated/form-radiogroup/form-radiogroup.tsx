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
import { cn } from '../../lib/utils'
import { RadioGroup, RadioGroupItem } from '../radio-group/radio-group'

export interface FormRadioGroupOption {
	label: string
	value: string
	/** Supporting copy under the label. */
	description?: string
	/** Leading icon or illustration. */
	icon?: React.ReactNode
	disabled?: boolean
}

export interface FormRadioGroupProps extends Omit<
	React.ComponentProps<typeof RadioGroup>,
	'value' | 'onValueChange'
> {
	label?: string
	description?: string
	error?: FieldErrors
	options: FormRadioGroupOption[]
	value?: string | null
	onValueChange?: (value: string | null) => void
	disabled?: boolean
	required?: boolean
	orientation?: FieldProps['orientation']
	/** `card` renders each option as a selectable tile. */
	variant?: 'default' | 'card'
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
	variant = 'default',
	className,
	id,
	name,
	...radioGroupProps
}: FormRadioGroupProps) {
	const errorArray = fieldErrors(error)

	const hasError = errorArray.length > 0
	const generatedId = React.useId()
	const radioGroupId = id || generatedId

	return (
		<Field orientation={orientation} className={className} invalid={hasError} disabled={disabled}>
			{label && (
				<FieldLabel id={`${radioGroupId}-label`}>
					{label}
					{required && <span className="text-critical">*</span>}
				</FieldLabel>
			)}
			<FieldContent>
				<RadioGroup
					id={radioGroupId}
					value={value}
					onValueChange={onValueChange}
					name={name}
					required={required}
					disabled={disabled}
					aria-invalid={hasError}
					aria-required={required}
					aria-labelledby={label ? `${radioGroupId}-label` : undefined}
					{...radioGroupProps}
				>
					{options.map((option) => {
						const optionId = `${radioGroupId}-${option.value}`
						return (
							<label
								key={option.value}
								htmlFor={optionId}
								className={cn(
									'flex cursor-pointer items-center gap-2',
									variant === 'card' &&
										'rounded-md border border-stroke-default p-3 has-data-checked:border-stroke-brand',
								)}
							>
								<RadioGroupItem
									value={option.value}
									id={optionId}
									disabled={disabled || option.disabled}
									aria-invalid={hasError}
								/>
								{option.icon}
								<span className="flex flex-col gap-0.5">
									<span className="font-medium">{option.label}</span>
									{option.description && (
										<span className="text-muted-foreground text-xs/relaxed">
											{option.description}
										</span>
									)}
								</span>
							</label>
						)
					})}
				</RadioGroup>
				{description && <FieldDescription>{description}</FieldDescription>}
				{hasError && <FieldError errors={errorArray} />}
			</FieldContent>
		</Field>
	)
}

export { FormRadioGroup }
