import { parseTokenOverrides, tokenNames, type TokenOverrides } from '../../styles/tokens/types'
import React from 'react'

import { Button } from '../../_internal/button'
import { Textarea } from '../../_internal/textarea'
import { VStack } from '../../_internal/stack'
import { Typography } from '../../_internal/typography'

import { getResolvedDimension } from './helpers'
import { removePresetStyle } from './preset-manager'

/* ------------------------------------------------------------------ */
/*  JSON import / export tab                                            */
/* ------------------------------------------------------------------ */

export function buildJsonSnapshot(): TokenOverrides {
	const current: TokenOverrides = {}
	for (const name of tokenNames) {
		const value = getResolvedDimension(name)
		// Guaranteed-invalid optional finishes are represented explicitly for round trips.
		current[name] = value || 'initial'
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
	setOverrides: React.Dispatch<React.SetStateAction<TokenOverrides>>
	setActivePreset: (preset: string) => void
	resetAll: () => void
}) {
	const [jsonError, setJsonError] = React.useState<string | null>(null)

	function applyJson() {
		try {
			const parsed = parseTokenOverrides(JSON.parse(jsonText))
			removePresetStyle()
			for (const name of tokenNames) document.documentElement.style.removeProperty(name)
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
				<Typography variant="caption-100" className="text-critical">
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
