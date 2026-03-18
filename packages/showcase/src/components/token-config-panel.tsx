// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.
import React from 'react'
import { HexColorPicker } from 'react-colorful'

import { Button } from '@/components/_internal/button'
import { Input } from '@/components/_internal/input'
import { ScrollArea } from '@/components/_internal/scroll-area'
import { Separator } from '@/components/_internal/separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/_internal/sheet'
import { HStack, VStack } from '@/components/_internal/stack'
import { Switch } from '@/components/_internal/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/_internal/tabs'
import { Textarea } from '@/components/_internal/textarea'
import { Typography } from '@/components/_internal/typography'
import { FormInput } from '@/components/ui-opinionated/form-input'
import { FormSlider } from '@/components/ui-opinionated/form-slider'

import {

  editorial,
  editorialDark,
  brutalist,
  brutalistDark,
  soft,
  softDark,
  swiss,
  swissDark,
  midnight,
  midnightDark,
} from '@/presets'

/* ------------------------------------------------------------------ */
/*  Google Fonts — grouped by style                                     */
/* ------------------------------------------------------------------ */

interface FontGroup {
  label: string
  fonts: string[]
}

const FONT_GROUPS: FontGroup[] = [
  {
    label: 'Sans-Serif',
    fonts: [
      'Inter',
      'Roboto',
      'Open Sans',
      'Lato',
      'Montserrat',
      'Poppins',
      'DM Sans',
      'Nunito',
      'Raleway',
      'Source Sans 3',
      'IBM Plex Sans',
      'Work Sans',
      'Outfit',
      'Plus Jakarta Sans',
      'Manrope',
      'Figtree',
      'Albert Sans',
      'Red Hat Display',
      'Lexend',
      'General Sans',
    ],
  },
  {
    label: 'Serif',
    fonts: [
      'Playfair Display',
      'Merriweather',
      'Lora',
      'Source Serif 4',
      'Cormorant Garamond',
      'Libre Baskerville',
      'Bitter',
      'Crimson Text',
      'EB Garamond',
      'DM Serif Display',
      'Fraunces',
      'Instrument Serif',
      'Newsreader',
    ],
  },
  {
    label: 'Display & Decorative',
    fonts: [
      'Space Grotesk',
      'Sora',
      'Clash Display',
      'Cabinet Grotesk',
      'Satoshi',
      'Epilogue',
      'Urbanist',
      'Archivo',
      'Be Vietnam Pro',
      'Schibsted Grotesk',
    ],
  },
  {
    label: 'Monospace',
    fonts: [
      'JetBrains Mono',
      'Fira Code',
      'Source Code Pro',
      'IBM Plex Mono',
      'Space Mono',
      'Roboto Mono',
      'Inconsolata',
      'Red Hat Mono',
      'DM Mono',
    ],
  },
  {
    label: 'Handwriting & Script',
    fonts: [
      'Caveat',
      'Dancing Script',
      'Pacifico',
      'Satisfy',
      'Kalam',
      'Patrick Hand',
    ],
  },
]

const ALL_FONT_NAMES = FONT_GROUPS.flatMap((g) => g.fonts)

const loadedFonts = new Set<string>()

