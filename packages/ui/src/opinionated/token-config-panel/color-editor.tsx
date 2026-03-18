import React from 'react'
import { HexColorPicker } from 'react-colorful'

import { Input } from '../../_internal/input'
import { Typography } from '../../_internal/typography'

import type { FlatToken } from './types'
import { getResolvedColor } from './helpers'

/* ------------------------------------------------------------------ */
/*  Color token definitions (mirrors semantic.json structure)          */
/* ------------------------------------------------------------------ */

export const colorTokens: FlatToken[] = [
  // bg
  { cssVar: '--bg-default', reference: '{neutral.100}', category: 'bg', label: 'default' },
  { cssVar: '--bg-inverse', reference: '{neutral.1000}', category: 'bg', label: 'inverse' },
  { cssVar: '--bg-muted', reference: '{neutral.200}', category: 'bg', label: 'muted' },
  { cssVar: '--bg-surface-default', reference: '{neutral.100}', category: 'bg', label: 'surface-default' },
  { cssVar: '--bg-surface-info', reference: '{sky.100}', category: 'bg', label: 'surface-info' },
  { cssVar: '--bg-surface-success', reference: '{green.100}', category: 'bg', label: 'surface-success' },
  { cssVar: '--bg-surface-warning', reference: '{orange.100}', category: 'bg', label: 'surface-warning' },
  { cssVar: '--bg-surface-critical', reference: '{red.100}', category: 'bg', label: 'surface-critical' },
  { cssVar: '--bg-surface-emphasis', reference: '{blue.100}', category: 'bg', label: 'surface-emphasis' },
  { cssVar: '--bg-surface-inverse', reference: '{neutral.950}', category: 'bg', label: 'surface-inverse' },
  { cssVar: '--bg-surface-transparent', reference: '{Overlays.Black-Alpha.50}', category: 'bg', label: 'surface-transparent' },
  { cssVar: '--bg-surface-brand', reference: '{pink.100}', category: 'bg', label: 'surface-brand' },
  { cssVar: '--bg-surface-hover', reference: '{neutral.200}', category: 'bg', label: 'surface-hover' },
  { cssVar: '--bg-fill-default', reference: '{neutral.100}', category: 'bg', label: 'fill-default' },
  { cssVar: '--bg-fill-primary', reference: '{neutral.1000}', category: 'bg', label: 'fill-primary' },
  { cssVar: '--bg-fill-brand', reference: '{pink.800}', category: 'bg', label: 'fill-brand' },
  { cssVar: '--bg-fill-info', reference: '{sky.800}', category: 'bg', label: 'fill-info' },
  { cssVar: '--bg-fill-success', reference: '{green.800}', category: 'bg', label: 'fill-success' },
  { cssVar: '--bg-fill-warning', reference: '{orange.800}', category: 'bg', label: 'fill-warning' },
  { cssVar: '--bg-fill-critical', reference: '{red.800}', category: 'bg', label: 'fill-critical' },
  { cssVar: '--bg-fill-emphasis', reference: '{blue.800}', category: 'bg', label: 'fill-emphasis' },
  { cssVar: '--bg-fill-transparent', reference: '{Overlays.Black-Alpha.50}', category: 'bg', label: 'fill-transparent' },
  { cssVar: '--bg-fill-secondary', reference: '{neutral.1000}', category: 'bg', label: 'fill-secondary' },
  { cssVar: '--bg-fill-secondary-inverse', reference: '{base.white}', category: 'bg', label: 'fill-secondary-inverse' },
  // text
  { cssVar: '--text-default', reference: '{neutral.1000}', category: 'text', label: 'default' },
  { cssVar: '--text-secondary', reference: '{neutral.950}', category: 'text', label: 'secondary' },
  { cssVar: '--text-muted', reference: '{neutral.800}', category: 'text', label: 'muted' },
  { cssVar: '--text-disabled', reference: '{neutral.600}', category: 'text', label: 'disabled' },
  { cssVar: '--text-inverse', reference: '{base.white}', category: 'text', label: 'inverse' },
  { cssVar: '--text-info', reference: '{sky.1000}', category: 'text', label: 'info' },
  { cssVar: '--text-success', reference: '{green.1000}', category: 'text', label: 'success' },
  { cssVar: '--text-warning', reference: '{orange.1000}', category: 'text', label: 'warning' },
  { cssVar: '--text-critical', reference: '{red.1000}', category: 'text', label: 'critical' },
  { cssVar: '--text-emphasis', reference: '{blue.1000}', category: 'text', label: 'emphasis' },
  { cssVar: '--text-brand', reference: '{pink.1000}', category: 'text', label: 'brand' },
  { cssVar: '--text-link', reference: '{blue.1000}', category: 'text', label: 'link' },
  // icon
  { cssVar: '--icon-default', reference: '{neutral.1000}', category: 'icon', label: 'default' },
  { cssVar: '--icon-secondary', reference: '{neutral.950}', category: 'icon', label: 'secondary' },
  { cssVar: '--icon-disabled', reference: '{neutral.300}', category: 'icon', label: 'disabled' },
  { cssVar: '--icon-inverse', reference: '{neutral.100}', category: 'icon', label: 'inverse' },
  { cssVar: '--icon-info', reference: '{sky.950}', category: 'icon', label: 'info' },
  { cssVar: '--icon-success', reference: '{green.950}', category: 'icon', label: 'success' },
  { cssVar: '--icon-warning', reference: '{orange.950}', category: 'icon', label: 'warning' },
  { cssVar: '--icon-critical', reference: '{red.950}', category: 'icon', label: 'critical' },
  { cssVar: '--icon-emphasis', reference: '{blue.950}', category: 'icon', label: 'emphasis' },
  { cssVar: '--icon-brand', reference: '{pink.950}', category: 'icon', label: 'brand' },
  // border
  { cssVar: '--border-default', reference: '{neutral.600}', category: 'border', label: 'default' },
  { cssVar: '--border-secondary', reference: '{neutral.500}', category: 'border', label: 'secondary' },
  { cssVar: '--border-tertiary', reference: '{neutral.700}', category: 'border', label: 'tertiary' },
  { cssVar: '--border-disabled', reference: '{neutral.500}', category: 'border', label: 'disabled' },
  { cssVar: '--border-inverse', reference: '{neutral.950}', category: 'border', label: 'inverse' },
  { cssVar: '--border-focus', reference: '{blue.950}', category: 'border', label: 'focus' },
  { cssVar: '--border-brand', reference: '{pink.600}', category: 'border', label: 'brand' },
  { cssVar: '--border-info', reference: '{sky.600}', category: 'border', label: 'info' },
  { cssVar: '--border-success', reference: '{green.600}', category: 'border', label: 'success' },
  { cssVar: '--border-warning', reference: '{orange.600}', category: 'border', label: 'warning' },
  { cssVar: '--border-critical', reference: '{red.600}', category: 'border', label: 'critical' },
  { cssVar: '--border-emphasis', reference: '{blue.700}', category: 'border', label: 'emphasis' },
  // chart
  { cssVar: '--chart-1', reference: '{blue.700}', category: 'chart', label: '1' },
  { cssVar: '--chart-2', reference: '{blue.800}', category: 'chart', label: '2' },
  { cssVar: '--chart-3', reference: '{violet.700}', category: 'chart', label: '3' },
  { cssVar: '--chart-4', reference: '{violet.800}', category: 'chart', label: '4' },
  { cssVar: '--chart-5', reference: '{violet.900}', category: 'chart', label: '5' },
]

export const colorCategories = [...new Set(colorTokens.map((t) => t.category))]
export const colorTokensByCategory = Object.groupBy(colorTokens, (t) => t.category)

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
