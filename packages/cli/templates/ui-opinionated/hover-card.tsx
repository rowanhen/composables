import type { PreviewCard as HoverCardPrimitiveBase } from '@base-ui/react/preview-card'
import type * as React from 'react'

import {
  HoverCardContent,
  HoverCard as HoverCardPrimitive,
  HoverCardTrigger,
} from '@/components/_internal/hover-card'

export interface HoverCardProps extends Omit<HoverCardPrimitiveBase.Root.Props, 'children'> {
  /** Element that triggers the hover card */
  trigger: React.ReactNode
  /** Content to display in the hover card */
  children: React.ReactNode
  /** Additional class names for the content */
  className?: string
  /** Alignment of the content relative to trigger */
  align?: 'start' | 'center' | 'end'
  /** Side to position the content */
  side?: 'top' | 'right' | 'bottom' | 'left'
}

/**
 * Opinionated HoverCard component for preview content on hover.
 *
 * @example
 * ```tsx
 * <HoverCard trigger={<a href="/user">@johndoe</a>}>
 *   <div className="flex gap-4">
 *     <Avatar src="/avatar.jpg" name="John Doe" />
 *     <div>
 *       <p className="font-medium">John Doe</p>
 *       <p className="text-muted-foreground text-sm">Software Engineer</p>
 *     </div>
 *   </div>
 * </HoverCard>
 * ```
 */
function HoverCard({
  trigger,
  children,
  className,
  align = 'center',
  side = 'bottom',
  ...hoverCardProps
}: HoverCardProps) {
  return (
    <HoverCardPrimitive {...hoverCardProps}>
      <HoverCardTrigger render={<>{trigger}</>} />
      <HoverCardContent className={className} align={align} side={side}>
        {children}
      </HoverCardContent>
    </HoverCardPrimitive>
  )
}

// Re-export sub-components for advanced usage
export { HoverCardContent, HoverCardTrigger }
export { HoverCard }