function loadGoogleFont(name: string) {
  // Inter is already bundled via @fontsource-variable/inter
  if (name === 'Inter' || loadedFonts.has(name)) return
  loadedFonts.add(name)
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(name)}:wght@300;400;500;600;700&display=swap`
  document.head.appendChild(link)
}

/* ------------------------------------------------------------------ */
/*  Presets                                                             */
/* ------------------------------------------------------------------ */

interface Preset {
  label: string
  description: string
  overrides: Record<string, string>
  darkOverrides: Record<string, string>
}

const PRESET_STYLE_ID = 'composables-preset-overrides'

/** Build a <style> element with :root and .dark blocks from a preset */
function buildPresetStyleSheet(preset: Preset): string {
  const lightLines = Object.entries(preset.overrides)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join('\n')
  const darkLines = Object.entries(preset.darkOverrides)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join('\n')
  return `:root {\n${lightLines}\n}\n.dark {\n${darkLines}\n}`
}

function injectPresetStyle(preset: Preset) {
  removePresetStyle()
  const style = document.createElement('style')
  style.id = PRESET_STYLE_ID
  style.textContent = buildPresetStyleSheet(preset)
  document.head.appendChild(style)
}

function removePresetStyle() {
  document.getElementById(PRESET_STYLE_ID)?.remove()
}

const presets: Record<string, Preset | null> = {
  default: null,
  editorial: {
    label: 'Editorial',
    description: 'Sophisticated magazine aesthetic — Fraunces headings, Source Serif 4 body, warm palette',
    overrides: editorial,
    darkOverrides: editorialDark,
  },
  brutalist: {
    label: 'Brutalist',
    description: 'Architectural restraint — zero radius, hard shadows, IBM Plex Mono body, editorial red',
    overrides: brutalist,
    darkOverrides: brutalistDark,
  },
  soft: {
    label: 'Soft',
    description: 'Warm and approachable — Plus Jakarta Sans, lavender tones, generous radius',
    overrides: soft,
    darkOverrides: softDark,
  },
  swiss: {
    label: 'Swiss',
    description: 'International Typographic Style — Helvetica Neue, zero radius, zero shadow, red accent',
    overrides: swiss,
    darkOverrides: swissDark,
  },
  midnight: {
    label: 'Midnight',
    description: 'Dark-first premium — deep navy, violet accent, glow shadows, Space Grotesk headings',
    overrides: midnight,
    darkOverrides: midnightDark,
  },
}

/* ------------------------------------------------------------------ */
/*  Color token definitions (mirrors semantic token structure)          */
/* ------------------------------------------------------------------ */

interface FlatToken {
  cssVar: string
  reference: string
  category: string
  label: string
}

const colorTokens: FlatToken[] = [
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

const colorCategories = [...new Set(colorTokens.map((t) => t.category))]
const colorTokensByCategory = Object.groupBy(colorTokens, (t) => t.category)

/* ------------------------------------------------------------------ */
/*  Non-color token definitions (from index.css @theme)                */
/* ------------------------------------------------------------------ */

interface DimensionToken {
  cssVar: string
  label: string
  defaultValue: number
  min: number
  max: number
  step: number
  unit: string
}

const spacingTokens: DimensionToken[] = [
  {
    cssVar: '--spacing',
    label: 'Base unit',
    defaultValue: 0.25,
    min: 0.0625,
    max: 0.75,
    step: 0.0625,
    unit: 'rem',
  },
]

const borderWidthTokens: DimensionToken[] = [
  {
    cssVar: '--border-width-base',
    label: 'Base border width',
    defaultValue: 0.0625,
    min: 0,
    max: 0.25,
    step: 0.0625,
    unit: 'rem',
  },
]

const radiusTokens: DimensionToken[] = [
  {
    cssVar: '--radius',
    label: 'Base radius',
    defaultValue: 0.5,
    min: 0,
    max: 1.5,
    step: 0.0625,
    unit: 'rem',
  },
]

const typographySizeTokens: DimensionToken[] = [
  {
    cssVar: '--font-size-base',
    label: 'Base font size',
    defaultValue: 1,
    min: 0.625,
    max: 1.5,
    step: 0.025,
    unit: 'rem',
  },
]

const lineHeightTokens: DimensionToken[] = [
  {
    cssVar: '--leading-base',
    label: 'Base line height',
    defaultValue: 1.33,
    min: 1,
    max: 2,
    step: 0.01,
    unit: '',
  },
]

const letterSpacingTokens: DimensionToken[] = [
  {
    cssVar: '--letter-spacing-base',
    label: 'Base letter spacing',
    defaultValue: 0.025,
    min: 0,
    max: 0.1,
    step: 0.005,
    unit: 'em',
  },
]

const opacityTokens: DimensionToken[] = [
  {
    cssVar: '--opacity-hover',
    label: 'Hover opacity',
    defaultValue: 0.8,
    min: 0,
    max: 1,
    step: 0.05,
    unit: '',
  },
  {
    cssVar: '--opacity-active',
    label: 'Active opacity',
    defaultValue: 0.7,
    min: 0,
    max: 1,
    step: 0.05,
    unit: '',
  },
  {
    cssVar: '--opacity-disabled',
    label: 'Disabled opacity',
    defaultValue: 0.5,
    min: 0,
    max: 1,
    step: 0.05,
    unit: '',
  },
]

const dropdownOffsetTokens: DimensionToken[] = [
  {
    cssVar: '--dropdown-offset',
    label: 'Dropdown offset',
    defaultValue: 4,
    min: 0,
    max: 16,
    step: 1,
    unit: '',
  },
]

const overlayOffsetTokens: DimensionToken[] = [
  {
    cssVar: '--overlay-offset',
    label: 'Overlay offset',
    defaultValue: 4,
    min: 0,
    max: 16,
    step: 1,
    unit: '',
  },
]

const containerTokens: DimensionToken[] = [
  {
    cssVar: '--container-sm',
    label: 'sm',
    defaultValue: 624,
    min: 336,
    max: 1056,
    step: 48,
    unit: 'px',
  },
  {
    cssVar: '--container-md',
    label: 'md',
    defaultValue: 768,
    min: 480,
    max: 1296,
    step: 48,
    unit: 'px',
  },
  {
    cssVar: '--container-lg',
    label: 'lg',
    defaultValue: 1056,
    min: 624,
    max: 1536,
    step: 48,
    unit: 'px',
  },
  {
    cssVar: '--container-xl',
    label: 'xl',
    defaultValue: 1296,
    min: 768,
    max: 1920,
    step: 48,
    unit: 'px',
  },
  {
    cssVar: '--container-2xl',
    label: '2xl',
    defaultValue: 1440,
    min: 960,
    max: 2064,
    step: 48,
    unit: 'px',
  },
]

interface StringToken {
  cssVar: string
  label: string
  defaultValue: string
  placeholder?: string
}

const shadowColorToken: StringToken = {
  cssVar: '--shadow-base-color',
  label: 'Base color',
  defaultValue: 'rgba(0, 0, 0, 0.1)',
  placeholder: 'rgba(…) or color value',
}

const shadowDimensionTokens: DimensionToken[] = [
  {
    cssVar: '--shadow-offset-y',
    label: 'Offset Y',
    defaultValue: 1,
    min: 0,
    max: 8,
    step: 0.5,
    unit: 'px',
  },
  {
    cssVar: '--shadow-blur',
    label: 'Blur',
    defaultValue: 2,
    min: 0,
    max: 10,
    step: 0.5,
    unit: 'px',
  },
  {
    cssVar: '--shadow-spread',
    label: 'Spread',
    defaultValue: 1,
    min: 0,
    max: 6,
    step: 0.5,
    unit: 'px',
  },
]

/** Every non-color token for reset/JSON export purposes */
const allDimensionTokens = [
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

const allStringTokens = [shadowColorToken]

const fontCssVars = ['--font-sans', '--font-heading', '--font-brand'] as const

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

function getResolvedColor(cssVar: string): string {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim()
  if (raw.startsWith('#') || raw.startsWith('rgb')) return raw
  const temp = document.createElement('div')
  temp.style.color = `var(${cssVar})`
  document.body.appendChild(temp)
  const resolved = getComputedStyle(temp).color
  document.body.removeChild(temp)
  return rgbToHex(resolved)
}

function rgbToHex(rgb: string): string {
  const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/)
  if (!match) return rgb
  const r = Number.parseInt(match[1], 10).toString(16).padStart(2, '0')
  const g = Number.parseInt(match[2], 10).toString(16).padStart(2, '0')
  const b = Number.parseInt(match[3], 10).toString(16).padStart(2, '0')
  return `#${r}${g}${b}`
}

