import {
	forwardRef,
	useState,
	type ComponentPropsWithoutRef,
	type ReactNode,
	type MouseEvent,
} from 'react'
import {
	TableOfContentsRoot,
	TableOfContentsTitle,
	TableOfContentsList,
	TableOfContentsItem,
	TableOfContentsGroup,
} from '../_internal/table-of-contents'
import { useTableOfContentsActiveId } from '../hooks/use-table-of-contents-active-id'

export interface TableOfContentsItemData {
	/** Matching document section ID. */
	id: string
	label: ReactNode
	/** Defaults to #id for leaves; group labels are plain text unless provided. */
	href?: string
	children?: TableOfContentsItemData[]
}
export interface TableOfContentsProps extends Omit<ComponentPropsWithoutRef<'nav'>, 'title'> {
	items?: TableOfContentsItemData[]
	title?: ReactNode
	activeId?: string
	defaultActiveId?: string
	onActiveIdChange?: (id: string) => void
	onItemClick?: (item: TableOfContentsItemData, event: MouseEvent<HTMLAnchorElement>) => void
	/** Track document section positions automatically. @default false */
	trackScroll?: boolean
	scrollOffset?: number
}
function sectionIds(items: TableOfContentsItemData[]): string[] {
	return items.flatMap((item) => [item.id, ...sectionIds(item.children ?? [])])
}
const TableOfContentsComponent = forwardRef<HTMLElement, TableOfContentsProps>(
	function TableOfContents(
		{
			items,
			title = 'On this page',
			activeId,
			defaultActiveId,
			onActiveIdChange,
			onItemClick,
			trackScroll = false,
			scrollOffset = 96,
			children,
			...props
		},
		ref,
	) {
		const [selected, setSelected] = useState(defaultActiveId)
		const tracked = useTableOfContentsActiveId(sectionIds(items ?? []), {
			offset: scrollOffset,
			enabled: trackScroll && activeId === undefined,
		})
		const current = activeId ?? tracked ?? selected
		const handleClick = (item: TableOfContentsItemData, event: MouseEvent<HTMLAnchorElement>) => {
			onItemClick?.(item, event)
			if (event.defaultPrevented) return
			if (activeId === undefined) setSelected(item.id)
			onActiveIdChange?.(item.id)
		}
		const renderItems = (entries: TableOfContentsItemData[]): ReactNode =>
			entries.map((item) =>
				item.children?.length ? (
					<TableOfContentsGroup
						key={item.id}
						label={item.label}
						href={item.href}
						active={current === item.id}
						onLabelClick={(event) => handleClick(item, event)}
					>
						{renderItems(item.children)}
					</TableOfContentsGroup>
				) : (
					<TableOfContentsItem
						key={item.id}
						href={item.href ?? `#${item.id}`}
						active={current === item.id}
						onClick={(event) => handleClick(item, event)}
					>
						{item.label}
					</TableOfContentsItem>
				),
			)
		return (
			<TableOfContentsRoot ref={ref} {...props}>
				{items ? (
					<>
						{title != null && <TableOfContentsTitle>{title}</TableOfContentsTitle>}
						<TableOfContentsList>{renderItems(items)}</TableOfContentsList>
					</>
				) : (
					children
				)}
			</TableOfContentsRoot>
		)
	},
)
export const TableOfContents = Object.assign(TableOfContentsComponent, {
	Root: TableOfContentsRoot,
	Title: TableOfContentsTitle,
	List: TableOfContentsList,
	Item: TableOfContentsItem,
	Group: TableOfContentsGroup,
})
export {
	TableOfContentsRoot,
	TableOfContentsTitle,
	TableOfContentsList,
	TableOfContentsItem,
	TableOfContentsGroup,
}
export type {
	TableOfContentsItemProps,
	TableOfContentsGroupProps,
} from '../_internal/table-of-contents'
