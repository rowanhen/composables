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
import { cn } from '@/lib/utils'

export interface DateOfBirthValue {
  day: string
  month: string
  year: string
}

export interface FormDateOfBirthProps {
  label?: string
  description?: string
  error?: string | string[] | Array<{ message?: string } | undefined>
  disabled?: boolean
  required?: boolean
  orientation?: VariantProps<typeof Field>['orientation']
  className?: string
  id?: string
  name?: string
  value?: DateOfBirthValue
  onChange?: (value: DateOfBirthValue) => void
  'aria-label'?: string
  'aria-labelledby'?: string
}

function FormDateOfBirth({
  label,
  description,
  error,
  disabled = false,
  required = false,
  orientation = 'vertical',
  className,
  id,
  name,
  value,
  onChange,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}: FormDateOfBirthProps) {
  const errorArray = React.useMemo(() => {
    if (!error) return undefined
    if (Array.isArray(error)) {
      return error.map((e) => (typeof e === 'string' ? { message: e } : e))
    }
    return [{ message: error }]
  }, [error])

  const hasError = Boolean(error)
  const generatedId = React.useId()
  const fieldId = id || generatedId

  const dayRef = React.useRef<HTMLInputElement>(null)
  const monthRef = React.useRef<HTMLInputElement>(null)
  const yearRef = React.useRef<HTMLInputElement>(null)

  const [internalValue, setInternalValue] = React.useState<DateOfBirthValue>({
    day: '',
    month: '',
    year: '',
  })

  const currentValue = value ?? internalValue

  const handleChange = (field: keyof DateOfBirthValue, inputValue: string) => {
    // Only allow numeric values
    const numericValue = inputValue.replace(/\D/g, '')

    // Enforce max length
    const maxLengths = { day: 2, month: 2, year: 4 }
    const truncatedValue = numericValue.slice(0, maxLengths[field])

    const newValue = {
      ...currentValue,
      [field]: truncatedValue,
    }

    if (onChange) {
      onChange(newValue)
    } else {
      setInternalValue(newValue)
    }

    // Auto-focus next input when max length is reached
    if (truncatedValue.length === maxLengths[field]) {
      if (field === 'day') {
        monthRef.current?.focus()
      } else if (field === 'month') {
        yearRef.current?.focus()
      }
    }
  }

  const handleKeyDown = (
    field: keyof DateOfBirthValue,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    // Handle backspace to move to previous input when empty
    if (e.key === 'Backspace' && currentValue[field] === '') {
      if (field === 'month') {
        dayRef.current?.focus()
      } else if (field === 'year') {
        monthRef.current?.focus()
      }
    }
  }

  const inputClassName = cn(
    'text-center tabular-nums',
    hasError && 'aria-invalid:border-stroke-critical aria-invalid:ring-stroke-critical/20',
  )

  return (
    <Field orientation={orientation} className={className} data-invalid={hasError}>
      {label && (
        <FieldLabel htmlFor={`${fieldId}-day`}>
          {label}
          {required && <span className="text-destructive">*</span>}
        </FieldLabel>
      )}
      <FieldContent>
        <fieldset
          className="flex items-center gap-1 border-none p-0 m-0 min-w-0"
          aria-label={ariaLabel || label || 'Date of birth'}
          aria-labelledby={ariaLabelledBy}
        >
          <Input
            ref={dayRef}
            id={`${fieldId}-day`}
            name={name ? `${name}-day` : undefined}
            type="text"
            inputMode="numeric"
            placeholder="DD"
            value={currentValue.day}
            onChange={(e) => handleChange('day', e.target.value)}
            onKeyDown={(e) => handleKeyDown('day', e)}
            disabled={disabled}
            required={required}
            aria-invalid={hasError}
            aria-required={required}
            aria-label="Day"
            className={cn(inputClassName, 'w-10')}
            maxLength={2}
          />
          <span className="text-muted-foreground text-sm">/</span>
          <Input
            ref={monthRef}
            id={`${fieldId}-month`}
            name={name ? `${name}-month` : undefined}
            type="text"
            inputMode="numeric"
            placeholder="MM"
            value={currentValue.month}
            onChange={(e) => handleChange('month', e.target.value)}
            onKeyDown={(e) => handleKeyDown('month', e)}
            disabled={disabled}
            required={required}
            aria-invalid={hasError}
            aria-label="Month"
            className={cn(inputClassName, 'w-10')}
            maxLength={2}
          />
          <span className="text-muted-foreground text-sm">/</span>
          <Input
            ref={yearRef}
            id={`${fieldId}-year`}
            name={name ? `${name}-year` : undefined}
            type="text"
            inputMode="numeric"
            placeholder="YYYY"
            value={currentValue.year}
            onChange={(e) => handleChange('year', e.target.value)}
            onKeyDown={(e) => handleKeyDown('year', e)}
            disabled={disabled}
            required={required}
            aria-invalid={hasError}
            aria-label="Year"
            className={cn(inputClassName, 'w-14')}
            maxLength={4}
          />
        </fieldset>
        {description && <FieldDescription>{description}</FieldDescription>}
        {hasError && <FieldError errors={errorArray} />}
      </FieldContent>
    </Field>
  )
}

export { FormDateOfBirth }
