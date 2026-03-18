import type { Slider as SliderPrimitiveBase } from '@base-ui/react/slider'
import type { VariantProps } from 'class-variance-authority'
import * as React from 'react'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/_internal/field'
import { Slider as SliderPrimitive } from '@/components/_internal/slider'

export interface FormSliderProps
  extends Omit<SliderPrimitiveBase.Root.Props, 'children' | 'orientation'> {
  label?: string
  description?: string
  error?: string | string[] | Array<{ message?: string } | undefined>
  showValue?: boolean
  valueFormatter?: (value: number | number[] | readonly number[]) => string
  orientation?: VariantProps<typeof Field>['orientation']
  className?: string
  required?: boolean
}

function FormSlider({
  label,
  description,
  error,
  showValue = false,
  valueFormatter,
  orientation = 'vertical',
  className,
  required = false,
  value,
  defaultValue,
  min = 0,
  max = 100,
  step,
  disabled,
  ...sliderProps
}: FormSliderProps) {
  const errorArray = React.useMemo(() => {
    if (!error) return undefined
    if (Array.isArray(error)) {
      return error.map((e) => (typeof e === 'string' ? { message: e } : e))
    }
    return [{ message: error }]
  }, [error])

  const hasError = Boolean(error)
  const generatedId = React.useId()
  const sliderId = sliderProps.id || generatedId

  // Format the current value for display
  const formatValue = React.useCallback(
    (val: number | number[] | readonly number[] | undefined) => {
      if (val === undefined) return ''
      if (valueFormatter) {
        return valueFormatter(val)
      }
      if (Array.isArray(val)) {
        return val.join(' - ')
      }
      return String(val)
    },
    [valueFormatter],
  )

  const currentValue = value ?? defaultValue
  const displayValue = formatValue(currentValue)

  return (
    <Field orientation={orientation} className={className} data-invalid={hasError}>
      {(label || showValue) && (
        <FieldLabel htmlFor={sliderId}>
          {label}
          {required && <span className="text-danger">*</span>}
          {showValue && displayValue && (
            <span className="ml-auto text-muted-foreground font-normal">{displayValue}</span>
          )}
        </FieldLabel>
      )}
      <FieldContent>
        <SliderPrimitive
          id={sliderId}
          value={value}
          defaultValue={defaultValue}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          aria-invalid={hasError}
          aria-required={required}
          aria-label={label || undefined}
          {...sliderProps}
        />
        {description && <FieldDescription>{description}</FieldDescription>}
        {hasError && <FieldError errors={errorArray} />}
      </FieldContent>
    </Field>
  )
}

export { FormSlider }
