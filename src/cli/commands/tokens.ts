import { defineCommand } from 'citty'
import { logger } from '../utils/logger.js'
import { getTokenCategories, printTokens } from '../utils/token-reader.js'

export const tokensCommand = defineCommand({
  meta: {
    name: 'tokens',
    description: 'Browse semantic design tokens',
  },
  args: {
    category: {
      type: 'positional',
      description: 'Token category to display (bg, text, border, icon, chart, ...)',
      required: false,
    },
  },
  run({ args }) {
    if (!args.category) {
      logger.bold('Available token categories:')
      logger.break()
      const categories = getTokenCategories()
      for (const cat of categories) {
        console.log(`  ${cat}`)
      }
      logger.break()
      logger.dim('Usage: smores-internal tokens <category>')
      logger.dim('Example: smores-internal tokens bg')
      return
    }

    printTokens(args.category)
  },
})
