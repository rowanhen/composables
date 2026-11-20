import * as React from 'react'
import {
	Combobox,
	ComboboxClear,
	ComboboxContent,
	ComboboxControl,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxList,
	ComboboxTrigger,
} from '../../components/keyframery/combobox'
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

/** A single option in a FormCombobox. */
export interface FormComboboxOption {
	/** Display label shown in the dropdown and as the input value when selected. */
	label: string
	/** Value submitted when this option is selected. */
	value: string
	/** Prevents this option from being selected. */
	disabled?: boolean
}

/**
 * Props for the opinionated FormCombobox component.
 *
 * Wraps a searchable combobox with a Field (label + description + error) and
 * accepts a flat `options` array. The user can type to filter the list.
 *
 * @example
 * ```tsx
 * <FormCombobox
 *   label="Assign to"
 *   placeholder="Search users..."
 *   options={users.map(u => ({ label: u.name, value: u.id }))}
 *   value={assignee}
 *   onValueChange={setAssignee}
 * />
 *
 * // With clear button and error
 * <FormCombobox
 *   label="Category"
 *   options={categoryOptions}
 *   showClear
 *   error={errors.category?.message}
 * />
 * ```
 */
export interface FormComboboxProps extends Pick<
	React.ComponentProps<typeof Combobox<string, false>>,
	'open' | 'defaultOpen' | 'onOpenChange' | 'speed'
> {
	defaultValue?: string | null
	/** Label text rendered above the combobox. */
	label?: string
	/** Helper text rendered below the combobox. */
	description?: string
	/** Error message(s). Accepts a string, array, or react-hook-form error array. */
	error?: FieldErrors
	/** Placeholder text in the search input. */
	placeholder?: string
	/** Array of selectable options. */
	options: FormComboboxOption[]
	/** Controlled selected value. Pass `null` to clear selection. */
	value?: string | null
	/** Called when the user selects an option. Passes `null` when cleared. */
	onValueChange?: (value: string | null) => void
	/** Disables the combobox. @default false */
	disabled?: boolean
	/** Marks the field as required. @default false */
	required?: boolean
	/** Label/combobox layout direction. @default 'vertical' */
	orientation?: FieldProps['orientation']
	className?: string
	/** Shows a dropdown chevron button. @default true */
	showTrigger?: boolean
	/** Shows a clear (×) button when a value is selected. @default false */
	showClear?: boolean
	/** Which side of the trigger the dropdown opens on. @default 'bottom' */
	side?: 'top' | 'bottom' | 'left' | 'right'
	sideOffset?: number
	align?: 'start' | 'center' | 'end'
	alignOffset?: number
	/** Text displayed when no options match the search query. @default 'No results found.' */
	emptyText?: string
	id?: string
	name?: string
	'aria-label'?: string
	'aria-labelledby'?: string
}

function FormCombobox({
	label,
	description,
	error,
	placeholder,
	options,
	value,
	onValueChange,
	disabled = false,
	required = false,
	orientation = 'vertical',
	className,
	showTrigger = true,
	showClear = false,
	side = 'bottom',
	sideOffset = 6,
	align = 'start',
	alignOffset = 0,
	emptyText = 'No results found.',
	id,
	name,
	'aria-label': ariaLabel,
	'aria-labelledby': ariaLabelledBy,
	...comboboxProps
}: FormComboboxProps) {
	const errorArray = fieldErrors(error)

	const hasError = errorArray.length > 0
	const generatedId = React.useId()
	const inputId = id || generatedId

	return (
		<Field orientation={orientation} className={className} invalid={hasError} disabled={disabled}>
			{label && (
				<FieldLabel htmlFor={inputId}>
					{label}
					{required && <span className="text-critical">*</span>}
				</FieldLabel>
			)}
			<FieldContent>
				<Combobox<string>
					items={options}
					value={value}
					onValueChange={onValueChange}
					name={name}
					disabled={disabled}
					required={required}
					{...comboboxProps}
				>
					<ComboboxControl>
						<ComboboxInput
							id={inputId}
							placeholder={placeholder}
							aria-label={ariaLabel}
							aria-labelledby={ariaLabelledBy}
							aria-invalid={hasError || undefined}
							aria-required={required}
						/>
						{showClear && <ComboboxClear aria-label="Clear selection" />}
						{showTrigger && <ComboboxTrigger aria-label="Show options" />}
					</ComboboxControl>
					<ComboboxContent
						side={side}
						sideOffset={sideOffset}
						align={align}
						alignOffset={alignOffset}
					>
						<ComboboxEmpty>{emptyText}</ComboboxEmpty>
						<ComboboxList />
					</ComboboxContent>
				</Combobox>
				{description && <FieldDescription>{description}</FieldDescription>}
				{hasError && <FieldError errors={errorArray} />}
			</FieldContent>
		</Field>
	)
}

export { FormCombobox }
