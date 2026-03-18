import {
  ProgressIndicator,
  ProgressLabel,
  Progress as ProgressPrimitive,
  ProgressTrack,
  ProgressValue,
} from '@/components/_internal/progress'

export interface ProgressProps {
  /** Progress value (0-100) */
  value: number
  /** Optional label text */
  label?: string
  /** Whether to display the numeric value */
  showValue?: boolean
  /** Additional class names */
  className?: string
}

/**
 * Opinionated Progress component with simplified props.
 *
 * @example
 * ```tsx
 * <Progress value={75} />
 * <Progress value={50} label="Uploading" showValue />
 * <Progress value={100} label="Complete" />
 * ```
 */
function Progress({ value, label, showValue = false, className }: ProgressProps) {
  return (
    <ProgressPrimitive value={value} className={className}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <ProgressLabel>{label}</ProgressLabel>}
          {showValue && <ProgressValue />}
        </div>
      )}
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </ProgressPrimitive>
  )
}

// Re-export sub-components for advanced usage
export { ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue }
export { Progress }
