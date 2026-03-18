import type { VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import {
  AvatarFallback,
  Avatar as AvatarPrimitive,
  AvatarImage,
  avatarVariants,
} from '@/components/_internal/avatar'

/**
 * Get initials from a name string.
 * Takes first letter of first and last words, or first two letters if single word.
 */
function getInitials(name: string): string {
  const words = name.trim().split(/\s+/)
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase()
  }
  return (words[0][0] + words[words.length - 1][0]).toUpperCase()
}

export interface AvatarProps extends VariantProps<typeof avatarVariants> {
  /** Image source URL */
  src?: string
  /** Alt text for the image */
  alt?: string
  /** Name for generating fallback initials */
  name?: string
  /** Custom fallback content (overrides name-based initials) */
  fallback?: React.ReactNode
  /** Additional class names */
  className?: string
}

/**
 * Opinionated Avatar component with automatic initials fallback.
 *
 * @example
 * ```tsx
 * <Avatar src="/avatar.jpg" name="John Doe" />
 * <Avatar name="Jane Smith" size="lg" />
 * <Avatar src="/user.png" fallback="?" />
 * ```
 */
function Avatar({ src, alt, name, fallback, size, className }: AvatarProps) {
  const displayFallback = fallback ?? (name ? getInitials(name) : '?')

  return (
    <AvatarPrimitive size={size} className={className}>
      {src && <AvatarImage src={src} alt={alt ?? name ?? 'Avatar'} />}
      <AvatarFallback>{displayFallback}</AvatarFallback>
    </AvatarPrimitive>
  )
}

// Re-export sub-components for advanced usage
export { AvatarFallback, AvatarImage, avatarVariants }
export { Avatar }
