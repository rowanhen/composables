import type { VariantProps } from 'class-variance-authority'
import * as React from 'react'

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'

export interface FormTextareaProps extends Omit<React.ComponentProps<'textarea'>, 'size'> {
  label?: string
  description?: string
  error?: string | string[] | Array<{ message?: string } | undefined>
  disabled?: boolean
  required?: boolean
  orientation?: VariantProps<typeof Field>['orientation']
  className?: string
}

function FormTextarea({
  label,
  description,
  error,
  disabled = false,
  required = false,
  orientation = 'vertical',
  className,
  id,
  ...textareaProps
}: FormTextareaProps) {
  const errorArray = React.useMemo(() => {
    if (!error) return undefined
    if (Array.isArray(error)) {
      return error.map((e) => (typeof e === 'string' ? { message: e } : e))
    }
    return [{ message: error }]
  }, [error])

  const hasError = Boolean(error)
  const generatedId = React.useId()
  const textareaId = id || generatedId

  return (
    <Field orientation={orientation} className={className} data-invalid={hasError}>
      {label && (
        <FieldLabel htmlFor={textareaId}>
          {label}
          {required && <span className="text-destructive">*</span>}
        </FieldLabel>
      )}
      <FieldContent>
        <Textarea
          id={textareaId}
          disabled={disabled}
          required={required}
          aria-invalid={hasError}
          aria-required={required}
          {...textareaProps}
        />
        {description && <FieldDescription>{description}</FieldDescription>}
        {hasError && <FieldError errors={errorArray} />}
      </FieldContent>
    </Field>
  )
}

export { FormTextarea }
