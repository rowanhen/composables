import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { defineCommand } from 'citty'
import pc from 'picocolors'
import { logger } from '../utils/logger.js'

interface SmoresConfig {
  aliasPrefix: string
  paths: {
    ui: string
    uiExtended: string
    hooks: string
    lib: string
  }
}

export const initCommand = defineCommand({
  meta: {
    name: 'init',
    description: 'Initialize smores-internal in your project',
  },
  args: {},
  run() {
    const cwd = process.cwd()

    logger.bold('Initializing smores-internal...')
    logger.break()

    // 1. Detect project type
    const hasViteConfig =
      existsSync(join(cwd, 'vite.config.ts')) || existsSync(join(cwd, 'vite.config.js'))
    const hasNextConfig =
      existsSync(join(cwd, 'next.config.ts')) ||
      existsSync(join(cwd, 'next.config.js')) ||
      existsSync(join(cwd, 'next.config.mjs'))
    const hasTsConfig = existsSync(join(cwd, 'tsconfig.json'))

    if (hasViteConfig) {
      logger.info('Detected: Vite project')
    } else if (hasNextConfig) {
      logger.info('Detected: Next.js project')
    } else if (hasTsConfig) {
      logger.info('Detected: TypeScript project')
    } else {
      logger.warn('Could not detect project type. Proceeding with defaults.')
    }

    // 2. Check for existing path alias
    const aliasPrefix = '@/'
    if (hasTsConfig) {
      try {
        const tsConfigRaw = readFileSync(join(cwd, 'tsconfig.json'), 'utf-8')
        // Simple check - tsconfig may have comments so full parse isn't trivial
        if (tsConfigRaw.includes('"@/*"') || tsConfigRaw.includes("'@/*'")) {
          logger.info('Found existing @/ path alias in tsconfig.json')
        } else {
          logger.warn('No @/ path alias found in tsconfig.json. You may need to add one.')
        }
      } catch {
        // ignore read errors
      }
    }

    // 3. Create directories
    const dirs = ['src/components/ui', 'src/components/ui-extended', 'src/hooks', 'src/lib']
    for (const dir of dirs) {
      const dirPath = join(cwd, dir)
      if (!existsSync(dirPath)) {
        mkdirSync(dirPath, { recursive: true })
        logger.success(`Created ${dir}/`)
      } else {
        logger.dim(`${dir}/ already exists`)
      }
    }

    // 4. Patch biome.json
    const biomePath = join(cwd, 'biome.json')
    const biomeJsoncPath = join(cwd, 'biome.jsonc')
    const biomeFile = existsSync(biomePath)
      ? biomePath
      : existsSync(biomeJsoncPath)
        ? biomeJsoncPath
        : null

    if (biomeFile) {
      try {
        const biomeContent = readFileSync(biomeFile, 'utf-8')
        const biome = JSON.parse(biomeContent)
        const extendsEntry = '@mrshmllw/smores-internal-react/biome-smores.json'

        if (!biome.extends) {
          biome.extends = []
        }

        if (!biome.extends.includes(extendsEntry)) {
          biome.extends.push(extendsEntry)
          writeFileSync(biomeFile, JSON.stringify(biome, null, 2), 'utf-8')
          logger.success('Patched biome.json with smores-internal extends')
        } else {
          logger.dim('biome.json already extends smores-internal config')
        }
      } catch {
        logger.warn('Could not patch biome.json automatically. Add manually:')
        console.log(`  "extends": ["@mrshmllw/smores-internal-react/biome-smores.json"]`)
      }
    } else {
      logger.dim('No biome.json found - skipping biome configuration')
    }

    // 5. Write smores.config.json
    const configPath = join(cwd, 'smores.config.json')
    const config: SmoresConfig = {
      aliasPrefix,
      paths: {
        ui: 'src/components/ui',
        uiExtended: 'src/components/ui-extended',
        hooks: 'src/hooks',
        lib: 'src/lib',
      },
    }

    if (existsSync(configPath)) {
      logger.dim('smores.config.json already exists - skipping')
    } else {
      writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8')
      logger.success('Created smores.config.json')
    }

    // 6. Print next steps
    logger.break()
    logger.bold('Next steps:')
    logger.break()

    console.log(`  1. Import the CSS in your main stylesheet:`)
    console.log(pc.cyan(`     @import "@mrshmllw/smores-internal-react/styles.css";`))
    logger.break()

    console.log(`  2. Browse available components:`)
    console.log(pc.cyan(`     npx smores-internal list`))
    logger.break()

    console.log(`  3. Add components to your project:`)
    console.log(pc.cyan(`     npx smores-internal add button`))
    console.log(pc.cyan(`     npx smores-internal add form-input`))
    logger.break()

    console.log(`  4. Browse design tokens:`)
    console.log(pc.cyan(`     npx smores-internal tokens bg`))
    logger.break()

    logger.success('Initialization complete!')
  },
})
