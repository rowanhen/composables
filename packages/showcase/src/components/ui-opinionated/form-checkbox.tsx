import type { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox'
import type { VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { Checkbox } from '@/components/_internal/checkbox'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/_internal/field'

export interface FormCheckboxProps
  extends Omit<CheckboxPrimitive.Root.Props, 'checked' | 'onCheckedChange'> {
  label?: string
  description?: string
  error?: string | string[] | Array<{ message?: string } | undefined>
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  required?: boolean
  orientation?: VariantProps<typeof Field>['orientation']
  className?: string
  // Additional props
  id?: string
  name?: string
  'aria-label'?: string
  'aria-labelledby'?: string
}

function FormCheckbox({
  label,
  description,
  error,
  checked = false,
  onCheckedChange,
  disabled = false,
  required = false,
  orientation = 'horizontal',
  className,
  id,
  name,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...checkboxProps
}: FormCheckboxProps) {
  const errorArray = React.useMemo(() => {
    if (!error) return undefined
    if (Array.isArray(error)) {
      return error.map((e) => (typeof e === 'string' ? { message: e } : e))
    }
    return [{ message: error }]
  }, [error])

  const hasError = Boolean(error)
  const generatedId = React.useId()
  const checkboxId = id || generatedId

  return (
    <Field orientation={orientation} className={className} data-invalid={hasError}>
      <FieldContent>
        <div className="flex flex-row items-center gap-2">
          <Checkbox
            id={checkboxId}
            name={name}
            checked={checked}
            onCheckedChange={onCheckedChange}
            disabled={disabled}
            required={required}
            aria-invalid={hasError}
            aria-required={required}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy || (label ? checkboxId : undefined)}
            {...checkboxProps}
          />
          {label && (
            <FieldLabel htmlFor={checkboxId}>
              {label}
              {required && <span className="text-destructive">*</span>}
            </FieldLabel>
          )}
        </div>
        {description && <FieldDescription>{description}</FieldDescription>}
        {hasError && <FieldError errors={errorArray} />}
      </FieldContent>
    </Field>
  )
}

export { FormCheckbox }