function getResolvedDimension(cssVar: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim()
}

function parseNumericValue(raw: string): number {
  return Number.parseFloat(raw) || 0
}

/* ------------------------------------------------------------------ */
/*  Color TokenRow                                                      */
/* ------------------------------------------------------------------ */

function ColorTokenRow({
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

/* ------------------------------------------------------------------ */
/*  Dimension SliderRow (spacing / radius / type / containers)          */
/* ------------------------------------------------------------------ */

function DimensionSliderRow({
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
/*  String TokenRow (easing curves, shadow color)                       */
/* ------------------------------------------------------------------ */

function StringTokenRow({
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
    if (trimmed) {
      onApply(token.cssVar, trimmed)
    }
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

/* ------------------------------------------------------------------ */
/*  Font select row                                                     */
/* ------------------------------------------------------------------ */

function FontSelectRow({
  label,
  cssVar,
  onApply,
}: {
  label: string
  cssVar: string
  onApply: (cssVar: string, value: string) => void
}) {
  const [value, setValue] = React.useState(() => {
    const resolved = getResolvedDimension(cssVar).trim()
    // Try to find the matching font name from our list
    for (const font of ALL_FONT_NAMES) {
      if (resolved.startsWith(`"${font}"`) || resolved.startsWith(font)) {
        return font
      }
    }
    return 'Inter'
  })

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const font = e.target.value
    setValue(font)
    loadGoogleFont(font)
    const fontValue = font === 'Inter' ? '"Inter Variable", sans-serif' : `"${font}", sans-serif`
    onApply(cssVar, fontValue)
  }

  return (
    <div className="py-1">
      <Typography variant="caption-100" className="text-muted-foreground mb-1 block">
        {label}
      </Typography>
      <select
        value={value}
        onChange={handleChange}
        className="w-full h-7 rounded-md border border-stroke bg-transparent px-2 text-xs text-foreground outline-none focus:ring-[length:var(--border-width)] focus:ring-focus"
      >
        {FONT_GROUPS.map((group) => (
          <optgroup key={group.label} label={group.label}>
            {group.fonts.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Section header                                                      */
/* ------------------------------------------------------------------ */

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      variant="caption-100"
      className="text-muted-foreground uppercase tracking-wider mb-1 block"
    >
      {children}
    </Typography>
  )
}

/* ------------------------------------------------------------------ */
/*  Palette Icon                                                        */
/* ------------------------------------------------------------------ */

function PaletteIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <title>Palette</title>
      <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" />
      <circle cx="6.5" cy="12" r="0.5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  TokenConfigPanel                                                    */
/* ------------------------------------------------------------------ */

interface TokenConfigPanelProps {
  dark?: boolean
  onDarkChange?: (dark: boolean) => void
  grid?: boolean
  onGridChange?: (grid: boolean) => void
}

export function TokenConfigPanel({ dark, onDarkChange, grid, onGridChange }: TokenConfigPanelProps = {}) {
  const [overrides, setOverrides] = React.useState<Record<string, string>>({})
  const [activePreset, setActivePreset] = React.useState<string>('default')
  const [jsonText, setJsonText] = React.useState('')
  const [jsonError, setJsonError] = React.useState<string | null>(null)

  // Clean up injected style on unmount
  React.useEffect(() => {
    return () => removePresetStyle()
  }, [])

  function applyOverride(cssVar: string, value: string) {
    document.documentElement.style.setProperty(cssVar, value)
    setOverrides((prev) => ({ ...prev, [cssVar]: value }))
  }

  function clearInlineOverrides() {
    for (const token of colorTokens) {
      document.documentElement.style.removeProperty(token.cssVar)
    }
    for (const token of allDimensionTokens) {
      document.documentElement.style.removeProperty(token.cssVar)
    }
    for (const token of allStringTokens) {
      document.documentElement.style.removeProperty(token.cssVar)
    }
    for (const v of fontCssVars) {
      document.documentElement.style.removeProperty(v)
    }
    setOverrides({})
  }

  function resetAll() {
    clearInlineOverrides()
    removePresetStyle()
    setActivePreset('default')
  }

  function applyPreset(presetKey: string) {
    clearInlineOverrides()
    removePresetStyle()
    setActivePreset(presetKey)

    const preset = presets[presetKey]
    if (!preset) return

    // Pre-load any Google Fonts referenced in the preset
    for (const v of fontCssVars) {
      const fontValue = preset.overrides[v]
      if (fontValue) {
        const match = fontValue.match(/^"([^"]+)"/)
        if (match) loadGoogleFont(match[1])
      }
    }

    // Inject a <style> sheet with :root and .dark blocks so the preset
    // respects dark-mode toggling via the .dark class on <html>.
    injectPresetStyle(preset)
    setOverrides(preset.overrides)
  }

  function buildJsonSnapshot(): Record<string, string> {
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

  function handleTabChange(value: string) {
    if (value === 'json') {
      setJsonText(JSON.stringify(buildJsonSnapshot(), null, 2))
      setJsonError(null)
    }
  }

  function applyJson() {
    try {
      const parsed = JSON.parse(jsonText) as Record<string, string>
      // JSON import replaces everything — remove any active preset stylesheet
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

  const overrideCount = Object.keys(overrides).length

  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" size="icon" className="size-8" />}>
        <PaletteIcon className="size-4" />
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-[400px] sm:max-w-[440px] px-0 pb-0 pt-14">
        <SheetHeader className="px-4 pt-4 pb-2">
          <SheetTitle className="flex items-center justify-between">
            <span>Token Config</span>
            {overrideCount > 0 && (
              <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={resetAll}>
                Reset all ({overrideCount})
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>

        {/* Display toggles */}
        {(onDarkChange !== undefined || onGridChange !== undefined) && (
          <div className="px-4 pb-3">
            <Typography
              variant="caption-100"
              className="text-muted-foreground uppercase tracking-wider mb-2 block"
            >
              Display
            </Typography>
            <HStack gap={4}>
              {onDarkChange !== undefined && (
                <HStack gap={2} align="center">
                  <Switch checked={dark ?? false} onCheckedChange={onDarkChange} aria-label="Toggle dark mode" />
                  <Typography variant="caption-100" className="text-muted-foreground">Dark mode</Typography>
                </HStack>
              )}
              {onGridChange !== undefined && (
                <HStack gap={2} align="center">
                  <Switch checked={grid ?? false} onCheckedChange={onGridChange} aria-label="Toggle grid overlay" />
                  <Typography variant="caption-100" className="text-muted-foreground">Grid</Typography>
                </HStack>
              )}
            </HStack>
          </div>
        )}

        {/* Preset selector */}
        <div className="px-4 pb-2">
          <Typography
            variant="caption-100"
            className="text-muted-foreground uppercase tracking-wider mb-1 block"
          >
            Preset
          </Typography>
          <select
            value={activePreset}
            onChange={(e) => applyPreset(e.target.value)}
            className="w-full h-7 rounded-md border border-stroke bg-transparent px-2 text-xs text-foreground outline-none focus:ring-[length:var(--border-width)] focus:ring-focus"
          >
            <option value="default">Default</option>
            {Object.entries(presets)
              .filter(([key]) => key !== 'default')
              .map(([key, preset]) => (
                <option key={key} value={key}>
                  {preset?.label ?? key}
                </option>
              ))}
          </select>
        </div>

        <Tabs
          defaultValue="visual"
          className="flex flex-col h-[calc(100vh-14rem)]"
          onValueChange={handleTabChange}
        >
          <TabsList className="mx-4 mb-2">
            <TabsTrigger value="visual">Visual</TabsTrigger>
            <TabsTrigger value="json">JSON</TabsTrigger>
          </TabsList>

          {/* ---- Visual mode ---- */}
          <TabsContent value="visual" className="flex-1 overflow-hidden mt-0">
            <ScrollArea className="h-full">
              <div className="px-4 pb-6">
                {/* Spacing */}
                <div className="mb-4">
                  <SectionHeader>Spacing</SectionHeader>
                  <VStack gap={1}>
                    {spacingTokens.map((t) => (
                      <DimensionSliderRow key={t.cssVar} token={t} onApply={applyOverride} />
                    ))}
                  </VStack>
                </div>

                <Separator className="my-3" />

                {/* Border Width */}
                <div className="mb-4">
                  <SectionHeader>Border Width</SectionHeader>
                  <VStack gap={1}>
                    {borderWidthTokens.map((t) => (
                      <DimensionSliderRow key={t.cssVar} token={t} onApply={applyOverride} />
                    ))}
                  </VStack>
                </div>

                <Separator className="my-3" />

                {/* Border Radius */}
                <div className="mb-4">
                  <SectionHeader>Border Radius</SectionHeader>
                  <VStack gap={1}>
                    {radiusTokens.map((t) => (
                      <DimensionSliderRow key={t.cssVar} token={t} onApply={applyOverride} />
                    ))}
                  </VStack>
                </div>

                <Separator className="my-3" />

                {/* Typography — Base Font Size */}
                <div className="mb-4">
                  <SectionHeader>Font Size</SectionHeader>
                  <VStack gap={1}>
                    {typographySizeTokens.map((t) => (
                      <DimensionSliderRow key={t.cssVar} token={t} onApply={applyOverride} />
                    ))}
                  </VStack>
                </div>

                <Separator className="my-3" />

                {/* Typography — Base Line Height */}
                <div className="mb-4">
                  <SectionHeader>Line Height</SectionHeader>
                  <VStack gap={1}>
                    {lineHeightTokens.map((t) => (
                      <DimensionSliderRow key={t.cssVar} token={t} onApply={applyOverride} />
                    ))}
                  </VStack>
                </div>

                <Separator className="my-3" />

                {/* Letter Spacing */}
                <div className="mb-4">
                  <SectionHeader>Letter Spacing</SectionHeader>
                  <VStack gap={1}>
                    {letterSpacingTokens.map((t) => (
                      <DimensionSliderRow key={t.cssVar} token={t} onApply={applyOverride} />
                    ))}
                  </VStack>
                </div>

                <Separator className="my-3" />

                {/* Font Family */}
                <div className="mb-4">
                  <SectionHeader>Font Family</SectionHeader>
                  <VStack gap={1}>
                    <FontSelectRow label="Sans / body (--font-sans)" cssVar="--font-sans" onApply={applyOverride} />
                    <FontSelectRow label="Heading (--font-heading)" cssVar="--font-heading" onApply={applyOverride} />
                    <FontSelectRow label="Brand (--font-brand)" cssVar="--font-brand" onApply={applyOverride} />
                  </VStack>
                </div>

                <Separator className="my-3" />

                {/* Shadow */}
                <div className="mb-4">
                  <SectionHeader>Shadow</SectionHeader>
                  <VStack gap={1}>
                    {shadowDimensionTokens.map((t) => (
                      <DimensionSliderRow key={t.cssVar} token={t} onApply={applyOverride} />
                    ))}
                    <StringTokenRow token={shadowColorToken} onApply={applyOverride} />
                  </VStack>
                </div>

                <Separator className="my-3" />

                {/* Opacity */}
                <div className="mb-4">
                  <SectionHeader>Opacity</SectionHeader>
                  <VStack gap={1}>
                    {opacityTokens.map((t) => (
                      <DimensionSliderRow key={t.cssVar} token={t} onApply={applyOverride} />
                    ))}
                  </VStack>
                </div>

                <Separator className="my-3" />

                {/* Container Breakpoints */}
                <div className="mb-4">
                  <SectionHeader>Container Breakpoints</SectionHeader>
                  <VStack gap={1}>
                    {containerTokens.map((t) => (
                      <DimensionSliderRow key={t.cssVar} token={t} onApply={applyOverride} />
                    ))}
                  </VStack>
                </div>

                <Separator className="my-3" />

                {/* Positioning */}
                <div className="mb-4">
                  <SectionHeader>Positioning</SectionHeader>
                  <VStack gap={1}>
                    {dropdownOffsetTokens.map((t) => (
                      <DimensionSliderRow key={t.cssVar} token={t} onApply={applyOverride} />
                    ))}
                    {overlayOffsetTokens.map((t) => (
                      <DimensionSliderRow key={t.cssVar} token={t} onApply={applyOverride} />
                    ))}
                  </VStack>
                </div>

                <Separator className="my-3" />

                {/* Color Tokens */}
                {colorCategories.map((cat) => (
                  <div key={cat} className="mb-4">
                    <SectionHeader>{cat}</SectionHeader>
                    <VStack gap={0}>
                      {(colorTokensByCategory[cat] ?? []).map((token) => (
                        <ColorTokenRow key={token.cssVar} token={token} onApply={applyOverride} />
                      ))}
                    </VStack>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* ---- JSON mode ---- */}
          <TabsContent value="json" className="flex-1 overflow-hidden mt-0 px-4">
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
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
