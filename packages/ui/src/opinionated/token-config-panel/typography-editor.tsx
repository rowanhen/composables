import React from 'react'

import { Typography } from '../../_internal/typography'

import type { FontGroup } from './types'
import { getResolvedDimension } from './helpers'

/* ------------------------------------------------------------------ */
/*  Google Fonts — grouped by style                                     */
/* ------------------------------------------------------------------ */

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

export const ALL_FONT_NAMES = FONT_GROUPS.flatMap((g) => g.fonts)

const loadedFonts = new Set<string>()

export function loadGoogleFont(name: string) {
  if (name === 'Inter' || loadedFonts.has(name)) return
  loadedFonts.add(name)
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(name)}:wght@300;400;500;600;700&display=swap`
  document.head.appendChild(link)
}

export const fontCssVars = ['--font-sans', '--font-heading', '--font-brand'] as const

/* ------------------------------------------------------------------ */
/*  FontSelectRow                                                       */
/* ------------------------------------------------------------------ */

export function FontSelectRow({
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
