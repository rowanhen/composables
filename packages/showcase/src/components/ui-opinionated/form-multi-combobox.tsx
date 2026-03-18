// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.
import type { VariantProps } from 'class-variance-authority'
import * as React from 'react'
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from '@/components/_internal/combobox'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/_internal/field'

export interface FormMultiComboboxOption {
  id: string
  value: string
  disabled?: boolean
}

export interface FormMultiComboboxProps {
  label?: string
  description?: string
  error?: string | string[] | Array<{ message?: string } | undefined>
  placeholder?: string
  options: FormMultiComboboxOption[]
  value?: FormMultiComboboxOption[]
  onValueChange?: (value: FormMultiComboboxOption[]) => void
  disabled?: boolean
  required?: boolean
  orientation?: VariantProps<typeof Field>['orientation']
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
  const containerRef = useComboboxAnchor()

  // Convert value array to the format expected by Combobox (array of option values)
  // Always return an array to keep the component controlled
  const comboboxValue = React.useMemo(() => {
    if (!value || value.length === 0) return []
    return value.map((item) => item.value)
  }, [value])

  // Handle value change from Combobox
  const handleValueChange = React.useCallback(
    (newValue: string[] | undefined) => {
      if (!onValueChange) return
      // Always ensure we pass an array, even if empty
      if (!newValue || newValue.length === 0) {
        onValueChange([])
        return
      }
      // Map string values back to option objects
      const selectedOptions = options.filter((option) => newValue.includes(option.value))
      onValueChange(selectedOptions)
    },
    [onValueChange, options],
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
        <Combobox
          items={options}
          multiple
          value={comboboxValue}
          onValueChange={handleValueChange}
          disabled={disabled}
          {...comboboxProps}
        >
          <ComboboxChips
            ref={containerRef}
            aria-invalid={hasError}
            aria-required={required}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
          >
            <ComboboxValue>
              {(selectedValues: FormMultiComboboxOption[] | string[] | undefined) => {
                // Handle undefined/null/empty array case when field is empty
                if (!selectedValues || selectedValues.length === 0) {
                  return (
                    <ComboboxChipsInput
                      id={inputId}
                      name={name}
                      placeholder={placeholder}
                      disabled={disabled}
                      aria-invalid={hasError}
                      aria-required={required}
                    />
                  )
                }

                // Handle both cases: when items are provided (full objects) or when value is provided (strings)
                // Check the first element to determine the type
                const firstValue = selectedValues[0]
                const selectedOptions =
                  firstValue && typeof firstValue === 'object'
                    ? (selectedValues as FormMultiComboboxOption[])
                    : ((selectedValues as string[])
                        .map((val) => options.find((opt) => opt.value === val))
                        .filter(Boolean) as FormMultiComboboxOption[])

                return (
                  <React.Fragment>
                    {selectedOptions.map((option) => (
                      <ComboboxChip
                        key={option.id}
                        showRemove={showRemove}
                        aria-label={`${option.value}, remove`}
                      >
                        {option.value}
                      </ComboboxChip>
                    ))}
                    <ComboboxChipsInput
                      id={inputId}
                      name={name}
                      placeholder={selectedOptions.length > 0 ? '' : placeholder}
                      disabled={disabled}
                      aria-invalid={hasError}
                      aria-required={required}
                    />
                  </React.Fragment>
                )
              }}
            </ComboboxValue>
          </ComboboxChips>
          <ComboboxContent
            side={side}
            sideOffset={sideOffset}
            align={align}
            alignOffset={alignOffset}
            anchor={containerRef}
          >
            <ComboboxList>
              {options.length === 0 && emptyText && <ComboboxEmpty>{emptyText}</ComboboxEmpty>}
              {options.map((option) => (
                <ComboboxItem key={option.id} value={option.value} disabled={option.disabled}>
                  {option.value}
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

export { FormMultiCombobox }
