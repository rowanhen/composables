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
      'Epilogue',
      'Urbanist',
      'Archivo',
      'Be Vietnam Pro',
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
    fonts: ['Caveat', 'Dancing Script', 'Pacifico', 'Satisfy', 'Kalam', 'Patrick Hand'],
  },
]

const ALL_FONT_NAMES = FONT_GROUPS.flatMap((g) => g.fonts)

const loadedFonts = new Set<string>()

function loadGoogleFont(name: string) {
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

/* --- Preset data --------------------------------------------------- */

const editorial: Record<string, string> = {
  '--bg-default': '#F9F6F0FF',
  '--bg-inverse': '#1E1A14FF',
  '--bg-muted': '#F2EDE5FF',
  '--bg-surface-default': '#F9F6F0FF',
  '--bg-surface-info': '#EEF4F8FF',
  '--bg-surface-success': '#EEF5EEFF',
  '--bg-surface-warning': '#FBF4EBFF',
  '--bg-surface-critical': '#FBF0EEFF',
  '--bg-surface-emphasis': '#EEF2F8FF',
  '--bg-surface-inverse': '#6B6050FF',
  '--bg-surface-transparent': '#0000000A',
  '--bg-surface-brand': '#F8F0EBFF',
  '--bg-surface-hover': '#EFE9E0FF',
  '--bg-fill-default': '#F9F6F0FF',
  '--bg-fill-primary': '#1E1A14FF',
  '--bg-fill-brand': '#9B6B4BFF',
  '--bg-fill-info': '#5A8FA8FF',
  '--bg-fill-success': '#3E7A50FF',
  '--bg-fill-warning': '#C06030FF',
  '--bg-fill-critical': '#B84040FF',
  '--bg-fill-emphasis': '#3A5C80FF',
  '--bg-fill-transparent': '#0000000A',
  '--bg-fill-secondary': '#2E2820FF',
  '--bg-fill-secondary-inverse': '#F9F6F0FF',
  '--text-default': '#1E1A14FF',
  '--text-secondary': '#6B6050FF',
  '--text-muted': '#9A8E7EFF',
  '--text-disabled': '#C8BEB0FF',
  '--text-inverse': '#F9F6F0FF',
  '--text-info': '#2A4A60FF',
  '--text-success': '#244830FF',
  '--text-warning': '#5C2E14FF',
  '--text-critical': '#5C2020FF',
  '--text-emphasis': '#1E3850FF',
  '--text-brand': '#7A4830FF',
  '--text-link': '#3A5C80FF',
  '--icon-default': '#1E1A14FF',
  '--icon-secondary': '#6B6050FF',
  '--icon-disabled': '#D8D0C4FF',
  '--icon-inverse': '#F9F6F0FF',
  '--icon-info': '#4A82A0FF',
  '--icon-success': '#3A7248FF',
  '--icon-warning': '#A85030FF',
  '--icon-critical': '#A84040FF',
  '--icon-emphasis': '#2A5278FF',
  '--icon-brand': '#8A5A3AFF',
  '--border-default': '#D8D0C4FF',
  '--border-secondary': '#E4DDD4FF',
  '--border-tertiary': '#C8BEB0FF',
  '--border-disabled': '#E4DDD4FF',
  '--border-inverse': '#6B6050FF',
  '--border-focus': '#3A5C80FF',
  '--border-brand': '#D4AA90FF',
  '--border-info': '#A0C0D4FF',
  '--border-success': '#8ABAA0FF',
  '--border-warning': '#D4A080FF',
  '--border-critical': '#D4A0A0FF',
  '--border-emphasis': '#7AAAC8FF',
  '--chart-1': '#9B6B4BFF',
  '--chart-2': '#3A5C80FF',
  '--chart-3': '#6B8A6AFF',
  '--chart-4': '#C06030FF',
  '--chart-5': '#7A6898FF',
  '--background': '#F9F6F0FF',
  '--foreground': '#1E1A14FF',
  '--card': '#F4EEE6FF',
  '--card-foreground': '#1E1A14FF',
  '--popover': '#F9F6F0FF',
  '--popover-foreground': '#1E1A14FF',
  '--primary': '#1E1A14FF',
  '--primary-foreground': '#F9F6F0FF',
  '--secondary': '#F2EDE5FF',
  '--secondary-foreground': '#1E1A14FF',
  '--muted': '#F2EDE5FF',
  '--muted-foreground': '#9A8E7EFF',
  '--accent': '#EFE9E0FF',
  '--accent-foreground': '#1E1A14FF',
  '--destructive': '#B84040FF',
  '--border': '#D8D0C4FF',
  '--input': '#E4DDD4FF',
  '--ring': '#3A5C80FF',
  '--spacing': '0.25rem',
  '--border-width-base': '0.0625rem',
  '--radius': '0.25rem',
  '--font-size-base': '1rem',
  '--leading-base': '1.55',
  '--letter-spacing-base': '0.02em',
  '--shadow-offset-y': '2px',
  '--shadow-blur': '8px',
  '--shadow-spread': '0px',
  '--shadow-base-color': 'rgba(60, 40, 20, 0.08)',
  '--font-sans': '"Source Serif 4 Variable", "Georgia", serif',
  '--font-heading': '"Fraunces Variable", "Georgia", serif',
  '--font-brand': '"Fraunces Variable", "Georgia", serif',
}

const editorialDark: Record<string, string> = {
  '--bg-default': '#1C1814FF',
  '--bg-inverse': '#F0E8DCFF',
  '--bg-muted': '#231E18FF',
  '--bg-surface-default': '#231E18FF',
  '--bg-surface-info': '#1A2530FF',
  '--bg-surface-success': '#182418FF',
  '--bg-surface-warning': '#2A1E10FF',
  '--bg-surface-critical': '#2A1818FF',
  '--bg-surface-emphasis': '#182038FF',
  '--bg-surface-inverse': '#A09080FF',
  '--bg-surface-transparent': '#FFFFFF08',
  '--bg-surface-brand': '#2E1E14FF',
  '--bg-surface-hover': '#2E2820FF',
  '--bg-fill-default': '#231E18FF',
  '--bg-fill-primary': '#F0E8DCFF',
  '--bg-fill-brand': '#C4896BFF',
  '--bg-fill-info': '#4A7898FF',
  '--bg-fill-success': '#3A6848FF',
  '--bg-fill-warning': '#B87848FF',
  '--bg-fill-critical': '#B85858FF',
  '--bg-fill-emphasis': '#3A5878FF',
  '--bg-fill-transparent': '#FFFFFF08',
  '--bg-fill-secondary': '#F0E8DCFF',
  '--bg-fill-secondary-inverse': '#1C1814FF',
  '--text-default': '#F0E8DCFF',
  '--text-secondary': '#C0A890FF',
  '--text-muted': '#786858FF',
  '--text-disabled': '#4A4038FF',
  '--text-inverse': '#1C1814FF',
  '--text-info': '#A0C8E0FF',
  '--text-success': '#88C098FF',
  '--text-warning': '#E0B880FF',
  '--text-critical': '#E09090FF',
  '--text-emphasis': '#90B8D8FF',
  '--text-brand': '#D8A888FF',
  '--text-link': '#90B8D8FF',
  '--icon-default': '#F0E8DCFF',
  '--icon-secondary': '#C0A890FF',
  '--icon-disabled': '#3A3028FF',
  '--icon-inverse': '#231E18FF',
  '--icon-info': '#7AAAC8FF',
  '--icon-success': '#68A87AFF',
  '--icon-warning': '#C89860FF',
  '--icon-critical': '#C87878FF',
  '--icon-emphasis': '#6898C0FF',
  '--icon-brand': '#C08868FF',
  '--border-default': '#3C3428FF',
  '--border-secondary': '#4A4038FF',
  '--border-tertiary': '#5A5048FF',
  '--border-disabled': '#3C3428FF',
  '--border-inverse': '#A09080FF',
  '--border-focus': '#6898C0FF',
  '--border-brand': '#785840FF',
  '--border-info': '#284858FF',
  '--border-success': '#2A4830FF',
  '--border-warning': '#583820FF',
  '--border-critical': '#583030FF',
  '--border-emphasis': '#2A4868FF',
  '--chart-1': '#C4896BFF',
  '--chart-2': '#6898C0FF',
  '--chart-3': '#88A888FF',
  '--chart-4': '#C08050FF',
  '--chart-5': '#9888B8FF',
  '--background': '#1C1814FF',
  '--foreground': '#F0E8DCFF',
  '--card': '#231E18FF',
  '--card-foreground': '#F0E8DCFF',
  '--popover': '#231E18FF',
  '--popover-foreground': '#F0E8DCFF',
  '--primary': '#F0E8DCFF',
  '--primary-foreground': '#1C1814FF',
  '--secondary': '#2E2820FF',
  '--secondary-foreground': '#F0E8DCFF',
  '--muted': '#2E2820FF',
  '--muted-foreground': '#786858FF',
  '--accent': '#3A3228FF',
  '--accent-foreground': '#F0E8DCFF',
  '--destructive': '#B85858FF',
  '--border': '#3C3428FF',
  '--input': '#3C3428FF',
  '--ring': '#6898C0FF',
  '--font-sans': '"Source Serif 4 Variable", "Georgia", serif',
  '--font-heading': '"Fraunces Variable", "Georgia", serif',
  '--font-brand': '"Fraunces Variable", "Georgia", serif',
}

const brutalist: Record<string, string> = {
  '--bg-default': '#FFFFFFFF',
  '--bg-inverse': '#0A0A0AFF',
  '--bg-muted': '#F0F0F0FF',
  '--bg-surface-default': '#FFFFFFFF',
  '--bg-surface-info': '#E8F0F8FF',
  '--bg-surface-success': '#E8F4E8FF',
  '--bg-surface-warning': '#FBF4E0FF',
  '--bg-surface-critical': '#FAE8E8FF',
  '--bg-surface-emphasis': '#E8E8F4FF',
  '--bg-surface-inverse': '#3A3A3AFF',
  '--bg-surface-transparent': '#00000010',
  '--bg-surface-brand': '#FFEFEBFF',
  '--bg-surface-hover': '#F0F0F0FF',
  '--bg-fill-default': '#FFFFFFFF',
  '--bg-fill-primary': '#0A0A0AFF',
  '--bg-fill-brand': '#CC2200FF',
  '--bg-fill-info': '#0044AAFF',
  '--bg-fill-success': '#007700FF',
  '--bg-fill-warning': '#CC6600FF',
  '--bg-fill-critical': '#CC0000FF',
  '--bg-fill-emphasis': '#0A0A0AFF',
  '--bg-fill-transparent': '#00000010',
  '--bg-fill-secondary': '#0A0A0AFF',
  '--bg-fill-secondary-inverse': '#FFFFFFFF',
  '--text-default': '#0A0A0AFF',
  '--text-secondary': '#2E2E2EFF',
  '--text-muted': '#5A5A5AFF',
  '--text-disabled': '#AAAAAAFF',
  '--text-inverse': '#F8F8F8FF',
  '--text-info': '#001E5EFF',
  '--text-success': '#003A00FF',
  '--text-warning': '#5E2E00FF',
  '--text-critical': '#5E0000FF',
  '--text-emphasis': '#001E5EFF',
  '--text-brand': '#880000FF',
  '--text-link': '#CC2200FF',
  '--icon-default': '#0A0A0AFF',
  '--icon-secondary': '#2E2E2EFF',
  '--icon-disabled': '#CCCCCCFF',
  '--icon-inverse': '#F8F8F8FF',
  '--icon-info': '#0044AAFF',
  '--icon-success': '#007700FF',
  '--icon-warning': '#AA5500FF',
  '--icon-critical': '#AA0000FF',
  '--icon-emphasis': '#0044AAFF',
  '--icon-brand': '#CC2200FF',
  '--border-default': '#0A0A0AFF',
  '--border-secondary': '#0A0A0AFF',
  '--border-tertiary': '#4A4A4AFF',
  '--border-disabled': '#AAAAAAFF',
  '--border-inverse': '#F8F8F8FF',
  '--border-focus': '#CC2200FF',
  '--border-brand': '#CC2200FF',
  '--border-info': '#0044AAFF',
  '--border-success': '#007700FF',
  '--border-warning': '#AA5500FF',
  '--border-critical': '#AA0000FF',
  '--border-emphasis': '#0044AAFF',
  '--chart-1': '#0A0A0AFF',
  '--chart-2': '#CC2200FF',
  '--chart-3': '#4A4A4AFF',
  '--chart-4': '#007700FF',
  '--chart-5': '#0044AAFF',
  '--background': '#FFFFFFFF',
  '--foreground': '#0A0A0AFF',
  '--card': '#FFFFFFFF',
  '--card-foreground': '#0A0A0AFF',
  '--popover': '#FFFFFFFF',
  '--popover-foreground': '#0A0A0AFF',
  '--primary': '#0A0A0AFF',
  '--primary-foreground': '#FFFFFFFF',
  '--secondary': '#F0F0F0FF',
  '--secondary-foreground': '#0A0A0AFF',
  '--muted': '#F0F0F0FF',
  '--muted-foreground': '#5A5A5AFF',
  '--accent': '#F0F0F0FF',
  '--accent-foreground': '#0A0A0AFF',
  '--destructive': '#CC0000FF',
  '--border': '#0A0A0AFF',
  '--input': '#C8C8C8FF',
  '--ring': '#CC2200FF',
  '--spacing': '0.25rem',
  '--border-width-base': '0.125rem',
  '--radius': '0rem',
  '--font-size-base': '1rem',
  '--leading-base': '1.4',
  '--letter-spacing-base': '0.04em',
  '--shadow-offset-y': '4px',
  '--shadow-blur': '0px',
  '--shadow-spread': '0px',
  '--shadow-base-color': 'rgba(0, 0, 0, 1)',
  '--font-sans': '"JetBrains Mono Variable", monospace',
  '--font-heading': '"Space Grotesk Variable", "Arial", sans-serif',
  '--font-brand': '"Space Grotesk Variable", "Arial", sans-serif',
}

const brutalistDark: Record<string, string> = {
  '--bg-default': '#0A0A0AFF',
  '--bg-inverse': '#F8F8F8FF',
  '--bg-muted': '#141414FF',
  '--bg-surface-default': '#0A0A0AFF',
  '--bg-surface-info': '#0A1828FF',
  '--bg-surface-success': '#0A180AFF',
  '--bg-surface-warning': '#1E1406FF',
  '--bg-surface-critical': '#1E0A0AFF',
  '--bg-surface-emphasis': '#0A0A1EFF',
  '--bg-surface-inverse': '#606060FF',
  '--bg-surface-transparent': '#FFFFFF10',
  '--bg-surface-brand': '#1E0A08FF',
  '--bg-surface-hover': '#1A1A1AFF',
  '--bg-fill-default': '#0A0A0AFF',
  '--bg-fill-primary': '#F0F0F0FF',
  '--bg-fill-brand': '#FF3322FF',
  '--bg-fill-info': '#3366CCFF',
  '--bg-fill-success': '#009900FF',
  '--bg-fill-warning': '#DD7700FF',
  '--bg-fill-critical': '#DD2222FF',
  '--bg-fill-emphasis': '#F0F0F0FF',
  '--bg-fill-transparent': '#FFFFFF10',
  '--bg-fill-secondary': '#F0F0F0FF',
  '--bg-fill-secondary-inverse': '#0A0A0AFF',
  '--text-default': '#F0F0F0FF',
  '--text-secondary': '#C0C0C0FF',
  '--text-muted': '#888888FF',
  '--text-disabled': '#444444FF',
  '--text-inverse': '#0A0A0AFF',
  '--text-info': '#99BBFFFF',
  '--text-success': '#77DD77FF',
  '--text-warning': '#FFBB44FF',
  '--text-critical': '#FF7777FF',
  '--text-emphasis': '#CCCCFFFF',
  '--text-brand': '#FF9988FF',
  '--text-link': '#FF5533FF',
  '--icon-default': '#F0F0F0FF',
  '--icon-secondary': '#C0C0C0FF',
  '--icon-disabled': '#383838FF',
  '--icon-inverse': '#0A0A0AFF',
  '--icon-info': '#5588EEFF',
  '--icon-success': '#44BB44FF',
  '--icon-warning': '#CC8800FF',
  '--icon-critical': '#DD3333FF',
  '--icon-emphasis': '#5588EEFF',
  '--icon-brand': '#FF4433FF',
  '--border-default': '#F0F0F0FF',
  '--border-secondary': '#C0C0C0FF',
  '--border-tertiary': '#888888FF',
  '--border-disabled': '#444444FF',
  '--border-inverse': '#0A0A0AFF',
  '--border-focus': '#FF3322FF',
  '--border-brand': '#FF3322FF',
  '--border-info': '#3366CCFF',
  '--border-success': '#009900FF',
  '--border-warning': '#CC6600FF',
  '--border-critical': '#CC1111FF',
  '--border-emphasis': '#3366CCFF',
  '--chart-1': '#F0F0F0FF',
  '--chart-2': '#FF3322FF',
  '--chart-3': '#888888FF',
  '--chart-4': '#44BB44FF',
  '--chart-5': '#5588EEFF',
  '--background': '#0A0A0AFF',
  '--foreground': '#F0F0F0FF',
  '--card': '#0A0A0AFF',
  '--card-foreground': '#F0F0F0FF',
  '--popover': '#141414FF',
  '--popover-foreground': '#F0F0F0FF',
  '--primary': '#F0F0F0FF',
  '--primary-foreground': '#0A0A0AFF',
  '--secondary': '#1A1A1AFF',
  '--secondary-foreground': '#F0F0F0FF',
  '--muted': '#1A1A1AFF',
  '--muted-foreground': '#888888FF',
  '--accent': '#1A1A1AFF',
  '--accent-foreground': '#F0F0F0FF',
  '--destructive': '#DD2222FF',
  '--border': '#F0F0F0FF',
  '--input': '#383838FF',
  '--ring': '#FF3322FF',
  '--font-sans': '"JetBrains Mono Variable", monospace',
  '--font-heading': '"Space Grotesk Variable", "Arial", sans-serif',
  '--font-brand': '"Space Grotesk Variable", "Arial", sans-serif',
}

const soft: Record<string, string> = {
  '--bg-default': '#FAFAF8FF',
  '--bg-inverse': '#2A2538FF',
  '--bg-muted': '#F2EFF8FF',
  '--bg-surface-default': '#FAFAF8FF',
  '--bg-surface-info': '#EEF4FBFF',
  '--bg-surface-success': '#EEF6F0FF',
  '--bg-surface-warning': '#FBF5EEFF',
  '--bg-surface-critical': '#FBF0F0FF',
  '--bg-surface-emphasis': '#EEEAF8FF',
  '--bg-surface-inverse': '#6B6490FF',
  '--bg-surface-transparent': '#0000000A',
  '--bg-surface-brand': '#F4F0FBFF',
  '--bg-surface-hover': '#EDE8F6FF',
  '--bg-fill-default': '#FAFAF8FF',
  '--bg-fill-primary': '#6B5FBFFF',
  '--bg-fill-brand': '#7B6EC2FF',
  '--bg-fill-info': '#4A90D4FF',
  '--bg-fill-success': '#48A668FF',
  '--bg-fill-warning': '#D4880FFF',
  '--bg-fill-critical': '#D45858FF',
  '--bg-fill-emphasis': '#6B5FBFFF',
  '--bg-fill-transparent': '#0000000A',
  '--bg-fill-secondary': '#2A2538FF',
  '--bg-fill-secondary-inverse': '#FAFAF8FF',
  '--text-default': '#2A2538FF',
  '--text-secondary': '#6B6490FF',
  '--text-muted': '#9B94B8FF',
  '--text-disabled': '#C8C4D8FF',
  '--text-inverse': '#FAFAF8FF',
  '--text-info': '#1A3A60FF',
  '--text-success': '#1A4430FF',
  '--text-warning': '#5A3A08FF',
  '--text-critical': '#5A2020FF',
  '--text-emphasis': '#2A1E68FF',
  '--text-brand': '#4A3898FF',
  '--text-link': '#5A4EC8FF',
  '--icon-default': '#2A2538FF',
  '--icon-secondary': '#6B6490FF',
  '--icon-disabled': '#DDD9ECFF',
  '--icon-inverse': '#FAFAF8FF',
  '--icon-info': '#3A80C4FF',
  '--icon-success': '#389858FF',
  '--icon-warning': '#B87800FF',
  '--icon-critical': '#C84848FF',
  '--icon-emphasis': '#5848B8FF',
  '--icon-brand': '#6B5FBFFF',
  '--border-default': '#DDD9ECFF',
  '--border-secondary': '#E8E4F4FF',
  '--border-tertiary': '#CCC8E0FF',
  '--border-disabled': '#E8E4F4FF',
  '--border-inverse': '#6B6490FF',
  '--border-focus': '#6B5FBFFF',
  '--border-brand': '#C4B8EAFF',
  '--border-info': '#A0C4E8FF',
  '--border-success': '#90CCA8FF',
  '--border-warning': '#E8C480FF',
  '--border-critical': '#E8A0A0FF',
  '--border-emphasis': '#A098D8FF',
  '--chart-1': '#7B6EC2FF',
  '--chart-2': '#4A90D4FF',
  '--chart-3': '#48A668FF',
  '--chart-4': '#C84898FF',
  '--chart-5': '#D4880FFF',
  '--background': '#FAFAF8FF',
  '--foreground': '#2A2538FF',
  '--card': '#F5F2FBFF',
  '--card-foreground': '#2A2538FF',
  '--popover': '#FAFAF8FF',
  '--popover-foreground': '#2A2538FF',
  '--primary': '#6B5FBFFF',
  '--primary-foreground': '#FAFAF8FF',
  '--secondary': '#EDE8F6FF',
  '--secondary-foreground': '#2A2538FF',
  '--muted': '#F2EFF8FF',
  '--muted-foreground': '#9B94B8FF',
  '--accent': '#EDE8F6FF',
  '--accent-foreground': '#2A2538FF',
  '--destructive': '#D45858FF',
  '--border': '#DDD9ECFF',
  '--input': '#E8E4F4FF',
  '--ring': '#6B5FBFFF',
  '--spacing': '0.25rem',
  '--border-width-base': '0.0625rem',
  '--radius': '0.75rem',
  '--font-size-base': '1rem',
  '--leading-base': '1.5',
  '--letter-spacing-base': '0.015em',
  '--shadow-offset-y': '2px',
  '--shadow-blur': '12px',
  '--shadow-spread': '0px',
  '--shadow-base-color': 'rgba(100, 80, 200, 0.1)',
  '--font-sans': '"DM Sans Variable", sans-serif',
  '--font-heading': '"Plus Jakarta Sans Variable", sans-serif',
  '--font-brand': '"Bricolage Grotesque Variable", sans-serif',
}

const softDark: Record<string, string> = {
  '--bg-default': '#17152AFF',
  '--bg-inverse': '#E8E4F6FF',
  '--bg-muted': '#201D38FF',
  '--bg-surface-default': '#201D38FF',
  '--bg-surface-info': '#162038FF',
  '--bg-surface-success': '#162218FF',
  '--bg-surface-warning': '#281C08FF',
  '--bg-surface-critical': '#281818FF',
  '--bg-surface-emphasis': '#1A1840FF',
  '--bg-surface-inverse': '#8880A8FF',
  '--bg-surface-transparent': '#FFFFFF0A',
  '--bg-surface-brand': '#201840FF',
  '--bg-surface-hover': '#2A2648FF',
  '--bg-fill-default': '#201D38FF',
  '--bg-fill-primary': '#9B8ECFFF',
  '--bg-fill-brand': '#8B80CFFF',
  '--bg-fill-info': '#5898D8FF',
  '--bg-fill-success': '#58B878FF',
  '--bg-fill-warning': '#E89820FF',
  '--bg-fill-critical': '#E07070FF',
  '--bg-fill-emphasis': '#9B8ECFFF',
  '--bg-fill-transparent': '#FFFFFF0A',
  '--bg-fill-secondary': '#2A2648FF',
  '--bg-fill-secondary-inverse': '#17152AFF',
  '--text-default': '#E8E4F6FF',
  '--text-secondary': '#A8A0C8FF',
  '--text-muted': '#6A6488FF',
  '--text-disabled': '#3A3858FF',
  '--text-inverse': '#17152AFF',
  '--text-info': '#A8C8E8FF',
  '--text-success': '#88C8A0FF',
  '--text-warning': '#E8C880FF',
  '--text-critical': '#E8A0A0FF',
  '--text-emphasis': '#B0A8E8FF',
  '--text-brand': '#C0B0F0FF',
  '--text-link': '#A898E0FF',
  '--icon-default': '#E8E4F6FF',
  '--icon-secondary': '#A8A0C8FF',
  '--icon-disabled': '#302D50FF',
  '--icon-inverse': '#201D38FF',
  '--icon-info': '#70A8D8FF',
  '--icon-success': '#68B888FF',
  '--icon-warning': '#C8A040FF',
  '--icon-critical': '#D07070FF',
  '--icon-emphasis': '#9888D8FF',
  '--icon-brand': '#A898D8FF',
  '--border-default': '#3A3658FF',
  '--border-secondary': '#4A4670FF',
  '--border-tertiary': '#5A5680FF',
  '--border-disabled': '#3A3658FF',
  '--border-inverse': '#A8A0C8FF',
  '--border-focus': '#9B8ECFFF',
  '--border-brand': '#5048A0FF',
  '--border-info': '#284870FF',
  '--border-success': '#286040FF',
  '--border-warning': '#504018FF',
  '--border-critical': '#503030FF',
  '--border-emphasis': '#404098FF',
  '--chart-1': '#9B8ECFFF',
  '--chart-2': '#70A8D8FF',
  '--chart-3': '#68B888FF',
  '--chart-4': '#D07890FF',
  '--chart-5': '#E8A848FF',
  '--background': '#17152AFF',
  '--foreground': '#E8E4F6FF',
  '--card': '#201D38FF',
  '--card-foreground': '#E8E4F6FF',
  '--popover': '#201D38FF',
  '--popover-foreground': '#E8E4F6FF',
  '--primary': '#9B8ECFFF',
  '--primary-foreground': '#17152AFF',
  '--secondary': '#2A2648FF',
  '--secondary-foreground': '#E8E4F6FF',
  '--muted': '#2A2648FF',
  '--muted-foreground': '#6A6488FF',
  '--accent': '#302D58FF',
  '--accent-foreground': '#E8E4F6FF',
  '--destructive': '#E07070FF',
  '--border': '#3A3658FF',
  '--input': '#3A3658FF',
  '--ring': '#9B8ECFFF',
  '--font-sans': '"DM Sans Variable", sans-serif',
  '--font-heading': '"Plus Jakarta Sans Variable", sans-serif',
  '--font-brand': '"Bricolage Grotesque Variable", sans-serif',
}

const swiss: Record<string, string> = {
  '--bg-default': '#FFFFFFFF',
  '--bg-inverse': '#111111FF',
  '--bg-muted': '#F5F5F5FF',
  '--bg-surface-default': '#FFFFFFFF',
  '--bg-surface-info': '#F0F4F8FF',
  '--bg-surface-success': '#F0F8F0FF',
  '--bg-surface-warning': '#FBF7F0FF',
  '--bg-surface-critical': '#FBF0F0FF',
  '--bg-surface-emphasis': '#F0F0F5FF',
  '--bg-surface-inverse': '#555555FF',
  '--bg-surface-transparent': '#00000008',
  '--bg-surface-brand': '#FFF0F0FF',
  '--bg-surface-hover': '#EEEEEEFF',
  '--bg-fill-default': '#FFFFFFFF',
  '--bg-fill-primary': '#111111FF',
  '--bg-fill-brand': '#E53B3BFF',
  '--bg-fill-info': '#4A80C4FF',
  '--bg-fill-success': '#2E8C4AFF',
  '--bg-fill-warning': '#CC7700FF',
  '--bg-fill-critical': '#CC2222FF',
  '--bg-fill-emphasis': '#111111FF',
  '--bg-fill-transparent': '#00000008',
  '--bg-fill-secondary': '#333333FF',
  '--bg-fill-secondary-inverse': '#FFFFFFFF',
  '--text-default': '#111111FF',
  '--text-secondary': '#444444FF',
  '--text-muted': '#777777FF',
  '--text-disabled': '#BBBBBBFF',
  '--text-inverse': '#FFFFFFFF',
  '--text-info': '#1A3A5CFF',
  '--text-success': '#1A4828FF',
  '--text-warning': '#6A3800FF',
  '--text-critical': '#881818FF',
  '--text-emphasis': '#111111FF',
  '--text-brand': '#BB1818FF',
  '--text-link': '#E53B3BFF',
  '--icon-default': '#111111FF',
  '--icon-secondary': '#444444FF',
  '--icon-disabled': '#DDDDDDFF',
  '--icon-inverse': '#FFFFFFFF',
  '--icon-info': '#4A80C4FF',
  '--icon-success': '#2E8C4AFF',
  '--icon-warning': '#CC7700FF',
  '--icon-critical': '#CC2222FF',
  '--icon-emphasis': '#111111FF',
  '--icon-brand': '#E53B3BFF',
  '--border-default': '#DDDDDDFF',
  '--border-secondary': '#EEEEEEFF',
  '--border-tertiary': '#BBBBBBFF',
  '--border-disabled': '#EEEEEEFF',
  '--border-inverse': '#555555FF',
  '--border-focus': '#111111FF',
  '--border-brand': '#E53B3BFF',
  '--border-info': '#A0C0E0FF',
  '--border-success': '#88C8A0FF',
  '--border-warning': '#E8C880FF',
  '--border-critical': '#E8A0A0FF',
  '--border-emphasis': '#111111FF',
  '--chart-1': '#111111FF',
  '--chart-2': '#E53B3BFF',
  '--chart-3': '#555555FF',
  '--chart-4': '#888888FF',
  '--chart-5': '#BBBBBBFF',
  '--background': '#FFFFFFFF',
  '--foreground': '#111111FF',
  '--card': '#FFFFFFFF',
  '--card-foreground': '#111111FF',
  '--popover': '#FFFFFFFF',
  '--popover-foreground': '#111111FF',
  '--primary': '#111111FF',
  '--primary-foreground': '#FFFFFFFF',
  '--secondary': '#F5F5F5FF',
  '--secondary-foreground': '#111111FF',
  '--muted': '#F5F5F5FF',
  '--muted-foreground': '#777777FF',
  '--accent': '#EEEEEEFF',
  '--accent-foreground': '#111111FF',
  '--destructive': '#CC2222FF',
  '--border': '#DDDDDDFF',
  '--input': '#EEEEEEFF',
  '--ring': '#111111FF',
  '--spacing': '0.25rem',
  '--border-width-base': '0.0625rem',
  '--radius': '0rem',
  '--font-size-base': '0.9375rem',
  '--leading-base': '1.45',
  '--letter-spacing-base': '0.04em',
  '--shadow-offset-y': '0px',
  '--shadow-blur': '0px',
  '--shadow-spread': '0px',
  '--shadow-base-color': 'rgba(0, 0, 0, 0)',
  '--font-sans': '"Helvetica Neue", "Arial", system-ui, sans-serif',
  '--font-heading': '"Helvetica Neue", "Arial", system-ui, sans-serif',
  '--font-brand': '"Helvetica Neue", "Arial", system-ui, sans-serif',
}

const swissDark: Record<string, string> = {
  '--bg-default': '#0C0C0CFF',
  '--bg-inverse': '#F2F2F2FF',
  '--bg-muted': '#161616FF',
  '--bg-surface-default': '#0C0C0CFF',
  '--bg-surface-info': '#0A1828FF',
  '--bg-surface-success': '#0A1A0AFF',
  '--bg-surface-warning': '#1E1508FF',
  '--bg-surface-critical': '#1E0808FF',
  '--bg-surface-emphasis': '#161616FF',
  '--bg-surface-inverse': '#707070FF',
  '--bg-surface-transparent': '#FFFFFF08',
  '--bg-surface-brand': '#1E0808FF',
  '--bg-surface-hover': '#1E1E1EFF',
  '--bg-fill-default': '#0C0C0CFF',
  '--bg-fill-primary': '#F2F2F2FF',
  '--bg-fill-brand': '#FF4444FF',
  '--bg-fill-info': '#5590D4FF',
  '--bg-fill-success': '#3EA858FF',
  '--bg-fill-warning': '#DD8800FF',
  '--bg-fill-critical': '#DD2828FF',
  '--bg-fill-emphasis': '#F2F2F2FF',
  '--bg-fill-transparent': '#FFFFFF08',
  '--bg-fill-secondary': '#2A2A2AFF',
  '--bg-fill-secondary-inverse': '#0C0C0CFF',
  '--text-default': '#F2F2F2FF',
  '--text-secondary': '#C0C0C0FF',
  '--text-muted': '#888888FF',
  '--text-disabled': '#444444FF',
  '--text-inverse': '#0C0C0CFF',
  '--text-info': '#99BBEEFF',
  '--text-success': '#77DD88FF',
  '--text-warning': '#FFCC55FF',
  '--text-critical': '#FF7777FF',
  '--text-emphasis': '#F2F2F2FF',
  '--text-brand': '#FF8888FF',
  '--text-link': '#FF4444FF',
  '--icon-default': '#F2F2F2FF',
  '--icon-secondary': '#C0C0C0FF',
  '--icon-disabled': '#383838FF',
  '--icon-inverse': '#0C0C0CFF',
  '--icon-info': '#5590D4FF',
  '--icon-success': '#3EA858FF',
  '--icon-warning': '#DD8800FF',
  '--icon-critical': '#DD2828FF',
  '--icon-emphasis': '#F2F2F2FF',
  '--icon-brand': '#FF4444FF',
  '--border-default': '#3A3A3AFF',
  '--border-secondary': '#2A2A2AFF',
  '--border-tertiary': '#4A4A4AFF',
  '--border-disabled': '#2A2A2AFF',
  '--border-inverse': '#888888FF',
  '--border-focus': '#F2F2F2FF',
  '--border-brand': '#FF4444FF',
  '--border-info': '#284860FF',
  '--border-success': '#285A38FF',
  '--border-warning': '#4A3A10FF',
  '--border-critical': '#4A1818FF',
  '--border-emphasis': '#3A3A3AFF',
  '--chart-1': '#F2F2F2FF',
  '--chart-2': '#FF4444FF',
  '--chart-3': '#888888FF',
  '--chart-4': '#3EA858FF',
  '--chart-5': '#5590D4FF',
  '--background': '#0C0C0CFF',
  '--foreground': '#F2F2F2FF',
  '--card': '#0C0C0CFF',
  '--card-foreground': '#F2F2F2FF',
  '--popover': '#161616FF',
  '--popover-foreground': '#F2F2F2FF',
  '--primary': '#F2F2F2FF',
  '--primary-foreground': '#0C0C0CFF',
  '--secondary': '#1E1E1EFF',
  '--secondary-foreground': '#F2F2F2FF',
  '--muted': '#1E1E1EFF',
  '--muted-foreground': '#888888FF',
  '--accent': '#1E1E1EFF',
  '--accent-foreground': '#F2F2F2FF',
  '--destructive': '#DD2828FF',
  '--border': '#3A3A3AFF',
  '--input': '#2A2A2AFF',
  '--ring': '#F2F2F2FF',
  '--font-sans': '"Helvetica Neue", "Arial", system-ui, sans-serif',
  '--font-heading': '"Helvetica Neue", "Arial", system-ui, sans-serif',
  '--font-brand': '"Helvetica Neue", "Arial", system-ui, sans-serif',
}

const midnight: Record<string, string> = {
  '--bg-default': '#131320FF',
  '--bg-inverse': '#E8E8F2FF',
  '--bg-muted': '#1C1C2EFF',
  '--bg-surface-default': '#1C1C2EFF',
  '--bg-surface-info': '#0F1830FF',
  '--bg-surface-success': '#0F1C18FF',
  '--bg-surface-warning': '#1A150AFF',
  '--bg-surface-critical': '#1E0F12FF',
  '--bg-surface-emphasis': '#141430FF',
  '--bg-surface-inverse': '#8888A8FF',
  '--bg-surface-transparent': '#FFFFFF0A',
  '--bg-surface-brand': '#1A102EFF',
  '--bg-surface-hover': '#25253CFF',
  '--bg-fill-default': '#1C1C2EFF',
  '--bg-fill-primary': '#6E7AFFFF',
  '--bg-fill-brand': '#7C3AEDFF',
  '--bg-fill-info': '#38BDF8FF',
  '--bg-fill-success': '#22C55EFF',
  '--bg-fill-warning': '#F59E0BFF',
  '--bg-fill-critical': '#EF4444FF',
  '--bg-fill-emphasis': '#6E7AFFFF',
  '--bg-fill-transparent': '#FFFFFF0A',
  '--bg-fill-secondary': '#2A2A42FF',
  '--bg-fill-secondary-inverse': '#131320FF',
  '--text-default': '#E8E8F2FF',
  '--text-secondary': '#9898B8FF',
  '--text-muted': '#585878FF',
  '--text-disabled': '#303050FF',
  '--text-inverse': '#131320FF',
  '--text-info': '#7AB8FFFF',
  '--text-success': '#56D364FF',
  '--text-warning': '#E3B341FF',
  '--text-critical': '#F85149FF',
  '--text-emphasis': '#A8B8FFFF',
  '--text-brand': '#C8A8FFFF',
  '--text-link': '#9AAAFFFF',
  '--icon-default': '#E8E8F2FF',
  '--icon-secondary': '#9898B8FF',
  '--icon-disabled': '#25253CFF',
  '--icon-inverse': '#131320FF',
  '--icon-info': '#38BDF8FF',
  '--icon-success': '#22C55EFF',
  '--icon-warning': '#F59E0BFF',
  '--icon-critical': '#EF4444FF',
  '--icon-emphasis': '#6E7AFFFF',
  '--icon-brand': '#9D6FE8FF',
  '--border-default': '#2A2A42FF',
  '--border-secondary': '#333358FF',
  '--border-tertiary': '#3D3D5AFF',
  '--border-disabled': '#2A2A42FF',
  '--border-inverse': '#9898B8FF',
  '--border-focus': '#6E7AFFFF',
  '--border-brand': '#6E3EBDFF',
  '--border-info': '#1158A7FF',
  '--border-success': '#196C2EFF',
  '--border-warning': '#9E6A03FF',
  '--border-critical': '#6E0000FF',
  '--border-emphasis': '#3B52BCFF',
  '--chart-1': '#6E7AFFFF',
  '--chart-2': '#38BDF8FF',
  '--chart-3': '#22C55EFF',
  '--chart-4': '#F59E0BFF',
  '--chart-5': '#C8A8FFFF',
  '--background': '#131320FF',
  '--foreground': '#E8E8F2FF',
  '--card': '#1C1C2EFF',
  '--card-foreground': '#E8E8F2FF',
  '--popover': '#1C1C2EFF',
  '--popover-foreground': '#E8E8F2FF',
  '--primary': '#6E7AFFFF',
  '--primary-foreground': '#FFFFFFFF',
  '--secondary': '#25253CFF',
  '--secondary-foreground': '#E8E8F2FF',
  '--muted': '#25253CFF',
  '--muted-foreground': '#585878FF',
  '--accent': '#25253CFF',
  '--accent-foreground': '#E8E8F2FF',
  '--destructive': '#EF4444FF',
  '--border': '#2A2A42FF',
  '--input': '#2A2A42FF',
  '--ring': '#6E7AFFFF',
  '--spacing': '0.25rem',
  '--border-width-base': '0.0625rem',
  '--radius': '0.625rem',
  '--font-size-base': '0.9375rem',
  '--leading-base': '1.5',
  '--letter-spacing-base': '0.02em',
  '--shadow-offset-y': '4px',
  '--shadow-blur': '24px',
  '--shadow-spread': '0px',
  '--shadow-base-color': 'rgba(110, 122, 255, 0.2)',
  '--font-sans': '"Inter Variable", sans-serif',
  '--font-heading': '"Space Grotesk Variable", sans-serif',
  '--font-brand': '"Space Grotesk Variable", sans-serif',
}

const midnightDark: Record<string, string> = {
  '--bg-default': '#0B0B18FF',
  '--bg-muted': '#141424FF',
  '--bg-surface-default': '#141424FF',
  '--bg-surface-info': '#0A1228FF',
  '--bg-surface-success': '#0A1412FF',
  '--bg-surface-warning': '#14100AFF',
  '--bg-surface-critical': '#180A0EFF',
  '--bg-surface-emphasis': '#0E0E28FF',
  '--bg-surface-hover': '#1E1E34FF',
  '--bg-fill-default': '#141424FF',
  '--bg-fill-secondary': '#222238FF',
  '--bg-inverse': '#E8E8F2FF',
  '--bg-surface-inverse': '#8888A8FF',
  '--bg-surface-transparent': '#FFFFFF0A',
  '--bg-surface-brand': '#140C28FF',
  '--bg-fill-primary': '#6E7AFFFF',
  '--bg-fill-brand': '#7C3AEDFF',
  '--bg-fill-info': '#38BDF8FF',
  '--bg-fill-success': '#22C55EFF',
  '--bg-fill-warning': '#F59E0BFF',
  '--bg-fill-critical': '#EF4444FF',
  '--bg-fill-emphasis': '#6E7AFFFF',
  '--bg-fill-transparent': '#FFFFFF0A',
  '--bg-fill-secondary-inverse': '#0B0B18FF',
  '--text-default': '#E8E8F2FF',
  '--text-secondary': '#9898B8FF',
  '--text-muted': '#585878FF',
  '--text-disabled': '#282845FF',
  '--text-inverse': '#0B0B18FF',
  '--text-info': '#7AB8FFFF',
  '--text-success': '#56D364FF',
  '--text-warning': '#E3B341FF',
  '--text-critical': '#F85149FF',
  '--text-emphasis': '#A8B8FFFF',
  '--text-brand': '#C8A8FFFF',
  '--text-link': '#9AAAFFFF',
  '--icon-default': '#E8E8F2FF',
  '--icon-secondary': '#9898B8FF',
  '--icon-disabled': '#1E1E34FF',
  '--icon-inverse': '#0B0B18FF',
  '--icon-info': '#38BDF8FF',
  '--icon-success': '#22C55EFF',
  '--icon-warning': '#F59E0BFF',
  '--icon-critical': '#EF4444FF',
  '--icon-emphasis': '#6E7AFFFF',
  '--icon-brand': '#9D6FE8FF',
  '--border-default': '#222238FF',
  '--border-secondary': '#2A2A48FF',
  '--border-tertiary': '#33334EFF',
  '--border-disabled': '#222238FF',
  '--border-inverse': '#9898B8FF',
  '--border-focus': '#6E7AFFFF',
  '--border-brand': '#6E3EBDFF',
  '--border-info': '#1158A7FF',
  '--border-success': '#196C2EFF',
  '--border-warning': '#9E6A03FF',
  '--border-critical': '#6E0000FF',
  '--border-emphasis': '#3B52BCFF',
  '--chart-1': '#6E7AFFFF',
  '--chart-2': '#38BDF8FF',
  '--chart-3': '#22C55EFF',
  '--chart-4': '#F59E0BFF',
  '--chart-5': '#C8A8FFFF',
  '--background': '#0B0B18FF',
  '--foreground': '#E8E8F2FF',
  '--card': '#141424FF',
  '--card-foreground': '#E8E8F2FF',
  '--popover': '#141424FF',
  '--popover-foreground': '#E8E8F2FF',
  '--primary': '#6E7AFFFF',
  '--primary-foreground': '#FFFFFFFF',
  '--secondary': '#1E1E34FF',
  '--secondary-foreground': '#E8E8F2FF',
  '--muted': '#1E1E34FF',
  '--muted-foreground': '#585878FF',
  '--accent': '#1E1E34FF',
  '--accent-foreground': '#E8E8F2FF',
  '--destructive': '#EF4444FF',
  '--border': '#222238FF',
  '--input': '#222238FF',
  '--ring': '#6E7AFFFF',
  '--font-sans': '"Inter Variable", sans-serif',
  '--font-heading': '"Space Grotesk Variable", sans-serif',
  '--font-brand': '"Space Grotesk Variable", sans-serif',
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
    description: 'Architectural restraint — zero radius, hard shadows, JetBrains Mono body, editorial red',
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
/*  Color token definitions (mirrors semantic.json structure)          */
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
/*  Non-color token definitions                                        */
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
  { cssVar: '--spacing', label: 'Base unit', defaultValue: 0.25, min: 0.0625, max: 0.75, step: 0.0625, unit: 'rem' },
]

const borderWidthTokens: DimensionToken[] = [
  { cssVar: '--border-width-base', label: 'Base border width', defaultValue: 0.0625, min: 0, max: 0.25, step: 0.0625, unit: 'rem' },
]

const radiusTokens: DimensionToken[] = [
  { cssVar: '--radius', label: 'Base radius', defaultValue: 0.5, min: 0, max: 1.5, step: 0.0625, unit: 'rem' },
]

const typographySizeTokens: DimensionToken[] = [
  { cssVar: '--font-size-base', label: 'Base font size', defaultValue: 1, min: 0.625, max: 1.5, step: 0.025, unit: 'rem' },
]

const lineHeightTokens: DimensionToken[] = [
  { cssVar: '--leading-base', label: 'Base line height', defaultValue: 1.33, min: 1, max: 2, step: 0.01, unit: '' },
]

const letterSpacingTokens: DimensionToken[] = [
  { cssVar: '--letter-spacing-base', label: 'Base letter spacing', defaultValue: 0.025, min: 0, max: 0.1, step: 0.005, unit: 'em' },
]

const opacityTokens: DimensionToken[] = [
  { cssVar: '--opacity-hover', label: 'Hover opacity', defaultValue: 0.8, min: 0, max: 1, step: 0.05, unit: '' },
  { cssVar: '--opacity-active', label: 'Active opacity', defaultValue: 0.7, min: 0, max: 1, step: 0.05, unit: '' },
  { cssVar: '--opacity-disabled', label: 'Disabled opacity', defaultValue: 0.5, min: 0, max: 1, step: 0.05, unit: '' },
]

const shadowDimensionTokens: DimensionToken[] = [
  { cssVar: '--shadow-offset-y', label: 'Offset Y', defaultValue: 1, min: 0, max: 8, step: 0.5, unit: 'px' },
  { cssVar: '--shadow-blur', label: 'Blur', defaultValue: 2, min: 0, max: 10, step: 0.5, unit: 'px' },
  { cssVar: '--shadow-spread', label: 'Spread', defaultValue: 1, min: 0, max: 6, step: 0.5, unit: 'px' },
]

const dropdownOffsetTokens: DimensionToken[] = [
  { cssVar: '--dropdown-offset', label: 'Dropdown offset', defaultValue: 4, min: 0, max: 16, step: 1, unit: '' },
]

const overlayOffsetTokens: DimensionToken[] = [
  { cssVar: '--overlay-offset', label: 'Overlay offset', defaultValue: 4, min: 0, max: 16, step: 1, unit: '' },
]

const containerTokens: DimensionToken[] = [
  { cssVar: '--container-sm', label: 'sm', defaultValue: 624, min: 336, max: 1056, step: 48, unit: 'px' },
  { cssVar: '--container-md', label: 'md', defaultValue: 768, min: 480, max: 1296, step: 48, unit: 'px' },
  { cssVar: '--container-lg', label: 'lg', defaultValue: 1056, min: 624, max: 1536, step: 48, unit: 'px' },
  { cssVar: '--container-xl', label: 'xl', defaultValue: 1296, min: 768, max: 1920, step: 48, unit: 'px' },
  { cssVar: '--container-2xl', label: '2xl', defaultValue: 1440, min: 960, max: 2064, step: 48, unit: 'px' },
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
/*  ColorTokenRow                                                       */
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
/*  DimensionSliderRow                                                  */
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
/*  StringTokenRow                                                      */
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

/* ------------------------------------------------------------------ */
/*  FontSelectRow                                                       */
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
    for (const font of ALL_FONT_NAMES) {
      if (resolved.startsWith(`"${font}"`) || resolved.startsWith(font)) return font
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
/*  SectionHeader                                                       */
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
/*  PaletteIcon                                                         */
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

    for (const v of fontCssVars) {
      const fontValue = preset.overrides[v]
      if (fontValue) {
        const match = fontValue.match(/^"([^"]+)"/)
        if (match) loadGoogleFont(match[1])
      }
    }

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

          <TabsContent value="visual" className="flex-1 overflow-hidden mt-0">
            <ScrollArea className="h-full">
              <div className="px-4 pb-6">
                <div className="mb-4">
                  <SectionHeader>Spacing</SectionHeader>
                  <VStack gap={1}>
                    {spacingTokens.map((t) => (
                      <DimensionSliderRow key={t.cssVar} token={t} onApply={applyOverride} />
                    ))}
                  </VStack>
                </div>
                <Separator className="my-3" />

                <div className="mb-4">
                  <SectionHeader>Border Width</SectionHeader>
                  <VStack gap={1}>
                    {borderWidthTokens.map((t) => (
                      <DimensionSliderRow key={t.cssVar} token={t} onApply={applyOverride} />
                    ))}
                  </VStack>
                </div>
                <Separator className="my-3" />

                <div className="mb-4">
                  <SectionHeader>Border Radius</SectionHeader>
                  <VStack gap={1}>
                    {radiusTokens.map((t) => (
                      <DimensionSliderRow key={t.cssVar} token={t} onApply={applyOverride} />
                    ))}
                  </VStack>
                </div>
                <Separator className="my-3" />

                <div className="mb-4">
                  <SectionHeader>Font Size</SectionHeader>
                  <VStack gap={1}>
                    {typographySizeTokens.map((t) => (
                      <DimensionSliderRow key={t.cssVar} token={t} onApply={applyOverride} />
                    ))}
                  </VStack>
                </div>
                <Separator className="my-3" />

                <div className="mb-4">
                  <SectionHeader>Line Height</SectionHeader>
                  <VStack gap={1}>
                    {lineHeightTokens.map((t) => (
                      <DimensionSliderRow key={t.cssVar} token={t} onApply={applyOverride} />
                    ))}
                  </VStack>
                </div>
                <Separator className="my-3" />

                <div className="mb-4">
                  <SectionHeader>Letter Spacing</SectionHeader>
                  <VStack gap={1}>
                    {letterSpacingTokens.map((t) => (
                      <DimensionSliderRow key={t.cssVar} token={t} onApply={applyOverride} />
                    ))}
                  </VStack>
                </div>
                <Separator className="my-3" />

                <div className="mb-4">
                  <SectionHeader>Font Family</SectionHeader>
                  <VStack gap={1}>
                    <FontSelectRow label="Sans / body (--font-sans)" cssVar="--font-sans" onApply={applyOverride} />
                    <FontSelectRow label="Heading (--font-heading)" cssVar="--font-heading" onApply={applyOverride} />
                    <FontSelectRow label="Brand (--font-brand)" cssVar="--font-brand" onApply={applyOverride} />
                  </VStack>
                </div>
                <Separator className="my-3" />

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

                <div className="mb-4">
                  <SectionHeader>Opacity</SectionHeader>
                  <VStack gap={1}>
                    {opacityTokens.map((t) => (
                      <DimensionSliderRow key={t.cssVar} token={t} onApply={applyOverride} />
                    ))}
                  </VStack>
                </div>
                <Separator className="my-3" />

                <div className="mb-4">
                  <SectionHeader>Container Breakpoints</SectionHeader>
                  <VStack gap={1}>
                    {containerTokens.map((t) => (
                      <DimensionSliderRow key={t.cssVar} token={t} onApply={applyOverride} />
                    ))}
                  </VStack>
                </div>
                <Separator className="my-3" />

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
