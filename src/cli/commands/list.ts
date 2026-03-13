import { defineCommand } from 'citty'
import pc from 'picocolors'
import { loadRegistry } from '../registry/index.js'
import { logger } from '../utils/logger.js'

export const listCommand = defineCommand({
  meta: {
    name: 'list',
    description: 'List all available components',
  },
  args: {
    category: {
      type: 'string',
      alias: 'c',
      description: 'Filter by category (ui, ui-extended, ui-product)',
      required: false,
    },
  },
  run({ args }) {
    const registry = loadRegistry()

    const filtered = args.category
      ? registry.filter((item) => item.category === args.category)
      : registry

    if (filtered.length === 0) {
      logger.warn(
        args.category
          ? `No components found in category "${args.category}".`
          : 'No components found in registry.',
      )
      return
    }

    // Group by category
    const grouped = new Map<string, typeof registry>()
    for (const item of filtered) {
      const items = grouped.get(item.category) ?? []
      items.push(item)
      grouped.set(item.category, items)
    }

    const categoryLabels: Record<string, string> = {
      ui: 'UI Primitives',
      'ui-extended': 'UI Extended',
      'ui-product': 'UI Product',
    }

    for (const [category, items] of grouped) {
      logger.break()
      logger.bold(`${categoryLabels[category] ?? category} (${items.length})`)
      logger.break()

      for (const item of items) {
        const deps = item.registryDependencies.length
        const depsLabel = deps > 0 ? pc.dim(` (${deps} deps)`) : ''
        console.log(`  ${pc.cyan(item.name)}${depsLabel}`)
      }
    }

    logger.break()
    logger.dim(`${filtered.length} components available`)
    logger.dim('Usage: smores-internal add <component-name>')
  },
})
