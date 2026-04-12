import React from 'react'
import { GridOverlay } from '@/components/ui-opinionated/grid-overlay'
import { TokenConfigPanel } from '@/components/ui-opinionated/token-config-panel'

/**
 * ThemeInjector — drop this anywhere in your app to get a floating theme
 * control panel. Manages dark mode, grid overlay, and the full token config
 * panel all in one place.
 */
export function ThemeInjector() {
  const [dark, setDark] = React.useState(false)
  const [grid, setGrid] = React.useState(true)

  React.useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [dark])

  return (
    <>
      {grid && (
        <GridOverlay
          color={dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}
        />
      )}
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
