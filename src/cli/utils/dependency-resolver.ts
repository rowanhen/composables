import type { RegistryItem } from '../registry/index.js'

export interface ResolvedDependencies {
  /** All component registry items to install */
  components: RegistryItem[]
  /** All hook/lib file paths to copy (e.g. "hooks/use-numeric-input.ts") */
  files: string[]
  /** Merged npm dependencies across all components */
  npmDependencies: Record<string, string>
}

/**
 * Recursively resolve all dependencies for a set of components.
 * Returns deduplicated lists of components, files, and npm deps.
 */
export function resolveDependencies(
  items: RegistryItem[],
  registry: RegistryItem[],
): ResolvedDependencies {
  const visited = new Set<string>()
  const components: RegistryItem[] = []
  const files = new Set<string>()
  const npmDependencies: Record<string, string> = {}

  function visit(item: RegistryItem) {
    const key = `${item.category}/${item.name}`
    if (visited.has(key)) return
    visited.add(key)

    components.push(item)

    // Collect file dependencies (hooks, lib)
    for (const file of item.files) {
      files.add(file)
    }

    // Collect npm dependencies
    for (const [pkg, version] of Object.entries(item.npmDependencies)) {
      npmDependencies[pkg] = version
    }

    // Recursively resolve component dependencies
    for (const depName of item.registryDependencies) {
      const dep = findDep(depName, item.category, registry)
      if (dep) {
        visit(dep)
      }
    }
  }

  for (const item of items) {
    visit(item)
  }

  // Also resolve file dependencies' own dependencies (hooks that import from lib)
  // These are already tracked in component files, so the file list should be complete

  return {
    components,
    files: [...files],
    npmDependencies,
  }
}

/** Find a dependency by name, considering category context */
function findDep(
  depName: string,
  currentCategory: string,
  registry: RegistryItem[],
): RegistryItem | undefined {
  // If it contains a slash, it's a cross-category reference like "ui-extended/button"
  if (depName.includes('/') && !depName.startsWith('car-finance')) {
    const [category, ...rest] = depName.split('/')
    const name = rest.join('/')
    return registry.find((item) => item.category === category && item.name === name)
  }

  // Otherwise search within the same category first, then fallback
  return (
    registry.find((item) => item.category === currentCategory && item.name === depName) ??
    registry.find((item) => item.name === depName)
  )
}
