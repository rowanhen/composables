import React from 'react'

import { Button } from '../../../../src/opinionated/button/button'
import { Textarea } from '../../../../src/opinionated/textarea/textarea'

import { colorTokens } from './color-editor'
import { allDimensionTokens, allStringTokens } from './spacing-editor'
import { fontCssVars } from './typography-editor'
import { getResolvedColor, getResolvedDimension } from './helpers'

/* ------------------------------------------------------------------ */
/*  JSON import / export tab                                            */
/* ------------------------------------------------------------------ */

export function buildJsonSnapshot(): Record<string, string> {
	const current: Record<string, string> = {}
	for (const token of colorTokens) {
		current[token.cssVar] = getResolvedColor(token.cssVar)
	}
	for (const token of allDimensionTokens) {
		current[token.cssVar] = getResolvedDimension(token.cssVar)
	}
	for (const token of allStringTokens) {
		current[token.cssVar] = getResolvedDimension(token.cssVar)
	}
	for (const v of fontCssVars) {
		current[v] = getResolvedDimension(v)
	}
	return current
}

export function JsonImportExport({
	jsonText,
	setJsonText,
	setOverrides,
	resetAll,
}: {
	jsonText: string
	setJsonText: (text: string) => void
	setOverrides: React.Dispatch<React.SetStateAction<Record<string, string>>>
	resetAll: () => void
}) {
	const [jsonError, setJsonError] = React.useState<string | null>(null)

	function applyJson() {
		try {
			const parsed: unknown = JSON.parse(jsonText)
			if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
				throw new Error('Expected a JSON object of CSS variables.')
			}
			const values = Object.entries(parsed).filter(
				(entry): entry is [string, string] =>
					entry[0].startsWith('--') && typeof entry[1] === 'string',
			)
			resetAll()
			for (const [cssVar, val] of values) {
				document.documentElement.style.setProperty(cssVar, val)
			}
			setOverrides(Object.fromEntries(values))
			setJsonError(null)
		} catch (err) {
			setJsonError(err instanceof Error ? err.message : 'Invalid JSON')
		}
	}

	return (
		<div className="flex flex-col gap-3 h-full">
			<Textarea
				aria-label="Preset JSON"
				className="flex-1 font-mono text-xs min-h-0 resize-none"
				value={jsonText}
				onChange={(e) => setJsonText(e.target.value)}
			/>
			{jsonError && <span className="text-xs text-critical">{jsonError}</span>}
			<div className="flex gap-2 pb-4">
				<Button size="sm" onClick={applyJson} className="flex-1">
					Apply
				</Button>
				<Button size="sm" onClick={resetAll} className="flex-1">
					Reset
				</Button>
			</div>
		</div>
	)
}
