import type * as React from 'react'

import {
  type CarouselApi,
  Carousel as CarouselPrimitive,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

type CarouselOptions = Parameters<typeof CarouselPrimitive>[0]['opts']

export interface CarouselProps {
  /** Array of items to render as slides */
  items?: React.ReactNode[]
  /** Embla carousel options */
  opts?: CarouselOptions
  /** Orientation of the carousel */
  orientation?: 'horizontal' | 'vertical'
  /** Whether to show navigation arrows */
  showNavigation?: boolean
  /** Callback to receive the carousel API */
  setApi?: (api: CarouselApi) => void
  /** Additional class names */
  className?: string
  /** Children for advanced usage (overrides items) */
  children?: React.ReactNode
}

/**
 * Opinionated Carousel component with items array API.
 *
 * @example
 * ```tsx
 * <Carousel
 *   items={[
 *     <img src="/slide1.jpg" alt="Slide 1" />,
 *     <img src="/slide2.jpg" alt="Slide 2" />,
 *     <img src="/slide3.jpg" alt="Slide 3" />,
 *   ]}
 *   showNavigation
 * />
 *
 * // Or with advanced usage
 * <Carousel>
 *   <CarouselContent>
 *     <CarouselItem className="basis-1/3">Slide 1</CarouselItem>
 *     <CarouselItem className="basis-1/3">Slide 2</CarouselItem>
 *   </CarouselContent>
 *   <CarouselPrevious />
 *   <CarouselNext />
 * </Carousel>
 * ```
 */
function Carousel({
  items,
  opts,
  orientation = 'horizontal',
  showNavigation = false,
  setApi,
  className,
  children,
}: CarouselProps) {
  // If children provided, use primitive API
  if (children) {
    return (
      <CarouselPrimitive opts={opts} orientation={orientation} setApi={setApi} className={className}>
        {children}
      </CarouselPrimitive>
    )
  }

  // Use items array API
  return (
    <CarouselPrimitive opts={opts} orientation={orientation} setApi={setApi} className={className}>
      <CarouselContent>
        {items?.map((item, index) => <CarouselItem key={index}>{item}</CarouselItem>)}
      </CarouselContent>
      {showNavigation && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </CarouselPrimitive>
  )
}

// Re-export sub-components for advanced usage
export { type CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious }
export { Carousel }
