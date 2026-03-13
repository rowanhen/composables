import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import * as readline from 'node:readline'
import { defineCommand } from 'citty'
import pc from 'picocolors'
import { findComponent, getRegistryDir, loadRegistry } from '../registry/index.js'
import { resolveDependencies } from '../utils/dependency-resolver.js'
import { logger } from '../utils/logger.js'
import { rewriteImports } from '../utils/path-rewriter.js'

interface SmoresConfig {
  aliasPrefix: string
  paths: {
    ui: string
    uiExtended: string
    hooks: string
    lib: string
  }
}

function loadConfig(): SmoresConfig | null {
  const configPath = join(process.cwd(), 'smores.config.json')
  if (!existsSync(configPath)) {
    return null
  }
  return JSON.parse(readFileSync(configPath, 'utf-8'))
}

function getDestPath(registryPath: string, config: SmoresConfig): string {
  // Map registry paths to downstream project paths
  if (registryPath.startsWith('components/ui-extended/')) {
    return join(config.paths.uiExtended, registryPath.replace('components/ui-extended/', ''))
  }
  if (registryPath.startsWith('components/ui-product/')) {
    // Keep the product subfolder structure
    return join('src/components/ui-product', registryPath.replace('components/ui-product/', ''))
  }
  if (registryPath.startsWith('components/ui/')) {
    return join(config.paths.ui, registryPath.replace('components/ui/', ''))
  }
  if (registryPath.startsWith('hooks/')) {
    return join(config.paths.hooks, registryPath.replace('hooks/', ''))
  }
  if (registryPath.startsWith('lib/')) {
    return join(config.paths.lib, registryPath.replace('lib/', ''))
  }
  return registryPath
}

function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close()
      resolve(answer.trim().toLowerCase())
    })
  })
}

export const addCommand = defineCommand({
  meta: {
    name: 'add',
    description: 'Add component(s) to your project',
  },
  args: {
    components: {
      type: 'positional',
      description: 'Component name(s) to install',
      required: true,
    },
    overwrite: {
      type: 'boolean',
      description: 'Overwrite existing files',
      default: false,
    },
    yes: {
      type: 'boolean',
      alias: 'y',
      description: 'Skip confirmation prompt',
      default: false,
    },
  },
  async run({ args }) {
    const config = loadConfig()
    if (!config) {
      logger.error('No smores.config.json found. Run "smores-internal init" first.')
      process.exit(1)
    }

    const registry = loadRegistry()

    // Parse component names (citty passes positional as string, split on spaces)
    const componentNames =
      typeof args.components === 'string' ? args.components.split(/\s+/) : [args.components]

    // Support "all" keyword to install every component
    const requestedItems =
      componentNames.length === 1 && componentNames[0].toLowerCase() === 'all' ? [...registry] : []

    if (requestedItems.length === 0) {
      for (const name of componentNames) {
        const item = findComponent(registry, name)
        if (!item) {
          logger.error(`Component "${name}" not found in registry.`)
          logger.dim("Run 'smores-internal list' to see available components.")
          process.exit(1)
        }
        requestedItems.push(item)
      }
    }

    // Resolve all dependencies
    const resolved = resolveDependencies(requestedItems, registry)

    // Build list of files to copy
    const filesToCopy: { src: string; dest: string }[] = []

    for (const comp of resolved.components) {
      const src = comp.srcPath
      const dest = getDestPath(src, config)
      filesToCopy.push({ src, dest })
    }

    for (const file of resolved.files) {
      const dest = getDestPath(file, config)
      filesToCopy.push({ src: file, dest })
    }

    // Check for existing files
    const existing = filesToCopy.filter((f) => existsSync(join(process.cwd(), f.dest)))

    // Print summary
    logger.bold('Components to install:')
    for (const comp of resolved.components) {
      console.log(`  ${pc.cyan(comp.category)}/${pc.bold(comp.name)}`)
    }
    logger.break()

    if (resolved.files.length > 0) {
      logger.bold('Dependencies (hooks/lib):')
      for (const file of resolved.files) {
        console.log(`  ${pc.dim(file)}`)
      }
      logger.break()
    }

    logger.bold('Files to write:')
    for (const file of filesToCopy) {
      const existsAlready = existing.some((e) => e.dest === file.dest)
      const marker = existsAlready
        ? args.overwrite
          ? pc.yellow(' (overwrite)')
          : pc.red(' (exists, skipping)')
        : ''
      console.log(`  ${file.dest}${marker}`)
    }
    logger.break()

    if (Object.keys(resolved.npmDependencies).length > 0) {
      logger.bold('Required npm dependencies:')
      for (const [pkg, version] of Object.entries(resolved.npmDependencies)) {
        console.log(`  ${pkg}@${pc.dim(version)}`)
      }
      logger.break()
    }

    // Confirm
    if (!args.yes) {
      const answer = await prompt('Proceed? (y/n) ')
      if (answer !== 'y' && answer !== 'yes') {
        logger.dim('Cancelled.')
        return
      }
    }

    // Copy files
    const registryDir = getRegistryDir()
    let copied = 0
    let skipped = 0

    for (const file of filesToCopy) {
      const destPath = join(process.cwd(), file.dest)
      const existsAlready = existsSync(destPath)

      if (existsAlready && !args.overwrite) {
        skipped++
        continue
      }

      // Read source, rewrite imports, write to destination
      const srcPath = join(registryDir, file.src)
      let content = readFileSync(srcPath, 'utf-8')
      content = rewriteImports(content, config.aliasPrefix)

      mkdirSync(dirname(destPath), { recursive: true })
      writeFileSync(destPath, content, 'utf-8')
      copied++
    }

    logger.break()
    logger.success(`Done! ${copied} file(s) written.`)
    if (skipped > 0) {
      logger.warn(`${skipped} file(s) skipped (already exist). Use --overwrite to replace.`)
    }

    if (Object.keys(resolved.npmDependencies).length > 0) {
      logger.break()
      logger.info('Install required dependencies:')
      const deps = Object.entries(resolved.npmDependencies)
        .map(([pkg, version]) => `${pkg}@${version}`)
        .join(' ')
      console.log(`  npm install ${deps}`)
    }
  },
})
