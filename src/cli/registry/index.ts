import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

export interface RegistryItem {
  name: string
  category: 'ui' | 'ui-extended' | 'ui-product'
  srcPath: string
  registryDependencies: string[]
  files: string[]
  npmDependencies: Record<string, string>
}

/** Resolve the path to the registry directory (shipped in the npm package) */
export function getRegistryDir(): string {
  const cliDir = dirname(fileURLToPath(import.meta.url))
  // dist/cli/index.js -> package root -> registry/
  return join(cliDir, '..', '..', 'registry')
}

/** Load the full registry from registry.json */
export function loadRegistry(): RegistryItem[] {
  const registryPath = join(getRegistryDir(), 'registry.json')
  return JSON.parse(readFileSync(registryPath, 'utf-8'))
}

/** Find a registry item by name, searching across categories */
export function findComponent(registry: RegistryItem[], name: string): RegistryItem | undefined {
  // Exact match first
  const exact = registry.find((item) => item.name === name)
  if (exact) return exact

  // Try with category prefix: "ui/button" or "ui-extended/form-input"
  if (name.includes('/')) {
    const [category, ...rest] = name.split('/')
    const componentName = rest.join('/')
    return registry.find((item) => item.category === category && item.name === componentName)
  }

  // If ambiguous (same name in multiple categories), prefer ui, then ui-extended, then ui-product
  const priorities: RegistryItem['category'][] = ['ui', 'ui-extended', 'ui-product']
  for (const cat of priorities) {
    const found = registry.find((item) => item.category === cat && item.name === name)
    if (found) return found
  }

  return undefined
}
