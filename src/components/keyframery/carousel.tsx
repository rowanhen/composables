'use client'

export * from './primitives/carousel'

/* Theming: set on a part or its ancestor; unset variables preserve the original theme.
   --carousel-gap: Slide and component spacing (default: 0.75rem).
   --carousel-radius: Viewport corners (default: --radius-2xl).
   --carousel-key-size: Arrow key size (default: 2rem).
   --carousel-face: Arrow keys and indicator well (default: --background (dark --accent) / --muted).
   --carousel-ink: Arrow icons, dots and progress (default: --foreground, opacity 20% / 45% / 10% / 70% by state).
 */

/* Styled carousel: the animated primitive plus the Keyframery look. */

import {
	Carousel as CarouselRoot,
	CarouselContent as CarouselContentPart,
	CarouselIndicator as CarouselIndicatorPart,
	CarouselIndicatorGroup as CarouselIndicatorGroupPart,
	CarouselItem as CarouselItemPart,
	CarouselNext as CarouselNextPart,
	CarouselPlayToggle as CarouselPlayTogglePart,
	CarouselPrevious as CarouselPreviousPart,
	CarouselViewport as CarouselViewportPart,
} from './primitives/carousel'
import * as React from 'react'
import { PauseIcon, PlayIcon } from 'lucide-react'

import { Speed, type SpeedProps } from './motion'
import { cn } from '../../lib/utils'
import { buttonClassName } from './button'

/* UI SDK accepts a class name or a function of state; keep both working. */
function withClass<S>(
	base: string,
	className: string | ((state: S) => string | undefined) | undefined,
) {
	return typeof className === 'function'
		? (state: S) => cn(base, className(state))
		: cn(base, className)
}

function Carousel({
	speed,
	className,
	...props
}: React.ComponentProps<typeof CarouselRoot> & SpeedProps) {
	return (
		<Speed speed={speed}>
			<CarouselRoot
				className={withClass(
					'group/carousel relative flex flex-col gap-[var(--carousel-gap,0.75rem)]',
					className,
				)}
				{...props}
			/>
		</Speed>
	)
}

/* The scrolling window. UI SDK writes its overflow and snapping inline; the scrollbar is hidden. */
function CarouselViewport({
	className,
	...props
}: React.ComponentProps<typeof CarouselViewportPart>) {
	return (
		<CarouselViewportPart
			className={withClass(
				cn(
					'rounded-[var(--carousel-radius,var(--radius-2xl))] outline-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
					'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
					'data-dragging:cursor-grabbing',
				),
				className,
			)}
			{...props}
		/>
	)
}

function CarouselContent({
	className,
	...props
}: React.ComponentProps<typeof CarouselContentPart>) {
	return (
		<CarouselContentPart
			className={withClass(
				'flex gap-[var(--carousel-gap,0.75rem)] data-[orientation=vertical]:flex-col',
				className,
			)}
			{...props}
		/>
	)
}

/* One slide to a view. The leaving slide sinks back and dims (from the primitive). */
function CarouselItem({ className, ...props }: React.ComponentProps<typeof CarouselItemPart>) {
	return (
		<CarouselItemPart
			className={withClass('min-w-0 shrink-0 grow-0 basis-full', className)}
			{...props}
		/>
	)
}

/* Round keys. At the ends they stay focusable but quiet down. */
function Chevron({ d }: { d: string }) {
	return (
		<svg
			aria-hidden
			className="group-data-[orientation=vertical]/carousel:rotate-90 group-data-[orientation=horizontal]/carousel:rtl:rotate-180"
			viewBox="0 0 16 16"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d={d} />
		</svg>
	)
}

function CarouselPrevious({
	className,
	children,
	...props
}: React.ComponentProps<typeof CarouselPreviousPart>) {
	return (
		<CarouselPreviousPart
			aria-label="Previous slide"
			className={buttonClassName(className, {
				size: 'icon',
				render: Boolean(props.render),
				extra:
					'size-[var(--carousel-key-size,var(--button-height,2rem))] rounded-[var(--button-radius,9999px)]',
			})}
			{...props}
		>
			{children ?? <Chevron d="m10 4-4 4 4 4" />}
		</CarouselPreviousPart>
	)
}

