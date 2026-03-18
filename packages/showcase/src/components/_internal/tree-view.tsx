/**
 * TreeView
 * ─────────────────────────────────────────────────────────────────────────────
 * ASCII-art collapsible tree with full keyboard navigation.
 *
 * Usage:
 *   <TreeView title="src" defaultOpen>
 *     <TreeView title="components">
 *       <TreeView title="Button.tsx" isFile />
 *     </TreeView>
 *   </TreeView>
 *
 * Keyboard: Enter/Space toggle; arrow keys navigate; Home/End jump to edges.
 * ARIA: role="tree" on the root, role="treeitem" per node, aria-expanded on folders.
 */

import * as React from 'react'
import { cn, FOCUS_RING } from '@/lib/utils'

/* ─── Types ─── */

export interface TreeViewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue'> {
	/** Label for this node */
	title: string
	/** Expand by default (folders only) */
	defaultOpen?: boolean
	/** Marks this node as a leaf (no toggle) */
	isFile?: boolean
	/** Nesting depth — injected automatically by parent */
	depth?: number
	/** Whether this is the last child of its parent — injected automatically */
	isLastChild?: boolean
	/** Array tracking which ancestor levels still have more siblings — injected automatically */
	parentLines?: boolean[]
	/** Whether this is the outermost TreeView (renders role="tree") */
	isRoot?: boolean
}

/* ─── Tree characters ─────────────────────────────────────────────────────────
 * Non-breaking spaces (\u00a0) are used for padding. Regular spaces collapse
 * in HTML inline elements; \u00a0 never does, keeping the monospace grid intact
 * without requiring white-space: pre on every span.
 * All segments are 4 characters wide so indentation levels align exactly.
 * ─────────────────────────────────────────────────────────────────────────── */

const NBSP = '\u00a0'

const CHARS = {
	pipe:         `│${NBSP}${NBSP}${NBSP}`, // 4 chars — vertical continuation line
	blank:        `${NBSP}${NBSP}${NBSP}${NBSP}`, // 4 chars — gap where no line passes
	branch:       `├──${NBSP}`, // 4 chars — non-last child connector
	last:         `└──${NBSP}`, // 4 chars — last child connector
	folderOpen:   `▾${NBSP}`,   // icon + spacing before label
	folderClosed: `▸${NBSP}`,
	file:         `·${NBSP}`,
} as const

/* ─── Component ─── */

const TreeView = React.forwardRef<HTMLDivElement, TreeViewProps>(
	(
		{
			defaultOpen = false,
			title,
			children,
			depth = 0,
			isFile = false,
			isLastChild = false,
			parentLines = [],
			isRoot = false,
			className,
			...props
		},
		ref,
	) => {
		const [open, setOpen] = React.useState<boolean>(defaultOpen)
		const hasChildren = React.Children.count(children) > 0
		const isFolder = !isFile && hasChildren

		const toggle = (): void => {
			if (isFolder) setOpen((prev) => !prev)
		}

		const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault()
				toggle()
			} else if (e.key === 'ArrowRight' && isFolder && !open) {
				e.preventDefault()
				setOpen(true)
			} else if (e.key === 'ArrowLeft' && isFolder && open) {
				e.preventDefault()
				setOpen(false)
			} else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
				e.preventDefault()
				const tree = e.currentTarget.closest('[role="tree"]')
				if (!tree) return
				const items = Array.from(tree.querySelectorAll<HTMLElement>('[role="treeitem"]'))
				const currentIndex = items.indexOf(e.currentTarget)
				if (currentIndex === -1) return
				const nextIndex = e.key === 'ArrowDown' ? currentIndex + 1 : currentIndex - 1
				items[nextIndex]?.focus()
			}
		}

		// Build the prefix from parent line markers. Each level contributes exactly
		// 4 chars: a pipe (│) if that ancestor still has siblings, blank otherwise.
		const spacing = parentLines.map((line) => (line ? CHARS.pipe : CHARS.blank)).join('')
		const endPrefix = depth === 0 ? '' : isLastChild ? CHARS.last : CHARS.branch
		const prefix = `${spacing}${endPrefix}`
		const icon = isFile ? CHARS.file : open ? CHARS.folderOpen : CHARS.folderClosed

		const updatedParentLines = [...parentLines, !isLastChild]

		return (
			<div
				ref={ref}
				data-slot="tree-view"
				role={isRoot ? 'tree' : undefined}
				aria-label={isRoot ? `tree: ${title}` : undefined}
				className={cn('whitespace-nowrap font-mono text-xs', className)}
				{...props}
			>
				{/* Node row — role="treeitem" lives here (the focusable element) */}
				<div
					tabIndex={0}
					role="treeitem"
					aria-expanded={isFolder ? open : undefined}
					onClick={toggle}
					onKeyDown={handleKeyDown}
					className={cn(
						'flex items-center gap-0 rounded-sm border border-transparent px-1.5 py-0.5 outline-none transition-colors',
						isFolder && 'cursor-pointer hover:bg-muted',
						FOCUS_RING,
					)}
					aria-label={`${isFolder ? (open ? 'collapse' : 'expand') : ''} ${title}`}
				>
					{/* Prefix includes all ancestor indentation + the branch connector.
					    Non-breaking spaces in CHARS guarantee nothing collapses. */}
					{depth > 0 && (
						<span className="select-none text-muted-foreground/50 shrink-0">{prefix}</span>
					)}
					<span
						className={cn(
							'select-none shrink-0',
							isFolder ? 'text-muted-foreground' : 'text-muted-foreground/50',
						)}
					>
						{icon}
					</span>
					<span className={cn('text-foreground/80', isFolder && 'font-medium text-foreground')}>
						{title}
					</span>
				</div>

				{/* Children — only TreeView children receive injected layout props */}
				{open && hasChildren && (
					<div>
						{React.Children.map(children, (child, index) =>
							React.isValidElement(child) && child.type === TreeView
								? React.cloneElement(child as React.ReactElement<TreeViewProps>, {
										depth: depth + 1,
										isLastChild: index === React.Children.count(children) - 1,
										parentLines: updatedParentLines,
									})
								: child,
						)}
					</div>
				)}
			</div>
		)
	},
)
TreeView.displayName = 'TreeView'

export { TreeView }
