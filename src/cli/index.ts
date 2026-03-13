import { defineCommand, runMain } from 'citty'
import { addCommand } from './commands/add.js'
import { initCommand } from './commands/init.js'
import { listCommand } from './commands/list.js'
import { tokensCommand } from './commands/tokens.js'

const main = defineCommand({
  meta: {
    name: 'smores-internal',
    version: '1.0.0',
    description:
      'CLI for @mrshmllw/smores-internal-react — browse tokens, install components, and configure your project',
  },
  subCommands: {
    tokens: tokensCommand,
    add: addCommand,
    init: initCommand,
    list: listCommand,
  },
})

runMain(main)
