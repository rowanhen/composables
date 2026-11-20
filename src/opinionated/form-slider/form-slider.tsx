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
import { Slider, type SliderProps } from '../slider/slider'

export interface FormSliderProps extends Omit<SliderProps, 'orientation'> {
	label?: string
	description?: string
	error?: FieldErrors
	orientation?: FieldProps['orientation']
	className?: string
	required?: boolean
}

function FormSlider({
	label,
	description,
	error,
	orientation = 'vertical',
	className,
	required = false,
	disabled,
	...sliderProps
}: FormSliderProps) {
	const errorArray = fieldErrors(error)

	const hasError = errorArray.length > 0
	const generatedId = React.useId()
	const sliderId = sliderProps.id || generatedId

	return (
		<Field orientation={orientation} className={className} invalid={hasError} disabled={disabled}>
			{label && (
				<FieldLabel id={`${sliderId}-label`}>
					{label}
					{required && <span className="text-critical">*</span>}
				</FieldLabel>
			)}
			<FieldContent>
				<Slider
					id={sliderId}
					aria-invalid={hasError || undefined}
					aria-labelledby={label ? `${sliderId}-label` : undefined}
					required={required}
					disabled={disabled}
					{...sliderProps}
				/>
				{description && <FieldDescription>{description}</FieldDescription>}
				{hasError && <FieldError errors={errorArray} />}
			</FieldContent>
		</Field>
	)
}

export { FormSlider }
