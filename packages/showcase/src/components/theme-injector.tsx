import React from 'react'
import { TokenConfigPanel } from '@/components/ui-opinionated/token-config-panel'

const GRID_OVERLAY_STYLE: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  pointerEvents: 'none',
  zIndex: 9999,
  backgroundImage: `
    repeating-linear-gradient(
      to right,
      var(--grid-line-color) 0px,
      var(--grid-line-color) var(--border-width-base, 1px),
      transparent var(--border-width-base, 1px),
      transparent calc(var(--spacing) * 12)
    ),
    repeating-linear-gradient(
      to bottom,
      var(--grid-line-color) 0px,
      var(--grid-line-color) var(--border-width-base, 1px),
      transparent var(--border-width-base, 1px),
      transparent calc(var(--spacing) * 12)
    )
  `,
  backgroundPosition: 'center top',
}

/**
 * ThemeInjector — drop this anywhere in your app to get a floating theme
 * control panel. Manages dark mode, grid overlay, and the full token config
 * panel all in one place.
 */
export function ThemeInjector() {
  const [dark, setDark] = React.useState(false)
  const [grid, setGrid] = React.useState(false)

  React.useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [dark])

  React.useEffect(() => {
    if (grid) {
      const color = dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'
      document.documentElement.style.setProperty('--grid-line-color', color)
    } else {
      document.documentElement.style.removeProperty('--grid-line-color')
    }
  }, [dark, grid])

  return (
    <>
      {grid && <div aria-hidden="true" style={GRID_OVERLAY_STYLE} />}
      <div
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          zIndex: 9999,
        }}
      >
        <TokenConfigPanel
          dark={dark}
          onDarkChange={setDark}
          grid={grid}
          onGridChange={setGrid}
        />
      </div>
    </>
  )
}
