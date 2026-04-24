import React from 'react'

import { Button } from '../../_internal/button'
import { Textarea } from '../../_internal/textarea'
import { VStack } from '../../_internal/stack'
import { Typography } from '../../_internal/typography'

import { colorTokens } from './color-editor'
import { allDimensionTokens, allStringTokens } from './spacing-editor'
import { fontCssVars } from './typography-editor'
import { getResolvedColor, getResolvedDimension } from './helpers'
import { removePresetStyle } from './preset-manager'

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
	setActivePreset,
	resetAll,
}: {
	jsonText: string
	setJsonText: (text: string) => void
	setOverrides: React.Dispatch<React.SetStateAction<Record<string, string>>>
	setActivePreset: (preset: string) => void
	resetAll: () => void
}) {
	const [jsonError, setJsonError] = React.useState<string | null>(null)

	function applyJson() {
		try {
			const parsed = JSON.parse(jsonText) as Record<string, string>
			removePresetStyle()
			setActivePreset('default')
			for (const [cssVar, val] of Object.entries(parsed)) {
				if (cssVar.startsWith('--') && typeof val === 'string') {
					document.documentElement.style.setProperty(cssVar, val)
				}
			}
			setOverrides(parsed)
			setJsonError(null)
		} catch (err) {
			setJsonError(err instanceof Error ? err.message : 'Invalid JSON')
		}
	}

	return (
		<VStack gap={3} className="h-full">
			<Textarea
				className="flex-1 font-mono text-xs min-h-0 resize-none"
				value={jsonText}
				onChange={(e) => setJsonText(e.target.value)}
			/>
			{jsonError && (
				<Typography variant="caption-100" className="text-[var(--text-critical)]">
					{jsonError}
				</Typography>
			)}
			<div className="flex gap-2 pb-4">
				<Button size="sm" onClick={applyJson} className="flex-1">
					Apply
				</Button>
				<Button variant="outline" size="sm" onClick={resetAll} className="flex-1">
					Reset
				</Button>
			</div>
		</VStack>
	)
}
