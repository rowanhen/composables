import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import {
	forwardRef,
	type ComponentPropsWithoutRef,
	type ReactNode,
	type MouseEventHandler,
} from 'react'
import { cn, FOCUS_RING } from '../lib/utils'

export const TableOfContentsRoot = forwardRef<HTMLElement, ComponentPropsWithoutRef<'nav'>>(
	function TableOfContentsRoot(
		{ className, 'aria-label': label = 'Table of contents', ...props },
		ref,
	) {
		return (
			<nav
				ref={ref}
				data-slot="table-of-contents"
				aria-label={label}
				className={cn('min-w-0', className)}
				{...props}
			/>
		)
	},
)
export const TableOfContentsTitle = forwardRef<HTMLParagraphElement, ComponentPropsWithoutRef<'p'>>(
	function TableOfContentsTitle({ className, ...props }, ref) {
		return (
			<p
				ref={ref}
				data-slot="table-of-contents-title"
				className={cn(
					'mb-3 text-xs font-semibold tracking-wide text-content-secondary uppercase',
					className,
				)}
				{...props}
			/>
		)
	},
)
export const TableOfContentsList = forwardRef<HTMLUListElement, ComponentPropsWithoutRef<'ul'>>(
	function TableOfContentsList({ className, ...props }, ref) {
		return (
			<ul
				ref={ref}
				data-slot="table-of-contents-list"
				className={cn('flex list-none flex-col gap-2 border-s-2 border-stroke p-0', className)}
				{...props}
			/>
		)
	},
)

export type TableOfContentsItemProps = useRender.ComponentProps<'a'> & { active?: boolean }
const TableOfContentsLink = forwardRef<HTMLAnchorElement, TableOfContentsItemProps>(
	function TableOfContentsLink({ active = false, render, className, ...props }, ref) {
		const defaultProps = {
			'data-slot': 'table-of-contents-link',
			'data-active': active,
			'aria-current': active ? ('location' as const) : undefined,
			className: cn(
				'block w-full truncate border-s-2 border-transparent py-0.5 ps-4 text-start text-sm leading-5 no-underline outline-none',
				FOCUS_RING,
				active
					? 'border-primary font-medium text-default'
					: 'text-content-secondary hover:border-stroke-secondary hover:text-default',
				className,
			),
		}
		return useRender({
			defaultTagName: 'a',
			render,
			ref,
			props: mergeProps<'a'>(defaultProps, props),
		})
	},
)
export const TableOfContentsItem = forwardRef<HTMLAnchorElement, TableOfContentsItemProps>(
	function TableOfContentsItem(props, ref) {
		return (
			<li data-slot="table-of-contents-item" className="-ms-0.5 min-w-0">
				<TableOfContentsLink ref={ref} {...props} />
			</li>
		)
	},
)

export interface TableOfContentsGroupProps extends Omit<
	ComponentPropsWithoutRef<'li'>,
	'title' | 'onClick'
> {
	label: ReactNode
	href?: string
	active?: boolean
	/** Called only for the group label link, never for nested item clicks. */
	onLabelClick?: MouseEventHandler<HTMLAnchorElement>
}
export const TableOfContentsGroup = forwardRef<HTMLLIElement, TableOfContentsGroupProps>(
	function TableOfContentsGroup(
		{ label, href, active, onLabelClick, className, children, ...props },
		ref,
	) {
		return (
			<li
				ref={ref}
				data-slot="table-of-contents-group"
				className={cn('-ms-0.5 flex min-w-0 flex-col gap-2', className)}
				{...props}
			>
				{href ? (
					<TableOfContentsLink href={href} active={active} onClick={onLabelClick}>
						{label}
					</TableOfContentsLink>
				) : (
					<p className="py-0.5 ps-4 text-sm font-medium text-content-secondary">{label}</p>
				)}
				<ul className="flex list-none flex-col gap-2 border-s-2 border-stroke p-0 [&_a]:ps-7">
					{children}
				</ul>
			</li>
		)
	},
)
