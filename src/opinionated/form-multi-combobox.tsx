import * as React from 'react'
import {
	Combobox,
	ComboboxChip,
	ComboboxChipRemove,
	ComboboxChips,
	ComboboxInput,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxList,
	ComboboxValue,
} from '../components/keyframery/combobox'
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

export interface FormMultiComboboxOption {
	id: string
	value: string
	disabled?: boolean
}

export interface FormMultiComboboxProps {
	label?: string
	description?: string
	error?: FieldErrors
	placeholder?: string
	options: FormMultiComboboxOption[]
	value?: FormMultiComboboxOption[]
	onValueChange?: (value: FormMultiComboboxOption[]) => void
	disabled?: boolean
	required?: boolean
	orientation?: FieldProps['orientation']
	className?: string
	// ComboboxContent props
	side?: 'top' | 'bottom' | 'left' | 'right'
	sideOffset?: number
	align?: 'start' | 'center' | 'end'
	alignOffset?: number
	// Empty state
	emptyText?: string
	// Chip props
	showRemove?: boolean
	// Additional props
	id?: string
	name?: string
	'aria-label'?: string
	'aria-labelledby'?: string
	// Additional Combobox props
	defaultOpen?: boolean
	open?: boolean
	onOpenChange?: (open: boolean) => void
}

function FormMultiCombobox({
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
	side = 'bottom',
	sideOffset = 4,
	align = 'start',
	alignOffset = 0,
	emptyText = 'No results found.',
	showRemove = true,
	id,
	name,
	'aria-label': ariaLabel,
	'aria-labelledby': ariaLabelledBy,
	...comboboxProps
}: FormMultiComboboxProps) {
	const errorArray = fieldErrors(error)

	const hasError = errorArray.length > 0
	const generatedId = React.useId()
	const inputId = id || generatedId

	const items = options.map(({ id, value: label, disabled }) => ({ value: id, label, disabled }))
	const optionsById = new Map(options.map((option) => [option.id, option]))

	return (
		<Field orientation={orientation} className={className} invalid={hasError} disabled={disabled}>
			{label && (
				<FieldLabel htmlFor={inputId}>
					{label}
					{required && <span className="text-critical">*</span>}
				</FieldLabel>
			)}
			<FieldContent>
				<Combobox<string, true>
					items={items}
					multiple
					value={value?.map((option) => option.id)}
					onValueChange={(ids) => {
						onValueChange?.(
							ids.flatMap((key) => {
								const option = optionsById.get(key)
								return option ? [option] : []
							}),
						)
					}}
					disabled={disabled}
					required={required}
					name={name}
					{...comboboxProps}
				>
					<ComboboxChips>
						<ComboboxValue>
							{({ value: selected }) =>
								Array.isArray(selected) &&
								selected.map((key) => {
									const option = optionsById.get(key)
									return (
										option && (
											<ComboboxChip key={option.id} value={option.id}>
												{option.value}
												{showRemove && <ComboboxChipRemove aria-label={`Remove ${option.value}`} />}
											</ComboboxChip>
										)
									)
								})
							}
						</ComboboxValue>
						<ComboboxInput
							id={inputId}
							placeholder={placeholder}
							aria-label={ariaLabel}
							aria-labelledby={ariaLabelledBy}
							aria-invalid={hasError || undefined}
							aria-required={required}
						/>
					</ComboboxChips>
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

export { FormMultiCombobox }
