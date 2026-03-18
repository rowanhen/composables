import type { VariantProps } from 'class-variance-authority'
import { Loader2Icon } from 'lucide-react'
import type * as React from 'react'

import { Button as ButtonPrimitive, type buttonVariants } from '@/components/_internal/button'

/**
 * Props for the opinionated Button component.
 *
 * @example
 * ```tsx
 * <Button>Save</Button>
 * <Button variant="outline" size="sm">Cancel</Button>
 * <Button loading>Submitting...</Button>
 * <Button variant="destructive" type="submit">Delete</Button>
 * ```
 */
export interface ButtonProps extends Omit<React.ComponentProps<'button'>, 'size'> {
  /** Visual style variant. @default 'default' */
  variant?: VariantProps<typeof buttonVariants>['variant']
  /** Size variant. @default 'default' */
  size?: VariantProps<typeof buttonVariants>['size']
  className?: string
  /** Disables the button and prevents interaction. @default false */
  disabled?: boolean
  /** Shows a spinner and disables the button. Replaces children while active. @default false */
  loading?: boolean
  /** HTML button type attribute. @default 'button' */
  type?: 'button' | 'submit' | 'reset'
  children: React.ReactNode
}

function Button({
  variant = 'default',
  size = 'default',
  className,
  disabled = false,
  loading = false,
  type = 'button',
  children,
  ...buttonProps
}: ButtonProps) {
  const isDisabled = disabled || loading

  return (
    <ButtonPrimitive
      variant={variant}
      size={size}
      className={className}
      disabled={isDisabled}
      type={type}
      {...buttonProps}
    >
      {loading ? <Loader2Icon className="animate-spin" /> : children}
    </ButtonPrimitive>
  )
}

export { Button }
