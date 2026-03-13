import React from 'react'
import { HexColorPicker } from 'react-colorful'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { HStack, VStack } from '@/components/ui/stack'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Typography } from '@/components/ui/typography'
import { FormInput } from '@/components/ui-opinionated/form-input'
import { FormSlider } from '@/components/ui-opinionated/form-slider'

import semanticJson from '@/tokens/semantic.json'
import {
  defaultNeutral,
  softPastel,
  brutalist,
  corporateBlue,
  warmEarth,
  midnight,
  roseGold,
  forest,
  swissMinimal,
  oceanBreeze,
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

const PRESET_STYLE_ID = 'composable-preset-overrides'

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
  'default-neutral': {
    label: 'Default Neutral',
    description: 'Warm neutral base with JetBrains Mono body text',
    overrides: defaultNeutral,
    darkOverrides: {},
  },
  'soft-pastel': {
    label: 'Soft Pastel',
    description: 'Gentle lavender tones with rounded corners and soft shadows',
    overrides: softPastel,
    darkOverrides: {},
  },
  brutalist: {
    label: 'Brutalist',
    description: 'Bold borders, sharp corners, high contrast, monospace type',
    overrides: brutalist,
    darkOverrides: {},
  },
  'corporate-blue': {
    label: 'Corporate Blue',
    description: 'Professional blue palette with clean Inter typography',
    overrides: corporateBlue,
    darkOverrides: {},
  },
  'warm-earth': {
    label: 'Warm Earth',
    description: 'Earthy amber tones with elegant serif typography',
    overrides: warmEarth,
    darkOverrides: {},
  },
  midnight: {
    label: 'Midnight',
    description: 'Dark background with vibrant purple and blue accents',
    overrides: midnight,
    darkOverrides: {},
  },
  'rose-gold': {
    label: 'Rose Gold',
    description: 'Warm pinks with elegant Cormorant Garamond headings',
    overrides: roseGold,
    darkOverrides: {},
  },
  forest: {
    label: 'Forest',
    description: 'Deep greens with warm serif typography',
    overrides: forest,
    darkOverrides: {},
  },
  'swiss-minimal': {
    label: 'Swiss Minimal',
    description: 'Helvetica, no radius, no shadows, red accent — pure Swiss style',
    overrides: swissMinimal,
    darkOverrides: {},
  },
  'ocean-breeze': {
    label: 'Ocean Breeze',
    description: 'Cool cyan and teal tones with airy Nunito body text',
    overrides: oceanBreeze,
    darkOverrides: {},
  },
}

/* ------------------------------------------------------------------ */
/*  Color token flattening (from semantic.json)                        */
/* ------------------------------------------------------------------ */

interface FlatToken {
  cssVar: string
  reference: string
  category: string
  label: string
}

function flattenTokens(obj: Record<string, unknown>, prefix = '', category = ''): FlatToken[] {
  const tokens: FlatToken[] = []
  for (const [key, value] of Object.entries(obj)) {
    const currentCategory = category || key
    const path = prefix ? `${prefix}-${key}` : key
    if (
      value &&
      typeof value === 'object' &&
      '$type' in (value as Record<string, unknown>) &&
      '$value' in (value as Record<string, unknown>)
    ) {
      tokens.push({
        cssVar: `--${path}`,
        reference: (value as Record<string, string>).$value,
        category: currentCategory,
        label: prefix ? path.slice(currentCategory.length + 1) : key,
      })
    } else if (value && typeof value === 'object') {
      tokens.push(...flattenTokens(value as Record<string, unknown>, path, currentCategory))
    }
  }
  return tokens
}

const colorTokens = flattenTokens(semanticJson)
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
    defaultValue: 640,
    min: 320,
    max: 1024,
    step: 8,
    unit: 'px',
  },
  {
    cssVar: '--container-md',
    label: 'md',
    defaultValue: 768,
    min: 480,
    max: 1280,
    step: 8,
    unit: 'px',
  },
  {
    cssVar: '--container-lg',
    label: 'lg',
    defaultValue: 1024,
    min: 640,
    max: 1536,
    step: 8,
    unit: 'px',
  },
  {
    cssVar: '--container-xl',
    label: 'xl',
    defaultValue: 1280,
    min: 768,
    max: 1920,
    step: 8,
    unit: 'px',
  },
  {
    cssVar: '--container-2xl',
    label: '2xl',
    defaultValue: 1400,
    min: 960,
    max: 2048,
    step: 8,
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
          className="size-6 rounded border border-border/60 shrink-0"
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
        className="w-full h-7 rounded-md border border-border bg-transparent px-2 text-xs text-foreground outline-none focus:ring-[length:var(--border-width)] focus:ring-ring"
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

export function TokenConfigPanel() {
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
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="size-8">
          <PaletteIcon className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[440px] px-0 pb-0 pt-14">
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
            className="w-full h-7 rounded-md border border-border bg-transparent px-2 text-xs text-foreground outline-none focus:ring-[length:var(--border-width)] focus:ring-ring"
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
