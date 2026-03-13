import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import pc from 'picocolors'
import { getRegistryDir } from '../registry/index.js'

interface TokenValue {
  $type: 'color'
  $value: string
}

interface TokenGroup {
  [key: string]: TokenValue | TokenGroup
}

type Tokens = TokenGroup

function isTokenValue(obj: unknown): obj is TokenValue {
  return typeof obj === 'object' && obj !== null && '$type' in obj && '$value' in obj
}

/** Flatten nested tokens into a flat map of dotted paths -> values */
function flattenTokens(tokens: Tokens, prefix = ''): Map<string, string> {
  const result = new Map<string, string>()

  for (const [key, value] of Object.entries(tokens)) {
    const path = prefix ? `${prefix}.${key}` : key

    if (isTokenValue(value)) {
      result.set(path, value.$value)
    } else if (typeof value === 'object' && value !== null) {
      const nested = flattenTokens(value as TokenGroup, path)
      for (const [nestedKey, nestedValue] of nested) {
        result.set(nestedKey, nestedValue)
      }
    }
  }

  return result
}

/** Convert a dotted token path to a CSS variable name */
function toCssVar(tokenPath: string): string {
  return `--${tokenPath.toLowerCase().replace(/\./g, '-').replace(/\s+/g, '-')}`
}

/** Resolve a reference like "{neutral.1000}" to the primitive hex value */
function resolveReference(ref: string, primitives: Map<string, string>): string | null {
  const match = ref.match(/^\{(.+)\}$/)
  if (!match) return null
  const refPath = match[1]
  return primitives.get(refPath) ?? null
}

/** ANSI color swatch using background color (approximated from hex) */
function colorSwatch(hex: string): string {
  // Strip alpha channel if present (8-char hex)
  const cleanHex = hex.length === 9 ? hex.slice(0, 7) : hex
  const r = Number.parseInt(cleanHex.slice(1, 3), 16)
  const g = Number.parseInt(cleanHex.slice(3, 5), 16)
  const b = Number.parseInt(cleanHex.slice(5, 7), 16)

  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return ''

  // Use 256-color ANSI: \x1b[48;2;R;G;Bm for true-color background
  return `\x1b[48;2;${r};${g};${b}m  \x1b[0m`
}

export type TokenCategory = 'bg' | 'text' | 'border' | 'icon' | 'chart' | string

/** Get all available token categories from semantic tokens */
export function getTokenCategories(): string[] {
  const tokensDir = join(getRegistryDir(), 'tokens')
  const semanticTokens: Tokens = JSON.parse(readFileSync(join(tokensDir, 'semantic.json'), 'utf-8'))
  return Object.keys(semanticTokens)
}

/** Print tokens for a given category (or all if no category specified) */
export function printTokens(category?: string): void {
  const tokensDir = join(getRegistryDir(), 'tokens')

  const lightTokens: Tokens = JSON.parse(readFileSync(join(tokensDir, 'light.json'), 'utf-8'))
  const semanticTokens: Tokens = JSON.parse(readFileSync(join(tokensDir, 'semantic.json'), 'utf-8'))

  // Flatten primitives for reference resolution
  const primitives = flattenTokens(lightTokens)

  // Flatten semantics
  const semantics = flattenTokens(semanticTokens)

  // Filter by category if specified
  const filtered = category
    ? new Map(
        [...semantics].filter(([key]) => key.toLowerCase().startsWith(category.toLowerCase())),
      )
    : semantics

  if (filtered.size === 0) {
    console.log(pc.yellow(`No tokens found for category "${category}". Available categories:`))
    const categories = getTokenCategories()
    for (const cat of categories) {
      console.log(`  ${pc.cyan(cat)}`)
    }
    return
  }

  console.log(
    pc.bold(
      category ? `${category} tokens (${filtered.size})` : `All semantic tokens (${filtered.size})`,
    ),
  )
  console.log()

  for (const [tokenPath, rawValue] of filtered) {
    const cssVar = toCssVar(tokenPath)
    const isRef = rawValue.match(/^\{(.+)\}$/)
    const resolvedHex = isRef ? resolveReference(rawValue, primitives) : rawValue

    console.log(pc.bold(tokenPath))
    console.log(`  CSS Variable:  ${pc.cyan(`var(${cssVar})`)}`)

    if (isRef) {
      const refCssVar = toCssVar(isRef[1])
      console.log(`  Resolves to:   ${pc.dim(`var(${refCssVar})`)}`)
    }

    if (resolvedHex) {
      const swatch = colorSwatch(resolvedHex)
      console.log(`  Value:         ${swatch} ${pc.dim(resolvedHex)}`)
    } else {
      console.log(`  Value:         ${pc.dim(rawValue)}`)
    }
    console.log()
  }
}
