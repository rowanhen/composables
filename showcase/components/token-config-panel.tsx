import React from 'react'
import { HexColorPicker } from 'react-colorful'

import { Button } from '../../src/components/ui/button'
import { Input } from '../../src/components/ui/input'
import { ScrollArea } from '../../src/components/ui/scroll-area'
import { Separator } from '../../src/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../../src/components/ui/sheet'
import { HStack, VStack } from '../../src/components/ui/stack'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../src/components/ui/tabs'
import { Textarea } from '../../src/components/ui/textarea'
import { Typography } from '../../src/components/ui/typography'
import { FormInput } from '../../src/components/ui-extended/form-input'
import { FormSlider } from '../../src/components/ui-extended/form-slider'

import semanticJson from '../../src/tokens/semantic.json'

/* ------------------------------------------------------------------ */
/*  Presets                                                             */
/* ------------------------------------------------------------------ */

interface Preset {
  label: string
  description: string
  overrides: Record<string, string>
  darkOverrides: Record<string, string>
}

const PRESET_STYLE_ID = 'smores-preset-overrides'

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

/**
 * Marshmallow customer-facing website tokens mapped to internal CSS variables.
 *
 * Tokens that DON'T have a direct 1:1 mapping (kept as comments for reference):
 *  - fontFamily (CircularXX / "Marshmallow Youth") — no runtime CSS var exposed
 *  - font composite tokens (hero, heading, body, label, caption, link) — composite objects
 *  - grid (breakpoints, columns, gutter, margin) — different structure
 *  - elevation / z-index tokens — no panel equivalent
 *  - letterSpacing — no exposed CSS var
 *  - thirdParty / extended1 — no internal equivalent
 *  - space / size / radius — different scale naming; closest match is base unit sliders
 */
