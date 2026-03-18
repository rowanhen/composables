import type { VariantProps } from 'class-variance-authority'
import * as React from 'react'

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/_internal/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/_internal/input-group'
import { type NumericInputOptions, useNumericInput } from '@/hooks/use-numeric-input'

export interface FormInputGroupInputProps
  extends Omit<
      React.ComponentProps<'input'>,
      'disabled' | 'required' | 'aria-invalid' | 'aria-required'
    >,
    NumericInputOptions {}

export interface FormInputGroupProps {
  ref?: React.Ref<HTMLInputElement>
  label?: string
  description?: string
  error?: string | string[] | Array<{ message?: string } | undefined>
  disabled?: boolean
  required?: boolean
  orientation?: VariantProps<typeof Field>['orientation']
  className?: string
  // Input props (includes numeric options)
  inputProps?: FormInputGroupInputProps
  // Textarea props (alternative to input)
  textareaProps?: Omit<
    React.ComponentProps<'textarea'>,
    'disabled' | 'required' | 'aria-invalid' | 'aria-required'
  >
  // Addon props
  startAddon?: React.ReactNode
  startAddonProps?: React.ComponentProps<typeof InputGroupAddon>
  endAddon?: React.ReactNode
  endAddonProps?: React.ComponentProps<typeof InputGroupAddon>
  // Button props
  startButton?: React.ReactNode
  startButtonProps?: React.ComponentProps<typeof InputGroupButton>
  endButton?: React.ReactNode
  endButtonProps?: React.ComponentProps<typeof InputGroupButton>
  // Text props
  startText?: React.ReactNode
  endText?: React.ReactNode
  id?: string
}

function FormInputGroup({
  ref,
  label,
  description,
  error,
  disabled = false,
  required = false,
  orientation = 'vertical',
  className,
  inputProps,
  textareaProps,
  startAddon,
  startAddonProps,
  endAddon,
  endAddonProps,
  startButton,
  startButtonProps,
  endButton,
  endButtonProps,
  startText,
  endText,
  id,
}: FormInputGroupProps) {
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
  const isTextarea = Boolean(textareaProps)

  // Extract numeric options from inputProps
  const {
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
  } = inputProps ?? {}

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
          {required && <span className="text-danger">*</span>}
        </FieldLabel>
      )}
      <FieldContent>
        <InputGroup data-invalid={hasError}>
          {startAddon && (
            <InputGroupAddon align="inline-start" {...startAddonProps}>
              {startAddon}
            </InputGroupAddon>
          )}
          {startButton && (
            <InputGroupAddon align="inline-start" {...startAddonProps}>
              <InputGroupButton {...startButtonProps}>{startButton}</InputGroupButton>
            </InputGroupAddon>
          )}
          {startText && (
            <InputGroupAddon align="inline-start" {...startAddonProps}>
              <InputGroupText>{startText}</InputGroupText>
            </InputGroupAddon>
          )}
          {isTextarea ? (
            <InputGroupTextarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              id={inputId}
              disabled={disabled}
              required={required}
              aria-invalid={hasError}
              aria-required={required}
              {...textareaProps}
            />
          ) : (
            <InputGroupInput
              ref={ref}
              id={inputId}
              disabled={disabled}
              required={required}
              aria-invalid={hasError}
              aria-required={required}
              {...restInputProps}
              {...numericInputProps}
            />
          )}
          {endText && (
            <InputGroupAddon align="inline-end" {...endAddonProps}>
              <InputGroupText>{endText}</InputGroupText>
            </InputGroupAddon>
          )}
          {endButton && (
            <InputGroupAddon align="inline-end" {...endAddonProps}>
              <InputGroupButton {...endButtonProps}>{endButton}</InputGroupButton>
            </InputGroupAddon>
          )}
          {endAddon && (
            <InputGroupAddon align="inline-end" {...endAddonProps}>
              {endAddon}
            </InputGroupAddon>
          )}
        </InputGroup>
        {description && <FieldDescription>{description}</FieldDescription>}
        {hasError && <FieldError errors={errorArray} />}
      </FieldContent>
    </Field>
  )
}

export { FormInputGroup }
