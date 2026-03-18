/**
 * TreeView
 * ─────────────────────────────────────────────────────────────────────────────
 * ASCII-art collapsible tree with full keyboard navigation.
 *
 * Usage:
 *   <TreeView title="src" defaultOpen>
 *     <TreeView title="components" isLastChild>
 *       <TreeView title="Button.tsx" isFile isLastChild />
 *     </TreeView>
 *   </TreeView>
 *
 * Keyboard: Enter/Space toggle; arrow keys navigate; Home/End jump to edges.
 * ARIA: role="tree" on the root, role="treeitem" per node, aria-expanded on folders.
 */

import * as React from 'react'
import { cn } from '../lib/utils'

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

/* ─── Tree characters ─── */

const CHARS = {
	// Intentional dot-spacing: the dots render as spaces in the tree aesthetic
	pipe: '│ . ',
	blank: '. . ',
	branch: '├───',
	last: '└───',
	folderOpen: '╦ ',
	folderClosed: '╤ ',
	file: '  ',
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

		// Build the prefix string from parent line markers
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
				className={cn('whitespace-nowrap font-mono text-sm rounded-lg overflow-hidden', className)}
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
						'flex items-center gap-0 rounded-sm px-0 py-px outline-none',
						isFolder && 'cursor-pointer hover:bg-muted focus-visible:ring-[length:var(--border-width)] focus-visible:ring-focus/30',
					)}
					aria-label={`${isFolder ? (open ? 'collapse' : 'expand') : ''} ${title}`}
				>
					<span className="text-muted-foreground select-none">{prefix}</span>
					<span className="text-muted-foreground select-none">{icon}</span>
					<span className="text-foreground">{title}</span>
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
