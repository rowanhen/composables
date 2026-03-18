// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.
import type { VariantProps } from 'class-variance-authority'
import * as React from 'react'

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/_internal/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
} from '@/components/_internal/select'

export interface FormSelectOption {
  label: string
  value: string
  disabled?: boolean
}

export interface FormSelectProps {
  ref?: React.Ref<HTMLButtonElement>
  label?: string
  description?: string
  error?: string | string[] | Array<{ message?: string } | undefined>
  placeholder?: string
  options: FormSelectOption[]
  value?: string | null
  onValueChange?: (value: string | null) => void
  disabled?: boolean
  required?: boolean
  orientation?: VariantProps<typeof Field>['orientation']
  size?: 'sm' | 'default'
  className?: string
  // SelectContent props
  side?: 'top' | 'bottom' | 'left' | 'right'
  sideOffset?: number
  align?: 'start' | 'center' | 'end'
  alignOffset?: number
  alignItemWithTrigger?: boolean
  // Additional Select props
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
          {required && <span className="text-destructive">*</span>}
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
