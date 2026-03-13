import type { VariantProps } from 'class-variance-authority'
import * as React from 'react'

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { type NumericInputOptions, useNumericInput } from '@/hooks/use-numeric-input'

export interface FormInputProps
  extends Omit<React.ComponentProps<'input'>, 'size'>,
    NumericInputOptions {
  label?: string
  description?: string
  error?: string | string[] | Array<{ message?: string } | undefined>
  disabled?: boolean
  required?: boolean
  orientation?: VariantProps<typeof Field>['orientation']
  className?: string
}

function FormInput({
  label,
  description,
  error,
  disabled = false,
  required = false,
  orientation = 'vertical',
  className,
  id,
  numericMode,
  numericValue,
  onNumericChange,
  maxDecimalPlaces,
  value,
  onChange,
  onBlur,
  onFocus,
  type,
  ...restInputProps
}: FormInputProps) {
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

  const { inputProps: numericInputProps } = useNumericInput({
    numericMode,
    numericValue,
    onNumericChange,
    maxDecimalPlaces,
    value,
    onChange,
    onBlur,
    onFocus,
    type,
  })

  return (
    <Field orientation={orientation} className={className} data-invalid={hasError}>
      {label && (
        <FieldLabel htmlFor={inputId}>
          {label}
          {required && <span className="text-destructive">*</span>}
        </FieldLabel>
      )}
      <FieldContent>
        <Input
          {...restInputProps}
          {...numericInputProps}
          id={inputId}
          disabled={disabled}
          required={required}
          aria-invalid={hasError}
          aria-required={required}
        />
        {description && <FieldDescription>{description}</FieldDescription>}
        {hasError && <FieldError errors={errorArray} />}
      </FieldContent>
    </Field>
  )
}

export { FormInput }
