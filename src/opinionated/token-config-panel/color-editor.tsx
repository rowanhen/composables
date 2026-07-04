import React from 'react'
import { HexColorPicker } from 'react-colorful'

import { Input } from '../../_internal/input'
import { Typography } from '../../_internal/typography'
import { semanticColorTokens } from '../../styles/tokens/registry'

import type { FlatToken } from './types'
import { getResolvedColor } from './helpers'

export const colorTokens: FlatToken[] = semanticColorTokens

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
	const [expanded, setExpanded] = React.useState(false)
	const [color, setColor] = React.useState(() => getResolvedColor(token.cssVar))
	const [inputValue, setInputValue] = React.useState(color)

	React.useEffect(() => {
		setInputValue(color)
	}, [color])

	function handlePickerChange(hex: string) {
		setColor(hex)
		onApply(token.cssVar, hex)
	}

	function handleInputCommit() {
		const v = inputValue.trim()
		if (/^#[0-9a-fA-F]{3,8}$/.test(v)) {
			setColor(v)
			onApply(token.cssVar, v)
		} else {
			setInputValue(color)
		}
	}

	return (
		<div className="py-1.5">
			<button
				type="button"
				onClick={() => setExpanded(!expanded)}
				className="flex w-full items-center gap-3 rounded-md px-2 py-1 hover:bg-[var(--bg-surface-hover)] transition-colors"
			>
				<div
					className="size-6 rounded border border-stroke/60 shrink-0"
					style={{ backgroundColor: color }}
				/>
				<Typography variant="caption-100" className="text-foreground truncate text-left flex-1">
					{token.cssVar}
				</Typography>
				<Typography variant="caption-100" className="text-muted-foreground shrink-0 font-mono">
					{color}
				</Typography>
			</button>

			{expanded && (
				<div className="mt-2 ml-2 flex flex-col gap-2 pb-2">
					<HexColorPicker color={color} onChange={handlePickerChange} />
					<Input
						className="h-7 font-mono text-xs"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						onBlur={handleInputCommit}
						onKeyDown={(e) => {
							if (e.key === 'Enter') handleInputCommit()
						}}
					/>
				</div>
			)}
		</div>
	)
}
