import { ScrollArea as ScrollAreaPrimitive } from '@base-ui/react/scroll-area'
import { ScrollBar } from '@/components/_internal/scroll-area'
import { cn, FOCUS_RING } from '@/lib/utils'

export interface ScrollAreaProps extends ScrollAreaPrimitive.Root.Props {
  /**
   * Maximum height of the scroll area
   * Common values: 'sm' (200px), 'md' (400px), 'lg' (600px), 'xl' (800px)
   * Or provide a custom value like '50vh', '300px', etc.
   */
  maxHeight?: 'sm' | 'md' | 'lg' | 'xl' | string
  /**
   * Fixed height of the scroll area
   * Overrides maxHeight if provided
   */
  height?: string
  /**
   * Show horizontal scrollbar
   * @default false
   */
  showHorizontal?: boolean
  /**
   * Show vertical scrollbar
   * @default true
   */
  showVertical?: boolean
}

const maxHeightMap = {
  sm: 'max-h-[12.5rem]',
  md: 'max-h-[25rem]',
  lg: 'max-h-[37.5rem]',
  xl: 'max-h-[50rem]',
} as const

function ScrollArea({
  maxHeight,
  height,
  showHorizontal = false,
  showVertical = true,
  className,
  children,
  style,
  ...props
}: ScrollAreaProps) {
  // Determine height classes and styles
  const heightClass = height
    ? ''
    : maxHeight && maxHeight in maxHeightMap
      ? maxHeightMap[maxHeight as keyof typeof maxHeightMap]
      : ''

  const heightStyle = height
    ? { height, ...style }
    : maxHeight && !(maxHeight in maxHeightMap)
      ? { maxHeight, ...style }
      : style

  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn('relative', heightClass, className)}
      style={heightStyle}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className={`${FOCUS_RING} size-full rounded-[inherit] transition-[box-shadow] outline-none focus-visible:outline-1`}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      {showVertical && <ScrollBar orientation="vertical" />}
      {showHorizontal && <ScrollBar orientation="horizontal" />}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

// Re-export sub-components for advanced usage
export { ScrollBar } from '@/components/_internal/scroll-area'

export { ScrollArea }