function CarouselNext({
	className,
	children,
	...props
}: React.ComponentProps<typeof CarouselNextPart>) {
	return (
		<CarouselNextPart
			aria-label="Next slide"
			className={buttonClassName(className, {
				size: 'icon',
				render: Boolean(props.render),
				extra:
					'size-[var(--carousel-key-size,var(--button-height,2rem))] rounded-[var(--button-radius,9999px)]',
			})}
			{...props}
		>
			{children ?? <Chevron d="m6 4 4 4-4 4" />}
		</CarouselNextPart>
	)
}

function CarouselPlayToggle({
	className,
	children,
	...props
}: React.ComponentProps<typeof CarouselPlayTogglePart>) {
	return (
		<CarouselPlayTogglePart
			className={buttonClassName(className, {
				size: 'icon',
				render: Boolean(props.render),
				extra:
					'size-[var(--carousel-key-size,var(--button-height,2rem))] rounded-[var(--button-radius,9999px)]',
			})}
			{...props}
		>
			{children ??
				((state) => (
					<>
						{state.playing ? <PauseIcon aria-hidden /> : <PlayIcon aria-hidden />}
						<span className="sr-only">{state.playing ? 'Pause slideshow' : 'Play slideshow'}</span>
					</>
				))}
		</CarouselPlayTogglePart>
	)
}

/* The dots sit in a small pill well. */
function CarouselIndicatorGroup({
	className,
	...props
}: React.ComponentProps<typeof CarouselIndicatorGroupPart>) {
	return (
		<CarouselIndicatorGroupPart
			className={withClass(
				cn(
					'inline-flex h-5 w-fit items-center gap-1 rounded-full bg-[var(--carousel-face,var(--muted))] px-1.5',
					'shadow-[inset_0_1px_2px_rgb(0_0_0/0.07),inset_0_0_0_1px_rgb(0_0_0/0.035)]',
					'dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.5),inset_0_0_0_1px_rgb(255_255_255/0.04)]',
				),
				className,
			)}
			{...props}
		/>
	)
}

/* The current dot is a short bar; it widens on a spring (from the primitive). */
function CarouselIndicator({
	className,
	...props
}: React.ComponentProps<typeof CarouselIndicatorPart>) {
	return (
		<CarouselIndicatorPart
			className={withClass(
				cn(
					'relative h-1.5 w-1.5 cursor-pointer rounded-full bg-[color-mix(in_oklab,var(--carousel-ink,var(--foreground))_20%,transparent)] outline-none',
					'hover:bg-[color-mix(in_oklab,var(--carousel-ink,var(--foreground))_45%,transparent)] data-selected:w-5 data-selected:bg-[var(--carousel-ink,var(--foreground))]',
					/* A larger hit area than the dot itself. */
					'after:absolute after:-inset-x-0.5 after:-inset-y-2',
					'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-muted',
				),
				className,
			)}
			{...props}
		/>
	)
}

/* A hairline that follows --carousel-progress on every frame of the scroll. */
function CarouselProgress({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			aria-hidden
			data-slot="carousel-progress"
			className={cn(
				'h-0.5 w-full overflow-hidden rounded-full bg-[color-mix(in_oklab,var(--carousel-ink,var(--foreground))_10%,transparent)]',
				className,
			)}
			{...props}
		>
			<div className="h-full w-full origin-left scale-x-(--carousel-progress) rounded-full bg-[color-mix(in_oklab,var(--carousel-ink,var(--foreground))_70%,transparent)] rtl:origin-right" />
		</div>
	)
}

export {
	Carousel,
	CarouselContent,
	CarouselIndicator,
	CarouselIndicatorGroup,
	CarouselItem,
	CarouselNext,
	CarouselPlayToggle,
	CarouselPrevious,
	CarouselProgress,
	CarouselViewport,
}

/* UI SDK's helpers for this component, passed through. */
export { createCarouselController } from './primitives/carousel'
