import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import {
	createContext,
	forwardRef,
	useContext,
	useEffect,
	useId,
	useImperativeHandle,
	useRef,
	useState,
	type ComponentPropsWithoutRef,
	type PointerEvent,
	type CSSProperties,
} from 'react'
import { cn, FOCUS_RING } from '../lib/utils'
import {
	getFlowEdges,
	getFlowPath,
	type FlowTree,
	type FlowOrientation,
	type FlowPoint,
} from '../lib/flow'

export type FlowAlign = 'start' | 'center'
const FlowContext = createContext<{ orientation: FlowOrientation; align: FlowAlign }>({
	orientation: 'horizontal',
	align: 'start',
})
const sequenceClasses = (orientation: FlowOrientation, align: FlowAlign) =>
	cn(
		'flex w-max list-none gap-(--flow-gap) p-0',
		orientation === 'vertical' ? 'flex-col' : 'flex-row',
		align === 'center' ? 'items-center' : 'items-start',
	)

function readTree(element: HTMLElement): FlowTree | undefined {
	const kind = element.dataset.flowKind
	if (kind === 'node') {
		const id = element.querySelector<HTMLElement>('[data-flow-node]')?.dataset.flowNode
		return id ? { kind: 'node', id } : undefined
	}
	if (kind !== 'sequence' && kind !== 'parallel') return
	const items = element.querySelector<HTMLElement>(':scope > [data-flow-items]') ?? element
	const children = Array.from(items.children).flatMap((child) => {
		const tree = child instanceof HTMLElement ? readTree(child) : undefined
		return tree ? [tree] : []
	})
	return { kind, children }
}

export interface FlowRootProps extends ComponentPropsWithoutRef<'div'> {
	orientation?: FlowOrientation
	align?: FlowAlign
	/** Scrollable canvas with mouse dragging and native touch/keyboard scrolling. @default true */
	canvas?: boolean
	onOverflowChange?: (overflow: { x: boolean; y: boolean }) => void
}
interface MeasuredFlow {
	width: number
	height: number
	paths: { id: string; d: string; disabled: boolean }[]
}

