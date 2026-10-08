/** Copy using the browser API, or the legacy path when that API is unavailable. */
export async function copyText(text: string): Promise<void> {
	if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
		await navigator.clipboard.writeText(text)
		return
	}
	if (
		typeof document === 'undefined' ||
		!document.body ||
		typeof document.execCommand !== 'function'
	) {
		throw new Error('Clipboard access is unavailable in this browser.')
	}
	const focused = document.activeElement
	const selection = document.getSelection()
	const ranges = selection
		? Array.from({ length: selection.rangeCount }, (_, index) =>
				selection.getRangeAt(index).cloneRange(),
			)
		: []
	const inputSelection =
		focused instanceof HTMLInputElement || focused instanceof HTMLTextAreaElement
			? {
					start: focused.selectionStart,
					end: focused.selectionEnd,
					direction: focused.selectionDirection,
				}
			: undefined
	const field = document.createElement('textarea')
	field.value = text
	field.setAttribute('readonly', '')
	field.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0'
	document.body.appendChild(field)
	try {
		field.select()
		if (!document.execCommand('copy')) throw new Error('The browser could not copy the text.')
	} finally {
		field.remove()
		if (focused instanceof HTMLElement) focused.focus({ preventScroll: true })
		if (selection) {
			selection.removeAllRanges()
			for (const range of ranges) selection.addRange(range)
		}
		if (
			inputSelection &&
			inputSelection.start !== null &&
			inputSelection.end !== null &&
			(focused instanceof HTMLInputElement || focused instanceof HTMLTextAreaElement)
		) {
			focused.setSelectionRange(
				inputSelection.start,
				inputSelection.end,
				inputSelection.direction ?? undefined,
			)
		}
	}
}
