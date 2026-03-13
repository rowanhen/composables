import type { VariantProps } from 'class-variance-authority'
import * as React from 'react'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'

export interface FormComboboxOption {
  label: string
  value: string
  disabled?: boolean
}

export interface FormComboboxProps
  extends Omit<React.ComponentProps<typeof Combobox>, 'value' | 'onValueChange' | 'children'> {
  label?: string
  description?: string
  error?: string | string[] | Array<{ message?: string } | undefined>
  placeholder?: string
  options: FormComboboxOption[]
  value?: string | null
  onValueChange?: (value: string | null) => void
  disabled?: boolean
  required?: boolean
  orientation?: VariantProps<typeof Field>['orientation']
  className?: string
  // ComboboxInput props
  showTrigger?: boolean
  showClear?: boolean
  // ComboboxContent props
  side?: 'top' | 'bottom' | 'left' | 'right'
  sideOffset?: number
  align?: 'start' | 'center' | 'end'
  alignOffset?: number
  // Empty state
  emptyText?: string
  // Additional props
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
          {required && <span className="text-destructive">*</span>}
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