const marshmallowPreset: Preset = {
  label: 'Marshmallow',
  description: 'Customer-facing website colour scheme',
  overrides: {
    /* ── Backgrounds ─────────────────────────────────────── */
    '--bg-default': '#fbf8f5', // color.background.100 → neutral.010
    '--bg-muted': '#f8f2ea', // color.background.200 → neutral.020
    '--bg-inverse': '#292924', // color.text.base → secondary.100

    /* ── Surface backgrounds ─────────────────────────────── */
    '--bg-surface-default': '#ffffff', // color.surface.base.000
    '--bg-surface-hover': '#f8f2ea', // color.interactive.neutral.subtle.hover
    '--bg-surface-inverse': '#292924', // color.surface.base.900
    '--bg-surface-brand': '#ffcce7', // color.surface.brand.100 → primary.040
    '--bg-surface-info': '#d0e3f2', // color.feedback.informative.100
    '--bg-surface-success': '#c9e2ce', // color.feedback.positive.100
    '--bg-surface-warning': '#fcf0d0', // color.feedback.notice.100
    '--bg-surface-critical': '#f5cfcc', // color.feedback.negative.100

    /* ── Fill backgrounds ────────────────────────────────── */
    '--bg-fill-default': '#fbf8f5', // color.surface.base.100
    '--bg-fill-primary': '#292924', // color.text.base (dark fill)
    '--bg-fill-brand': '#ff88c8', // color.interactive.primary.base → primary.100
    '--bg-fill-info': '#4d92c9', // color.feedback.informative.200
    '--bg-fill-success': '#317a4c', // color.feedback.positive.200
    '--bg-fill-warning': '#f2cb4a', // color.feedback.notice.200
    '--bg-fill-critical': '#d03c30', // color.feedback.negative.200
    '--bg-fill-secondary': '#292924', // secondary.100
    '--bg-fill-secondary-inverse': '#ffffff', // neutral.000

    /* ── Text ────────────────────────────────────────────── */
    '--text-default': '#292924', // color.text.base → secondary.100
    '--text-secondary': '#444543', // color.text.subtle fallback → secondary.080
    '--text-muted': '#636768', // color.text.subtle → secondary.060
    '--text-disabled': '#a2a5a6', // secondary.050
    '--text-inverse': '#ffffff', // color.text.inverse
    '--text-info': '#4d92c9', // color.feedback.informative.200
    '--text-success': '#317a4c', // color.feedback.positive.200
    '--text-warning': '#f2cb4a', // color.feedback.notice.200
    '--text-critical': '#d03c30', // color.feedback.negative.200
    '--text-brand': '#e43e93', // primary.140
    '--text-link': '#4d92c9', // informative.100

    /* ── Icons ───────────────────────────────────────────── */
    '--icon-default': '#292924', // color.icon.base
    '--icon-secondary': '#636768', // color.icon.subtle
    '--icon-disabled': '#d2d2d2', // secondary.040
    '--icon-inverse': '#ffffff', // color.icon.inverse
    '--icon-info': '#4d92c9', // informative.100
    '--icon-success': '#317a4c', // positive.100
    '--icon-warning': '#f2cb4a', // notice.100
    '--icon-critical': '#d03c30', // negative.100
    '--icon-brand': '#c22274', // primary.160

    /* ── Borders ─────────────────────────────────────────── */
    '--border-default': '#dad2c4', // color.border.subtle → neutral.060
    '--border-secondary': '#9d927b', // color.border.base → neutral.100
    '--border-tertiary': '#292924', // color.border.contrast
    '--border-disabled': '#d2d2d2', // secondary.040
    '--border-inverse': '#0e0e0c', // secondary.120
    '--border-focus': '#0e0e0c', // color.focus.onLight
    '--border-brand': '#ff88c8', // primary.100
    '--border-info': '#4d92c9', // informative.100
    '--border-success': '#317a4c', // positive.100
    '--border-warning': '#f2cb4a', // notice.100
    '--border-critical': '#d03c30', // negative.100

    /* ── Charts (using brand accent colours) ─────────────── */
    '--chart-1': '#294636', // brand1.100
    '--chart-2': '#89a2b6', // brand2.100
    '--chart-3': '#838e49', // brand3.100
    '--chart-4': '#c26b2a', // brand4.100
    '--chart-5': '#ff88c8', // primary.100

    /* ── Primitive overrides (for components that reference primitives) ── */
    '--pink-100': '#ffe0f0', // primary.020
    '--pink-200': '#ffcce7', // primary.040
    '--pink-300': '#ffb3da', // primary.060
    '--pink-400': '#ff9dcd', // primary.080
    '--pink-500': '#ff88c8', // primary.100
    '--pink-600': '#ff88c8', // primary.100 (closest)
    '--pink-700': '#f759a9', // primary.120
    '--pink-800': '#e43e93', // primary.140
    '--pink-900': '#c22274', // primary.160
    '--pink-950': '#c22274', // primary.160
    '--pink-1000': '#c22274', // primary.160

    '--neutral-50': '#ffffff', // neutral.000
    '--neutral-100': '#fbf8f5', // neutral.010
    '--neutral-200': '#f8f2ea', // neutral.020
    '--neutral-300': '#f1e9dc', // neutral.040
    '--neutral-400': '#dad2c4', // neutral.060
    '--neutral-500': '#dad2c4', // neutral.060
    '--neutral-600': '#beb4a0', // neutral.080
    '--neutral-700': '#9d927b', // neutral.100
    '--neutral-800': '#7c735f', // neutral.120
    '--neutral-900': '#7c735f', // neutral.120
    '--neutral-950': '#444543', // secondary.080
    '--neutral-1000': '#292924', // secondary.100

    '--red-100': '#f5cfcc', // negative.020
    '--red-200': '#f5cfcc', // negative.020
    '--red-300': '#f1b2a8', // negative.040
    '--red-400': '#f1b2a8', // negative.040
    '--red-500': '#e27a67', // negative.080
    '--red-600': '#e27a67', // negative.080
    '--red-700': '#d03c30', // negative.100
    '--red-800': '#d03c30', // negative.100
    '--red-900': '#a32f26', // negative.120
    '--red-950': '#a32f26', // negative.120
    '--red-1000': '#a32f26', // negative.120

    '--green-100': '#c9e2ce', // positive.020
    '--green-200': '#c9e2ce', // positive.020
    '--green-700': '#317a4c', // positive.100
    '--green-800': '#317a4c', // positive.100
    '--green-900': '#28653f', // positive.120
    '--green-950': '#28653f', // positive.120
    '--green-1000': '#28653f', // positive.120

    '--blue-100': '#d0e3f2', // informative.020
    '--blue-200': '#d0e3f2', // informative.020
    '--blue-700': '#4d92c9', // informative.100
    '--blue-800': '#4d92c9', // informative.100
    '--blue-950': '#4d92c9', // informative.100
    '--blue-1000': '#4d92c9', // informative.100

    '--sky-100': '#d0e3f2', // informative.020
    '--sky-800': '#4d92c9', // informative.100
    '--sky-950': '#4d92c9', // informative.100
    '--sky-1000': '#4d92c9', // informative.100

    '--orange-100': '#fcf0d0', // notice.020
    '--orange-800': '#f2cb4a', // notice.100
    '--orange-950': '#f2cb4a', // notice.100
    '--orange-1000': '#f2cb4a', // notice.100

    '--amber-100': '#fcf0d0', // notice.020
    '--amber-800': '#f2cb4a', // notice.100
  },
  darkOverrides: {
    /* ── Backgrounds (inverted — dark surfaces) ──────────── */
    '--bg-default': '#0e0e0c', // secondary.120 (darkest)
    '--bg-muted': '#292924', // secondary.100
    '--bg-inverse': '#fbf8f5', // neutral.010

    /* ── Surface backgrounds ─────────────────────────────── */
    '--bg-surface-default': '#0e0e0c', // secondary.120
    '--bg-surface-hover': '#292924', // secondary.100
    '--bg-surface-inverse': '#fbf8f5', // neutral.010
    '--bg-surface-brand': '#c22274', // primary.160 (darker brand)
    '--bg-surface-info': '#1a3a52', // informative darkened
    '--bg-surface-success': '#1a3d28', // positive darkened
    '--bg-surface-warning': '#3d3218', // notice darkened
    '--bg-surface-critical': '#3d1a17', // negative darkened

    /* ── Fill backgrounds ────────────────────────────────── */
    '--bg-fill-default': '#0e0e0c', // secondary.120
    '--bg-fill-primary': '#f8f2ea', // neutral.020 (light fill on dark)
    '--bg-fill-brand': '#e43e93', // primary.140
    '--bg-fill-info': '#4d92c9', // informative.100
    '--bg-fill-success': '#317a4c', // positive.100
    '--bg-fill-warning': '#f2cb4a', // notice.100
    '--bg-fill-critical': '#d03c30', // negative.100
    '--bg-fill-secondary': '#f8f2ea', // neutral.020
    '--bg-fill-secondary-inverse': '#0e0e0c', // secondary.120

    /* ── Text (light on dark) ────────────────────────────── */
    '--text-default': '#f8f2ea', // neutral.020
    '--text-secondary': '#dad2c4', // neutral.060
    '--text-muted': '#beb4a0', // neutral.080
    '--text-disabled': '#636768', // secondary.060
    '--text-inverse': '#0e0e0c', // secondary.120
    '--text-info': '#89a2b6', // brand2.100 (lighter blue)
    '--text-success': '#c9e2ce', // positive.020
    '--text-warning': '#f2cb4a', // notice.100
    '--text-critical': '#f1b2a8', // negative.040
    '--text-brand': '#ff88c8', // primary.100
    '--text-link': '#89a2b6', // brand2.100

    /* ── Icons ───────────────────────────────────────────── */
    '--icon-default': '#f8f2ea', // neutral.020
    '--icon-secondary': '#beb4a0', // neutral.080
    '--icon-disabled': '#636768', // secondary.060
    '--icon-inverse': '#0e0e0c', // secondary.120
    '--icon-info': '#89a2b6', // brand2.100
    '--icon-success': '#c9e2ce', // positive.020
    '--icon-warning': '#f2cb4a', // notice.100
    '--icon-critical': '#f1b2a8', // negative.040
    '--icon-brand': '#ff88c8', // primary.100

    /* ── Borders ─────────────────────────────────────────── */
    '--border-default': '#444543', // secondary.080
    '--border-secondary': '#636768', // secondary.060
    '--border-tertiary': '#9d927b', // neutral.100
    '--border-disabled': '#444543', // secondary.080
    '--border-inverse': '#f8f2ea', // neutral.020
    '--border-focus': '#ffffff', // color.focus.onDark
    '--border-brand': '#e43e93', // primary.140
    '--border-info': '#89a2b6', // brand2.100
    '--border-success': '#317a4c', // positive.100
    '--border-warning': '#f2cb4a', // notice.100
    '--border-critical': '#d03c30', // negative.100

    /* ── Charts ──────────────────────────────────────────── */
    '--chart-1': '#3b5848', // brand1.060
    '--chart-2': '#bbcfdf', // brand2.060
    '--chart-3': '#dbe1b0', // brand3.060
    '--chart-4': '#f8c699', // brand4.060
    '--chart-5': '#ff88c8', // primary.100

    /* ── Primitive overrides (dark mode) ─────────────────── */
    '--pink-100': '#3d1228', // darkened primary
    '--pink-200': '#4b1733', // darkened primary
    '--pink-300': '#5e1d40', // darkened primary
    '--pink-400': '#7a2656', // darkened primary
    '--pink-500': '#9e3270', // darkened primary
    '--pink-600': '#c22274', // primary.160
    '--pink-700': '#e43e93', // primary.140
    '--pink-800': '#e43e93', // primary.140
    '--pink-900': '#f759a9', // primary.120
    '--pink-950': '#ff88c8', // primary.100
    '--pink-1000': '#ffcce7', // primary.040

    '--neutral-50': '#0a0a09', // near black
    '--neutral-100': '#0e0e0c', // secondary.120
    '--neutral-200': '#1a1a18', // dark step
    '--neutral-300': '#292924', // secondary.100
    '--neutral-400': '#444543', // secondary.080
    '--neutral-500': '#444543', // secondary.080
    '--neutral-600': '#636768', // secondary.060
    '--neutral-700': '#7c735f', // neutral.120
    '--neutral-800': '#9d927b', // neutral.100
    '--neutral-900': '#beb4a0', // neutral.080
    '--neutral-950': '#dad2c4', // neutral.060
    '--neutral-1000': '#f8f2ea', // neutral.020

    '--red-100': '#3d1a17', // darkened negative
    '--red-200': '#4d201c', // darkened negative
    '--red-300': '#5e2822', // darkened negative
    '--red-400': '#73312a', // darkened negative
    '--red-500': '#8c3c34', // darkened negative
    '--red-600': '#a32f26', // negative.120
    '--red-700': '#d03c30', // negative.100
    '--red-800': '#d03c30', // negative.100
    '--red-900': '#e27a67', // negative.080
    '--red-950': '#f1b2a8', // negative.040
    '--red-1000': '#f5cfcc', // negative.020

    '--green-100': '#1a3d28', // darkened positive
    '--green-200': '#1e4a30', // darkened positive
    '--green-700': '#317a4c', // positive.100
    '--green-800': '#317a4c', // positive.100
    '--green-900': '#c9e2ce', // positive.020 (lighter for dark)
    '--green-950': '#c9e2ce', // positive.020
    '--green-1000': '#c9e2ce', // positive.020

    '--blue-100': '#1a3a52', // darkened informative
    '--blue-200': '#1e4463', // darkened informative
    '--blue-700': '#4d92c9', // informative.100
    '--blue-800': '#4d92c9', // informative.100
    '--blue-950': '#89a2b6', // brand2.100
    '--blue-1000': '#d0e3f2', // informative.020

    '--sky-100': '#1a3a52', // darkened informative
    '--sky-800': '#4d92c9', // informative.100
    '--sky-950': '#89a2b6', // brand2.100
    '--sky-1000': '#d0e3f2', // informative.020

    '--orange-100': '#3d3218', // darkened notice
    '--orange-800': '#f2cb4a', // notice.100
    '--orange-950': '#f2cb4a', // notice.100
    '--orange-1000': '#fcf0d0', // notice.020

    '--amber-100': '#3d3218', // darkened notice
    '--amber-800': '#f2cb4a', // notice.100

    '--base-white': '#000000', // inverted for dark
    '--base-black': '#ffffff', // inverted for dark

    '--shadow-base-color': 'rgba(0, 0, 0, 0.5)',
  },
}

const presets: Record<string, Preset | null> = {
  default: null,
  marshmallow: marshmallowPreset,
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
  ...opacityTokens,
  ...shadowDimensionTokens,
  ...containerTokens,
]

const allStringTokens = [shadowColorToken]

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
            className="w-full h-7 rounded-md border border-border bg-transparent px-2 text-xs text-foreground outline-none focus:ring-1 focus:ring-ring"
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