export const FlowRoot = forwardRef<HTMLDivElement, FlowRootProps>(function FlowRoot(
	{
		orientation = 'horizontal',
		align = 'start',
		canvas = true,
		onOverflowChange,
		className,
		children,
		dir,
		onPointerDown,
		onPointerMove,
		onPointerUp,
		onPointerCancel,
		onLostPointerCapture,
		...props
	},
	ref,
) {
	const viewportRef = useRef<HTMLDivElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)
	const overflowCallback = useRef(onOverflowChange)
	useEffect(() => {
		overflowCallback.current = onOverflowChange
	}, [onOverflowChange])
	const [drawing, setDrawing] = useState<MeasuredFlow>({ width: 0, height: 0, paths: [] })
	const [panning, setPanning] = useState(false)
	const drag = useRef<{ x: number; y: number; left: number; top: number } | null>(null)
	useImperativeHandle(ref, () => viewportRef.current!, [])
	useEffect(() => {
		const viewport = viewportRef.current
		const content = contentRef.current
		if (!viewport || !content) return
		let frame = 0
		let overflowKey = ''
		const measure = () => {
			const list = content.querySelector<HTMLElement>(':scope > [data-flow-items]')
			const tree = list && readTree(list)
			const origin = content.getBoundingClientRect()
			const rtl = getComputedStyle(content).direction === 'rtl'
			const nodes = new Map<string, HTMLElement>()
			for (const node of content.querySelectorAll<HTMLElement>('[data-flow-node]')) {
				if (node.closest('[data-slot="flow"]') === viewport && node.dataset.flowNode)
					nodes.set(node.dataset.flowNode, node)
			}
			const point = (node: HTMLElement, exit: boolean): FlowPoint => {
				const rect = node.getBoundingClientRect()
				const anchor = node.querySelector<HTMLElement>(
					`[data-flow-anchor="${exit ? 'end' : 'start'}"], [data-flow-anchor="both"]`,
				)
				const cross = anchor?.getBoundingClientRect() ?? rect
				return orientation === 'vertical'
					? {
							x: cross.left + cross.width / 2 - origin.left,
							y: (exit ? rect.bottom : rect.top) - origin.top,
						}
					: {
							x: (exit !== rtl ? rect.right : rect.left) - origin.left,
							y: cross.top + cross.height / 2 - origin.top,
						}
			}
			const paths = (tree ? getFlowEdges(tree) : []).flatMap((edge) => {
				const from = nodes.get(edge.from),
					to = nodes.get(edge.to)
				if (!from || !to) return []
				const disabled = [from, to].some(
					(node) =>
						node.closest('[data-flow-kind="node"]')?.getAttribute('data-disabled') === 'true',
				)
				return [
					{
						id: `${edge.from}-${edge.to}`,
						d: getFlowPath(point(from, true), point(to, false), orientation),
						disabled,
					},
				]
			})
			const next = { width: content.offsetWidth, height: content.offsetHeight, paths }
			setDrawing((previous) =>
				JSON.stringify(previous) === JSON.stringify(next) ? previous : next,
			)
			const overflow = {
				x: viewport.scrollWidth > viewport.clientWidth,
				y: viewport.scrollHeight > viewport.clientHeight,
			}
			const key = JSON.stringify(overflow)
			if (key !== overflowKey) {
				overflowKey = key
				overflowCallback.current?.(overflow)
			}
		}
		const schedule = () => {
			cancelAnimationFrame(frame)
			frame = requestAnimationFrame(measure)
		}
		const resize = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(schedule)
		const observeSizes = () => {
			resize?.disconnect()
			resize?.observe(content)
			resize?.observe(viewport)
			for (const node of content.querySelectorAll<HTMLElement>(
				'[data-flow-node], [data-flow-anchor]',
			))
				resize?.observe(node)
		}
		const mutation = new MutationObserver(() => {
			observeSizes()
			schedule()
		})
		mutation.observe(content, {
			subtree: true,
			childList: true,
			characterData: true,
			attributes: true,
			attributeFilter: ['class', 'style', 'data-disabled', 'dir'],
		})
		mutation.observe(viewport, { attributes: true, attributeFilter: ['dir'] })
		observeSizes()
		measure()
		window.addEventListener('resize', schedule)
		return () => {
			cancelAnimationFrame(frame)
			resize?.disconnect()
			mutation.disconnect()
			window.removeEventListener('resize', schedule)
		}
	}, [orientation, align, canvas, dir])
	const stopDrag = (event: PointerEvent<HTMLDivElement>) => {
		drag.current = null
		setPanning(false)
		if (event.currentTarget.hasPointerCapture(event.pointerId))
			event.currentTarget.releasePointerCapture(event.pointerId)
	}
	return (
		<FlowContext.Provider value={{ orientation, align }}>
			<div
				ref={viewportRef}
				data-slot="flow"
				data-orientation={orientation}
				dir={dir}
				role="group"
				aria-label="Flow diagram"
				tabIndex={canvas ? 0 : undefined}
				className={cn(
					'max-w-full outline-none',
					canvas &&
						'overflow-auto rounded-(--flow-canvas-radius) border-(length:--flow-border-width) border-stroke bg-muted bg-[image:var(--flow-canvas-background-image)] [background-size:var(--flow-canvas-background-size)_var(--flow-canvas-background-size)]',
					canvas && FOCUS_RING,
					panning && 'cursor-grabbing select-none',
					className,
				)}
				{...props}
				onPointerDown={(event) => {
					onPointerDown?.(event)
					if (
						!canvas ||
						event.defaultPrevented ||
						event.button !== 0 ||
						event.pointerType !== 'mouse' ||
						!(event.target instanceof Element) ||
						event.target.closest('[data-flow-kind="node"], a, button, input, textarea, select')
					)
						return
					const el = event.currentTarget
					if (el.scrollWidth <= el.clientWidth && el.scrollHeight <= el.clientHeight) return
					drag.current = {
						x: event.clientX,
						y: event.clientY,
						left: el.scrollLeft,
						top: el.scrollTop,
					}
					el.setPointerCapture(event.pointerId)
					setPanning(true)
					event.preventDefault()
				}}
				onPointerMove={(event) => {
					onPointerMove?.(event)
					if (event.defaultPrevented || !drag.current) return
					event.currentTarget.scrollLeft = drag.current.left - (event.clientX - drag.current.x)
					event.currentTarget.scrollTop = drag.current.top - (event.clientY - drag.current.y)
				}}
				onPointerUp={(event) => {
					onPointerUp?.(event)
					stopDrag(event)
				}}
				onPointerCancel={(event) => {
					onPointerCancel?.(event)
					stopDrag(event)
				}}
				onLostPointerCapture={(event) => {
					onLostPointerCapture?.(event)
					drag.current = null
					setPanning(false)
				}}
			>
				<div
					ref={contentRef}
					data-slot="flow-content"
					className={cn(
						'relative w-max min-w-full',
						canvas && 'px-(--flow-canvas-padding-x) py-(--flow-canvas-padding-y)',
					)}
				>
					<svg
						data-slot="flow-connectors"
						aria-hidden="true"
						className="pointer-events-none absolute inset-0 overflow-visible"
						width={drawing.width}
						height={drawing.height}
						fill="none"
						stroke="var(--flow-connector-color,var(--border-tertiary))"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						{drawing.paths.map((path) => (
							<path
								key={path.id}
								data-slot="flow-connector"
								data-disabled={path.disabled || undefined}
								d={path.d}
								opacity={path.disabled ? 'var(--opacity-disabled)' : undefined}
							/>
						))}
					</svg>
					<ol
						data-flow-items=""
						data-flow-kind="sequence"
						className={sequenceClasses(orientation, align)}
					>
						{children}
					</ol>
				</div>
			</div>
		</FlowContext.Provider>
	)
})

