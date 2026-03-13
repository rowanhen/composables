import type { VariantProps } from 'class-variance-authority'
import { ChevronDownIcon } from 'lucide-react'
import * as React from 'react'
import { Button as ButtonPrimitive } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export interface FormCalendarPopoverProps {
  label?: string
  description?: string
  error?: string | string[] | Array<{ message?: string } | undefined>
  value?: Date
  onChange?: (value: Date | undefined) => void
  onBlur?: () => void
  disabled?: boolean
  required?: boolean
  orientation?: VariantProps<typeof Field>['orientation']
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
  ...props
}: FormCalendarPopoverProps) {
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

  const [open, setOpen] = React.useState(false)

  const disabledDates = React.useMemo(() => {
    const matchers: Array<{ before: Date } | { after: Date }> = []
    if (minDate) {
      matchers.push({ before: minDate })
    }
    if (maxDate) {
      matchers.push({ after: maxDate })
    }
    return matchers.length > 0 ? matchers : undefined
  }, [minDate, maxDate])

  const handleDateSelect = (date: Date | undefined) => {
    onChange?.(date)
    setOpen(false)
  }

  const handleBlur = () => {
    onBlur?.()
  }

  return (
    <Field orientation={orientation} className={className} data-invalid={hasError}>
      {label && (
        <FieldLabel htmlFor={inputId}>
          {label}
          {required && <span className="text-destructive">*</span>}
        </FieldLabel>
      )}
      <FieldContent>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            render={
              <ButtonPrimitive
                id={inputId}
                name={name}
                variant="outline"
                disabled={disabled}
                aria-invalid={hasError}
                aria-required={required}
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledBy || (label ? inputId : undefined)}
                onBlur={handleBlur}
                className={cn(
                  'w-full justify-between font-normal',
                  !value && 'text-muted-foreground',
                )}
                {...props}
              >
                {value ? value.toLocaleDateString() : placeholder}
                <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
              </ButtonPrimitive>
            }
          />
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={value}
              defaultMonth={value || undefined}
              captionLayout="dropdown"
              onSelect={handleDateSelect}
              disabled={disabledDates}
            />
          </PopoverContent>
        </Popover>
        {description && <FieldDescription>{description}</FieldDescription>}
        {hasError && <FieldError errors={errorArray} />}
      </FieldContent>
    </Field>
  )
}

export { FormCalendarPopover }
