import React from 'react'

import { ColorPicker } from '../../../../src/opinionated/color-picker/color-picker'
import utilities from '../../../../src/styles/tailwind.css?raw'
import { semanticUtilities } from '../../../../src/styles/theme'

import type { FlatToken } from './types'
import { getResolvedColor } from './helpers'

export const colorTokens: FlatToken[] = [
	...new Set(semanticUtilities(utilities).map(({ token }) => token)),
].map((cssVar) => {
	const [category, ...label] = cssVar.slice(2).split('-')
	return { cssVar, category, label: label.join('-') }
})

export const colorCategories = [...new Set(colorTokens.map((t) => t.category))]
export const colorTokensByCategory = colorTokens.reduce<Record<string, FlatToken[]>>(
	(groups, token) => {
		const group = groups[token.category] ?? []
		group.push(token)
		groups[token.category] = group
		return groups
	},
	{},
)

/* ------------------------------------------------------------------ */
/*  ColorTokenRow                                                       */
/* ------------------------------------------------------------------ */

export function ColorTokenRow({
	token,
	onApply,
}: {
	token: FlatToken
	onApply: (cssVar: string, value: string) => void
}) {
	const [color, setColor] = React.useState(() => getResolvedColor(token.cssVar))

	return (
		<div className="flex items-center justify-between gap-3 py-1.5">
			<ColorPicker
				label={token.cssVar}
				value={color}
				onValueChange={(value) => {
					setColor(value)
					onApply(token.cssVar, value)
				}}
			/>
			<span className="text-xs shrink-0 font-mono text-muted-foreground">{color}</span>
		</div>
	)
}
