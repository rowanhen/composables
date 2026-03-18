// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.
import type { Switch as SwitchPrimitive } from '@base-ui/react/switch'
import type { VariantProps } from 'class-variance-authority'
import * as React from 'react'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/_internal/field'
import { Switch } from '@/components/_internal/switch'

export interface FormSwitchProps
  extends Omit<SwitchPrimitive.Root.Props, 'checked' | 'onCheckedChange'> {
  label?: string
  description?: string
  error?: string | string[] | Array<{ message?: string } | undefined>
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  required?: boolean
  orientation?: VariantProps<typeof Field>['orientation']
  size?: 'sm' | 'default'
  className?: string
  // Additional props
  id?: string
  name?: string
  'aria-label'?: string
  'aria-labelledby'?: string
}

function FormSwitch({
  label,
  description,
  error,
  checked = false,
  onCheckedChange,
  disabled = false,
  required = false,
  orientation = 'horizontal',
  size = 'default',
  className,
  id,
  name,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...switchProps
}: FormSwitchProps) {
  const errorArray = React.useMemo(() => {
    if (!error) return undefined
    if (Array.isArray(error)) {
      return error.map((e) => (typeof e === 'string' ? { message: e } : e))
    }
    return [{ message: error }]
  }, [error])

  const hasError = Boolean(error)
  const generatedId = React.useId()
  const switchId = id || generatedId

  const hasLabelOrDescription = Boolean(label || description)

  return (
    <Field orientation={orientation} className={className} data-invalid={hasError}>
      <FieldContent
        className={orientation === 'horizontal' ? 'flex-row items-center gap-2' : undefined}
      >
        {hasLabelOrDescription && (
          <div className="flex flex-col gap-0.5 flex-1">
            {label && (
              <FieldLabel htmlFor={switchId}>
                {label}
                {required && <span className="text-destructive">*</span>}
              </FieldLabel>
            )}
            {description && <FieldDescription>{description}</FieldDescription>}
          </div>
        )}
        <Switch
          id={switchId}
          name={name}
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          required={required}
          aria-invalid={hasError}
          aria-required={required}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy || (label ? switchId : undefined)}
          size={size}
          {...switchProps}
        />
        {hasError && <FieldError errors={errorArray} />}
      </FieldContent>
    </Field>
  )
}

export { FormSwitch }
