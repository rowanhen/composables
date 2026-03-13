import { useEffect, useState } from 'react'

function readCssVar(name: string, fallback: number): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  const parsed = Number.parseFloat(raw)
  return Number.isNaN(parsed) ? fallback : parsed
}

export function useCssVar(name: string, fallback: number): number {
  const [value, setValue] = useState(() => readCssVar(name, fallback))

  useEffect(() => {
    // Re-read whenever the style attribute on :root mutates
    // (which is how the config panel applies overrides)
    const observer = new MutationObserver(() => {
      setValue(readCssVar(name, fallback))
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style'],
    })
    return () => observer.disconnect()
  }, [name, fallback])

  return value
}
