import type { VariantProps } from 'class-variance-authority'
import * as React from 'react'

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '../_internal/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
} from '../_internal/select'

/** A single option in a FormSelect. */
export interface FormSelectOption {
  /** Display label shown in the dropdown. */
  label: string
  /** Value submitted when this option is selected. */
  value: string
  /** Prevents this option from being selected. */
  disabled?: boolean
}

/**
 * Props for the opinionated FormSelect component.
 *
 * Wraps a Select dropdown with a Field (label + description + error) and
 * accepts a flat `options` array rather than requiring manual `SelectItem` assembly.
 *
 * @example
 * ```tsx
 * <FormSelect
 *   label="Country"
 *   options={[
 *     { label: 'United Kingdom', value: 'gb' },
 *     { label: 'United States', value: 'us' },
 *   ]}
 *   value={country}
 *   onValueChange={setCountry}
 * />
 *
 * // With error and placeholder
 * <FormSelect
 *   label="Status"
 *   placeholder="Choose a status..."
 *   options={statusOptions}
 *   error={errors.status?.message}
 *   required
 * />
 * ```
 */
export interface FormSelectProps {
  ref?: React.Ref<HTMLButtonElement>
  /** Label text rendered above the select. */
  label?: string
  /** Helper text rendered below the select. */
  description?: string
  /** Error message(s). Accepts a string, array, or react-hook-form error array. */
  error?: string | string[] | Array<{ message?: string } | undefined>
  /** Placeholder text shown when no value is selected. @default 'Select an option...' */
  placeholder?: string
  /** Array of selectable options. */
  options: FormSelectOption[]
  /** Controlled selected value. Pass `null` to clear selection. */
  value?: string | null
  /** Called when the user selects an option. Passes `null` when cleared. */
  onValueChange?: (value: string | null) => void
  /** Disables the select. @default false */
  disabled?: boolean
  /** Marks the field as required. @default false */
  required?: boolean
  /** Label/select layout direction. @default 'vertical' */
  orientation?: VariantProps<typeof Field>['orientation']
  /** Trigger size variant. @default 'default' */
  size?: 'sm' | 'default'
  className?: string
  /** Which side of the trigger the dropdown opens on. @default 'bottom' */
  side?: 'top' | 'bottom' | 'left' | 'right'
  sideOffset?: number
  align?: 'start' | 'center' | 'end'
  alignOffset?: number
  alignItemWithTrigger?: boolean
  id?: string
  name?: string
}

function FormSelect({
  ref,
  label,
  description,
  error,
  placeholder = 'Select an option...',
  options,
  value,
  onValueChange,
  disabled = false,
  required = false,
  orientation = 'vertical',
  size = 'default',
  className,
  side = 'bottom',
  sideOffset = 4,
  align = 'center',
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...selectProps
}: FormSelectProps) {
  const errorArray = React.useMemo(() => {
    if (!error) return undefined
    if (Array.isArray(error)) {
      return error.map((e) => (typeof e === 'string' ? { message: e } : e))
    }
    return [{ message: error }]
  }, [error])

  const hasError = Boolean(error)
  const generatedId = React.useId()
  const selectId = selectProps.id || generatedId

  // Find the selected option's label to display instead of the value
  const selectedOption = React.useMemo(() => {
    if (!value) return null
    return options.find((option) => option.value === value) ?? null
  }, [value, options])

  return (
    <Field orientation={orientation} className={className} data-invalid={hasError}>
      {label && (
        <FieldLabel id={`${selectId}-label`} htmlFor={selectId}>
          {label}
          {required && <span className="text-danger">*</span>}
        </FieldLabel>
      )}
      <FieldContent>
        <Select value={value ?? undefined} onValueChange={onValueChange} disabled={disabled}>
          <SelectTrigger
            ref={ref}
            size={size}
            aria-invalid={hasError}
            aria-required={required}
            id={selectId}
            name={selectProps.name}
            aria-labelledby={label ? `${selectId}-label` : undefined}
            className="w-full"
          >
            <SelectValue>
              {selectedOption === null || selectedOption === undefined
                ? placeholder
                : selectedOption.label}
            </SelectValue>
          </SelectTrigger>
          <SelectContent
            side={side}
            sideOffset={sideOffset}
            align={align}
            alignOffset={alignOffset}
            alignItemWithTrigger={alignItemWithTrigger}
          >
            <SelectScrollUpButton />
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </SelectItem>
            ))}
            <SelectScrollDownButton />
          </SelectContent>
        </Select>
        {description && <FieldDescription>{description}</FieldDescription>}
        {hasError && <FieldError errors={errorArray} />}
      </FieldContent>
    </Field>
  )
}

export { FormSelect }
