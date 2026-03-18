import type { VariantProps } from 'class-variance-authority'
import * as React from 'react'

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '../_internal/field'
import { Textarea } from '../_internal/textarea'

/**
 * Props for the opinionated FormTextarea component.
 *
 * @example
 * ```tsx
 * <FormTextarea label="Message" placeholder="Write something..." rows={5} />
 * <FormTextarea label="Bio" description="Max 300 characters" error={errors.bio?.message} />
 * ```
 */
export interface FormTextareaProps extends Omit<React.ComponentProps<'textarea'>, 'size'> {
  /** Label text rendered above the textarea. */
  label?: string
  /** Helper text rendered below the textarea. */
  description?: string
  /** Error message(s). Accepts a string, array, or react-hook-form error array. */
  error?: string | string[] | Array<{ message?: string } | undefined>
  /** Disables the textarea. @default false */
  disabled?: boolean
  /** Marks the field as required. @default false */
  required?: boolean
  /** Label/textarea layout direction. @default 'vertical' */
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
          {required && <span className="text-danger">*</span>}
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
