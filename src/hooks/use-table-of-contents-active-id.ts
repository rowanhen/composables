import { useEffect, useState } from 'react'

export interface TableOfContentsTrackingOptions {
	/** Space reserved for a sticky header, in pixels. @default 96 */
	offset?: number
	/** A scroll container; omitted for document scrolling. */
	root?: HTMLElement | null
	enabled?: boolean
}

/** Tracks supplied section IDs without scanning or changing document headings. */
export function useTableOfContentsActiveId(
	ids: readonly string[],
	{ offset = 96, root, enabled = true }: TableOfContentsTrackingOptions = {},
) {
	const [activeId, setActiveId] = useState<string>()
	const idsKey = JSON.stringify(ids)
	useEffect(() => {
		if (!enabled) return
		const sectionIds = JSON.parse(idsKey) as string[]
		let frame = 0
		const measure = () => {
			const sections = sectionIds
				.map((id) => document.getElementById(id))
				.filter((el): el is HTMLElement => el !== null && (!root || root.contains(el)))
			const top = (root?.getBoundingClientRect().top ?? 0) + offset
			const ordered = sections
				.map((el) => ({ id: el.id, top: el.getBoundingClientRect().top }))
				.sort((a, b) => a.top - b.top)
			let next: string | undefined = ordered[0]?.id
			for (const section of ordered) if (section.top <= top + 1) next = section.id
			const scroller = root ?? document.scrollingElement
			if (
				scroller &&
				scroller.scrollHeight > scroller.clientHeight &&
				scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1
			)
				next = ordered.at(-1)?.id
			setActiveId(next)
		}
		const schedule = () => {
			cancelAnimationFrame(frame)
			frame = requestAnimationFrame(measure)
		}
		const target = root ?? window
		target.addEventListener('scroll', schedule, { passive: true })
		window.addEventListener('resize', schedule)
		const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(schedule)
		for (const id of sectionIds) {
			const el = document.getElementById(id)
			if (el) observer?.observe(el)
		}
		if (root) observer?.observe(root)
		measure()
		return () => {
			cancelAnimationFrame(frame)
			observer?.disconnect()
			target.removeEventListener('scroll', schedule)
			window.removeEventListener('resize', schedule)
		}
	}, [idsKey, offset, root, enabled])
	return enabled ? activeId : undefined
}
