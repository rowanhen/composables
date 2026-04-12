import React from 'react'

import { Input } from '../../_internal/input'
import { HStack } from '../../_internal/stack'
import { Typography } from '../../_internal/typography'
import { FormInput } from '../form-input'
import { FormSlider } from '../form-slider'

import type { DimensionToken, StringToken } from './types'
import { getResolvedDimension, parseNumericValue } from './helpers'

/* ------------------------------------------------------------------ */
/*  Dimension token definitions                                         */
/* ------------------------------------------------------------------ */

export const spacingTokens: DimensionToken[] = [
  { cssVar: '--spacing', label: 'Base unit', defaultValue: 0.25, min: 0.0625, max: 0.75, step: 0.0625, unit: 'rem' },
]

export const borderWidthTokens: DimensionToken[] = [
  { cssVar: '--border-width-base', label: 'Base border width', defaultValue: 0.0625, min: 0, max: 0.25, step: 0.0625, unit: 'rem' },
]

export const radiusTokens: DimensionToken[] = [
  { cssVar: '--radius', label: 'Base radius', defaultValue: 0.5, min: 0, max: 1.5, step: 0.0625, unit: 'rem' },
]

export const typographySizeTokens: DimensionToken[] = [
  { cssVar: '--font-size-base', label: 'Base font size', defaultValue: 1, min: 0.625, max: 1.5, step: 0.025, unit: 'rem' },
]

export const lineHeightTokens: DimensionToken[] = [
  { cssVar: '--leading-base', label: 'Base line height', defaultValue: 1.33, min: 1, max: 2, step: 0.01, unit: '' },
]

export const letterSpacingTokens: DimensionToken[] = [
  { cssVar: '--letter-spacing-base', label: 'Base letter spacing', defaultValue: 0.025, min: 0, max: 0.1, step: 0.005, unit: 'em' },
]

export const opacityTokens: DimensionToken[] = [
  { cssVar: '--opacity-disabled', label: 'Disabled opacity', defaultValue: 0.5, min: 0, max: 1, step: 0.05, unit: '' },
]

export const shadowDimensionTokens: DimensionToken[] = [
  { cssVar: '--shadow-offset-y', label: 'Offset Y', defaultValue: 1, min: 0, max: 8, step: 0.5, unit: 'px' },
  { cssVar: '--shadow-blur', label: 'Blur', defaultValue: 2, min: 0, max: 10, step: 0.5, unit: 'px' },
  { cssVar: '--shadow-spread', label: 'Spread', defaultValue: 1, min: 0, max: 6, step: 0.5, unit: 'px' },
]

export const dropdownOffsetTokens: DimensionToken[] = [
  { cssVar: '--dropdown-offset', label: 'Dropdown offset', defaultValue: 4, min: 0, max: 16, step: 1, unit: '' },
]

export const overlayOffsetTokens: DimensionToken[] = [
  { cssVar: '--overlay-offset', label: 'Overlay offset', defaultValue: 4, min: 0, max: 16, step: 1, unit: '' },
]

export const containerTokens: DimensionToken[] = [
  { cssVar: '--container-sm', label: 'sm', defaultValue: 624, min: 336, max: 1104, step: 96, unit: 'px' },
  { cssVar: '--container-md', label: 'md', defaultValue: 816, min: 432, max: 1296, step: 96, unit: 'px' },
  { cssVar: '--container-lg', label: 'lg', defaultValue: 1104, min: 624, max: 1584, step: 96, unit: 'px' },
  { cssVar: '--container-xl', label: 'xl', defaultValue: 1392, min: 816, max: 1968, step: 96, unit: 'px' },
  { cssVar: '--container-2xl', label: '2xl', defaultValue: 1488, min: 1008, max: 2064, step: 96, unit: 'px' },
]

export const shadowColorToken: StringToken = {
  cssVar: '--shadow-base-color',
  label: 'Base color',
  defaultValue: 'rgba(0, 0, 0, 0.1)',
  placeholder: 'rgba(…) or color value',
}

export const allDimensionTokens = [
  ...spacingTokens,
  ...borderWidthTokens,
  ...radiusTokens,
  ...typographySizeTokens,
  ...lineHeightTokens,
  ...letterSpacingTokens,
  ...opacityTokens,
  ...shadowDimensionTokens,
  ...containerTokens,
  ...dropdownOffsetTokens,
  ...overlayOffsetTokens,
]

export const allStringTokens = [shadowColorToken]

/* ------------------------------------------------------------------ */
/*  DimensionSliderRow                                                  */
/* ------------------------------------------------------------------ */

export function DimensionSliderRow({
  token,
  onApply,
}: {
  token: DimensionToken
  onApply: (cssVar: string, value: string) => void
}) {
  const [value, setValue] = React.useState(() => {
    const resolved = getResolvedDimension(token.cssVar)
    return resolved ? parseNumericValue(resolved) : token.defaultValue
  })

  function handleChange(newVal: number | readonly number[]) {
    const num = Array.isArray(newVal) ? newVal[0] : newVal
    setValue(num)
    onApply(token.cssVar, `${num}${token.unit}`)
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const num = Number.parseFloat(e.target.value)
    if (!Number.isNaN(num)) {
      const clamped = Math.min(token.max, Math.max(token.min, num))
      setValue(clamped)
      onApply(token.cssVar, `${clamped}${token.unit}`)
    }
  }

  return (
    <HStack gap={3} align="end" className="py-1">
      <div className="flex-1">
        <FormSlider
          label={token.label}
          orientation="vertical"
          value={[value]}
          onValueChange={handleChange}
          min={token.min}
          max={token.max}
          step={token.step}
          showValue
          valueFormatter={(v) => {
            const n = Array.isArray(v) ? v[0] : v
            return `${n}${token.unit}`
          }}
        />
      </div>
      <FormInput
        className="w-20 shrink-0"
        type="number"
        value={value}
        onChange={handleInputChange}
        step={token.step}
        min={token.min}
        max={token.max}
      />
    </HStack>
  )
}

/* ------------------------------------------------------------------ */
/*  StringTokenRow                                                      */
/* ------------------------------------------------------------------ */

export function StringTokenRow({
  token,
  onApply,
}: {
  token: StringToken
  onApply: (cssVar: string, value: string) => void
}) {
  const [value, setValue] = React.useState(() => {
    const resolved = getResolvedDimension(token.cssVar)
    return resolved || token.defaultValue
  })

  function handleCommit() {
    const trimmed = value.trim()
    if (trimmed) onApply(token.cssVar, trimmed)
  }

  return (
    <div className="py-1">
      <Typography variant="caption-100" className="text-muted-foreground mb-1 block">
        {token.label}
      </Typography>
      <Input
        className="h-7 font-mono text-xs"
        value={value}
        placeholder={token.placeholder}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleCommit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleCommit()
        }}
      />
    </div>
  )
}
