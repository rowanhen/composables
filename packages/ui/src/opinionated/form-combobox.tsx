import type { VariantProps } from 'class-variance-authority'
import * as React from 'react'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '../_internal/combobox'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '../_internal/field'

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
export interface FormComboboxProps
  extends Omit<React.ComponentProps<typeof Combobox>, 'value' | 'onValueChange' | 'children'> {
  /** Label text rendered above the combobox. */
  label?: string
  /** Helper text rendered below the combobox. */
  description?: string
  /** Error message(s). Accepts a string, array, or react-hook-form error array. */
  error?: string | string[] | Array<{ message?: string } | undefined>
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
  orientation?: VariantProps<typeof Field>['orientation']
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

  const handleValueChange = React.useCallback(
    (newValue: unknown) => {
      if (onValueChange) {
        onValueChange(newValue === undefined ? null : (newValue as string))
      }
    },
    [onValueChange],
  )

  return (
    <Field orientation={orientation} className={className} data-invalid={hasError}>
      {label && (
        <FieldLabel htmlFor={inputId}>
          {label}
          {required && <span className="text-danger">*</span>}
        </FieldLabel>
      )}
      <FieldContent>
        <Combobox value={value ?? undefined} onValueChange={handleValueChange} {...comboboxProps}>
          <ComboboxInput
            id={inputId}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            showTrigger={showTrigger}
            showClear={showClear}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            aria-invalid={hasError}
            aria-required={required}
          />
          <ComboboxContent
            side={side}
            sideOffset={sideOffset}
            align={align}
            alignOffset={alignOffset}
          >
            <ComboboxList>
              {options.length === 0 && emptyText && <ComboboxEmpty>{emptyText}</ComboboxEmpty>}
              {options.map((option) => (
                <ComboboxItem key={option.value} value={option.value} disabled={option.disabled}>
                  {option.label}
                </ComboboxItem>
              ))}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        {description && <FieldDescription>{description}</FieldDescription>}
        {hasError && <FieldError errors={errorArray} />}
      </FieldContent>
    </Field>
  )
}

export { FormCombobox }
