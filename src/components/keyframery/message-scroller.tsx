'use client'

export * from './primitives/message-scroller'

/* Theming variables (set on a part or ancestor; absent values preserve the theme):
   --message-scroller-face: Jump button surface; default: bg-background.
   --message-scroller-ink: Jump button text; default: text-foreground.
   --message-scroller-unread-face: Unread surface; default: bg-primary.
   --message-scroller-font: Jump label size; default: text-xs.
   --message-scroller-height: Jump button height; default: h-8.
   --message-scroller-icon-size: Jump icon; default: size-3.5.
   --message-scroller-gap: Message spacing; default: gap-4.
   --message-scroller-padding: Conversation inset; default: p-4.
*/

/* A styled chat scroller: the animated primitive inside Keyframery's scroll area. The edges fade
   where more conversation waits, the slim scrollbar shows on hover, and "jump to latest" is a small
   key that rises from the bottom edge with the number of new messages. */

import * as React from 'react'

import {
	MessageScrollerButton as MessageScrollerButtonPrimitive,
	MessageScrollerItem as MessageScrollerItemPrimitive,
	MessageScrollerLabel,
	type MessageScrollerRootProps,
	useMessageScrollerRoot,
} from './primitives/message-scroller'
import {
	ScrollArea,
	ScrollAreaContent,
	ScrollAreaScrollbar,
	ScrollAreaThumb,
	ScrollAreaViewport,
} from './scroll-area'
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

/* Give it a height (or put it in a column that has one). */
function MessageScroller({
	speed,
	stickToEnd = true,
	className,
	...props
}: MessageScrollerRootProps & SpeedProps) {
	const root = useMessageScrollerRoot(
		{ ...props, className: withClass('relative flex min-h-0 flex-col', className) },
		(controller, children) => (
			<ScrollArea
				controller={controller}
				stickToEnd={stickToEnd}
				className="min-h-0 flex-1 rounded-[inherit]"
			>
				{children}
				<ScrollAreaScrollbar>
					<ScrollAreaThumb />
				</ScrollAreaScrollbar>
			</ScrollArea>
		),
	)
	return <Speed speed={speed}>{root}</Speed>
}

/* The real scroller, a `log`. Name it with `aria-label`. */
function MessageScrollerViewport({
	role = 'log',
	className,
	...props
}: React.ComponentProps<typeof ScrollAreaViewport>) {
	return <ScrollAreaViewport role={role} className={className} {...props} />
}

function MessageScrollerContent({
	className,
	...props
}: React.ComponentProps<typeof ScrollAreaContent>) {
	return (
		<ScrollAreaContent
			className={withClass(
				'flex min-h-full flex-col justify-end gap-[var(--message-scroller-gap,1rem)] p-[var(--message-scroller-padding,1rem)]',
				className,
			)}
			{...props}
		/>
	)
}

function MessageScrollerItem({
	className,
	...props
}: React.ComponentProps<typeof MessageScrollerItemPrimitive>) {
	return (
		<MessageScrollerItemPrimitive className={withClass('min-w-0 shrink-0', className)} {...props} />
	)
}

/* A small key, centred over the bottom edge. */
function MessageScrollerButton({
	className,
	...props
}: React.ComponentProps<typeof MessageScrollerButtonPrimitive>) {
	return (
		<MessageScrollerButtonPrimitive
			className={buttonClassName(className, {
				render: Boolean(props.render),
				extra:
					'absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rtl:translate-x-1/2 rounded-[var(--button-radius,9999px)] has-data-unread:bg-primary has-data-unread:text-primary-foreground dark:has-data-unread:bg-primary',
			})}
			{...props}
		/>
	)
}

export {
	MessageScroller,
	MessageScrollerButton,
	MessageScrollerContent,
	MessageScrollerItem,
	MessageScrollerLabel,
	MessageScrollerViewport,
}
export { createScrollAreaController } from './primitives/message-scroller'
