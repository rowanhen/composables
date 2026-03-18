import type { VariantProps } from 'class-variance-authority'
import * as React from 'react'

import {
  ACCEPT_PRESETS,
  type Accept,
  DEFAULT_ACCEPT,
  DEFAULT_MAX_SIZE,
  DropZone,
  DropZoneArea,
  DropZoneContent,
  DropZoneFile,
  DropZoneInput,
  type FileRejection,
  getRejectionMessage,
} from '@/components/_internal/dropzone'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/_internal/field'

export interface FormDropZoneProps {
  ref?: React.Ref<HTMLDivElement>
  value: File | null
  onChange: (file: File | null) => void
  label?: string
  description?: string
  prompt?: string
  error?: string | string[] | Array<{ message?: string } | undefined>
  maxSizeBytes?: number
  accept?: Accept
  disabled?: boolean
  required?: boolean
  orientation?: VariantProps<typeof Field>['orientation']
  className?: string
}

function FormDropZone({
  ref,
  value,
  onChange,
  label,
  description,
  prompt,
  error,
  maxSizeBytes = DEFAULT_MAX_SIZE,
  accept = DEFAULT_ACCEPT,
  disabled = false,
  required = false,
  orientation = 'vertical',
  className,
}: FormDropZoneProps) {
  const [rejectionError, setRejectionError] = React.useState<string | null>(null)

  const onDrop = React.useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (acceptedFiles.length > 0) {
        onChange(acceptedFiles[0])
        setRejectionError(null)
      } else if (fileRejections.length > 0) {
        const code = fileRejections[0].errors[0]?.code
        if (code) {
          setRejectionError(getRejectionMessage(code, maxSizeBytes, accept))
        }
      }
    },
    [onChange, maxSizeBytes, accept],
  )

  const handleRemove = React.useCallback(() => {
    onChange(null)
    setRejectionError(null)
  }, [onChange])

  const errorArray = React.useMemo(() => {
    if (error) {
      if (Array.isArray(error)) {
        return error.map((e) => (typeof e === 'string' ? { message: e } : e))
      }
      return [{ message: error }]
    }
    if (rejectionError) {
      return [{ message: rejectionError }]
    }
    return undefined
  }, [error, rejectionError])

  const hasError = Boolean(errorArray?.length)

  return (
    <Field
      ref={ref}
      tabIndex={-1}
      orientation={orientation}
      className={className}
      data-invalid={hasError}
    >
      {label && (
        <FieldLabel>
          {label}
          {required && <span className="text-destructive">*</span>}
        </FieldLabel>
      )}
      <FieldContent>
        <DropZone
          onDrop={onDrop}
          accept={accept}
          maxSizeBytes={maxSizeBytes}
          disabled={disabled}
          hasError={hasError}
          hasFiles={!!value}
        >
          <DropZoneArea>
            <DropZoneInput />
            {value ? (
              <DropZoneFile file={value} onRemove={handleRemove} disabled={disabled} />
            ) : (
              <DropZoneContent description={prompt} />
            )}
          </DropZoneArea>
        </DropZone>
        {description && <FieldDescription>{description}</FieldDescription>}
        {hasError && <FieldError errors={errorArray} />}
      </FieldContent>
    </Field>
  )
}

export { FormDropZone, ACCEPT_PRESETS }
