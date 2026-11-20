import * as React from 'react'
import { Calendar } from '../calendar/calendar'
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
import { Popover, PopoverContent, PopoverTrigger } from '../../components/keyframery/popover'

export interface FormCalendarPopoverProps {
	label?: string
	description?: string
	error?: FieldErrors
	value?: Date
	onChange?: (value: Date | undefined) => void
	onBlur?: () => void
	disabled?: boolean
	required?: boolean
	orientation?: FieldProps['orientation']
	className?: string
	// Additional props
	id?: string
	name?: string
	'aria-label'?: string
	'aria-labelledby'?: string
	placeholder?: string
	/** Minimum selectable date - dates before this will be disabled */
	minDate?: Date
	/** Maximum selectable date - dates after this will be disabled */
	maxDate?: Date
}

function toCalendarDate(date: Date | undefined) {
	if (!date || Number.isNaN(date.getTime())) return undefined
	const year = String(date.getFullYear()).padStart(4, '0')
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = String(date.getDate()).padStart(2, '0')
	return `${year}-${month}-${day}`
}

function FormCalendarPopover({
	label,
	description,
	error,
	value,
	onChange,
	onBlur,
	disabled = false,
	required = false,
	orientation = 'vertical',
	className,
	id,
	name,
	'aria-label': ariaLabel,
	'aria-labelledby': ariaLabelledBy,
	placeholder = 'Select date',
	minDate,
	maxDate,
}: FormCalendarPopoverProps) {
	const errorArray = fieldErrors(error)

	const hasError = errorArray.length > 0
	const generatedId = React.useId()
	const inputId = id || generatedId

	const [open, setOpen] = React.useState(false)

	const calendarDate = toCalendarDate(value)
	const firstDate = toCalendarDate(minDate)
	const lastDate = toCalendarDate(maxDate)

	return (
		<Field orientation={orientation} className={className} invalid={hasError} disabled={disabled}>
			{label && (
				<FieldLabel id={`${inputId}-label`} htmlFor={inputId}>
					{label}
					{required && <span className="text-critical">*</span>}
				</FieldLabel>
			)}
			<FieldContent>
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger
						id={inputId}
						disabled={disabled}
						aria-invalid={hasError || undefined}
						aria-required={required}
						aria-label={ariaLabel}
						aria-labelledby={
							ariaLabelledBy ?? (label && !ariaLabel ? `${inputId}-label` : undefined)
						}
						aria-describedby={description ? `${inputId}-description` : undefined}
						onBlur={onBlur}
					>
						{value && calendarDate ? value.toLocaleDateString() : placeholder}
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0" align="start">
						<Calendar
							value={calendarDate ?? null}
							defaultMonth={(calendarDate ?? firstDate)?.slice(0, 7)}
							min={firstDate}
							max={lastDate}
							deselectable={!required}
							onValueChange={(selected) => {
								onChange?.(
									typeof selected === 'string' ? new Date(`${selected}T00:00:00`) : undefined,
								)
								setOpen(false)
							}}
						/>
					</PopoverContent>
				</Popover>
				{name && <input type="hidden" name={name} value={calendarDate ?? ''} disabled={disabled} />}
				{description && (
					<FieldDescription id={`${inputId}-description`}>{description}</FieldDescription>
				)}
				{hasError && <FieldError errors={errorArray} />}
			</FieldContent>
		</Field>
	)
}

export { FormCalendarPopover }
