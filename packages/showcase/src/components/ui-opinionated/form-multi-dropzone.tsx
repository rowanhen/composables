// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.
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
  DropZoneFileList,
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

export interface FormMultiDropZoneProps {
  value: File[]
  onChange: (files: File[]) => void
  label?: string
  description?: string
  prompt?: string
  error?: string | string[] | Array<{ message?: string } | undefined>
  maxSizeBytes?: number
  maxFiles?: number
  accept?: Accept
  disabled?: boolean
  required?: boolean
  orientation?: VariantProps<typeof Field>['orientation']
  className?: string
}

function FormMultiDropZone({
  value,
  onChange,
  label,
  description,
  prompt,
  error,
  maxSizeBytes = DEFAULT_MAX_SIZE,
  maxFiles,
  accept = DEFAULT_ACCEPT,
  disabled = false,
  required = false,
  orientation = 'vertical',
  className,
}: FormMultiDropZoneProps) {
  const [rejectionError, setRejectionError] = React.useState<string | null>(null)

  const remainingSlots = maxFiles ? maxFiles - value.length : undefined

  const onDrop = React.useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (acceptedFiles.length > 0) {
        const newFiles = [...value, ...acceptedFiles]
        // Limit to maxFiles if specified (handles cumulative selection)
        const limitedFiles = maxFiles ? newFiles.slice(0, maxFiles) : newFiles
        onChange(limitedFiles)
        setRejectionError(null)
      }
      if (fileRejections.length > 0) {
        const code = fileRejections[0].errors[0]?.code
        if (code) {
          setRejectionError(getRejectionMessage(code, maxSizeBytes, accept, maxFiles))
        }
      }
    },
    [onChange, value, maxFiles, maxSizeBytes, accept],
  )

  const handleRemove = React.useCallback(
    (index: number) => {
      const newFiles = value.filter((_, i) => i !== index)
      onChange(newFiles)
      setRejectionError(null)
    },
    [onChange, value],
  )

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
  const hasFiles = value.length > 0
  const canAddMore = !maxFiles || value.length < maxFiles

  return (
    <Field orientation={orientation} className={className} data-invalid={hasError}>
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
          maxFiles={remainingSlots}
          multiple
          disabled={disabled || !canAddMore}
          hasError={hasError}
          hasFiles={hasFiles}
        >
          <DropZoneArea>
            <DropZoneInput />
            {hasFiles ? (
              <div className="flex flex-col gap-4">
                <DropZoneFileList files={value} onRemove={handleRemove} disabled={disabled} />
                {canAddMore && (
                  <div className="text-muted-foreground border-t pt-4 text-center text-xs">
                    Drop more files or click to add
                  </div>
                )}
              </div>
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

export { FormMultiDropZone, ACCEPT_PRESETS }