export type FlowNodeProps = useRender.ComponentProps<'div'> & { disabled?: boolean }
export const FlowNode = forwardRef<HTMLDivElement, FlowNodeProps>(function FlowNode(
	{ disabled = false, render, className, ...props },
	ref,
) {
	const nodeId = useId()
	const defaultProps = {
		'data-slot': 'flow-node',
		'data-flow-node': nodeId,
		'aria-disabled': disabled || undefined,
		className: cn(
			'relative min-w-0 rounded-(--flow-node-radius) border-(length:--flow-border-width) border-stroke-secondary bg-surface-default px-3 py-2 text-sm text-default shadow-(--flow-node-shadow)',
			disabled && 'opacity-disabled',
			className,
		),
	}
	const node = useRender({
		defaultTagName: 'div',
		render,
		ref,
		props: mergeProps<'div'>(defaultProps, props),
	})
	return (
		<li data-flow-kind="node" data-disabled={disabled} className="relative shrink-0">
			{node}
		</li>
	)
})

export const FlowParallel = forwardRef<HTMLLIElement, ComponentPropsWithoutRef<'li'>>(
	function FlowParallel({ className, children, ...props }, ref) {
		const { orientation } = useContext(FlowContext)
		return (
			<li
				ref={ref}
				data-slot="flow-parallel"
				data-flow-kind="parallel"
				className={cn('shrink-0', className)}
				{...props}
			>
				<ul
					data-flow-items=""
					className={cn(
						'flex w-max list-none gap-(--flow-branch-gap) p-0',
						orientation === 'horizontal' ? 'flex-col' : 'flex-row',
					)}
				>
					{children}
				</ul>
			</li>
		)
	},
)
export const FlowList = forwardRef<HTMLLIElement, ComponentPropsWithoutRef<'li'>>(function FlowList(
	{ className, children, ...props },
	ref,
) {
	const { orientation, align } = useContext(FlowContext)
	return (
		<li
			ref={ref}
			data-slot="flow-list"
			data-flow-kind="sequence"
			className={cn('shrink-0', className)}
			{...props}
		>
			<ol data-flow-items="" className={sequenceClasses(orientation, align)}>
				{children}
			</ol>
		</li>
	)
})
export interface FlowAnchorProps extends ComponentPropsWithoutRef<'span'> {
	type?: 'start' | 'end' | 'both'
}
export const FlowAnchor = forwardRef<HTMLSpanElement, FlowAnchorProps>(function FlowAnchor(
	{ type = 'both', style, ...props },
	ref,
) {
	return (
		<span
			ref={ref}
			data-slot="flow-anchor"
			data-flow-anchor={type}
			style={{ display: 'block', ...style } as CSSProperties}
			{...props}
		/>
	)
})
