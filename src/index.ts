#!/usr/bin/env node

import { main } from './main'
import { command } from 'yargs'

export type SupportedNamingConventions = 'pascal' | 'kebab' | 'snake' | 'camel'

export interface Args {
  name: string
  path?: string
  filenameCase: SupportedNamingConventions
  directoryCase: SupportedNamingConventions
}

const args = command<Args>('$0 <name>', 'Name', (yargs) => {
  yargs
    .positional('name', {
      type: 'string',
      demandOption: true,
    })
    .options({
      path: { type: 'string' },
      filenameCase: {
        type: 'string',
        choices: ['pascal', 'kebab', 'snake', 'camel'],
        default: 'pascal',
      },
      directoryCase: {
        type: 'string',
        choices: ['pascal', 'kebab', 'snake', 'camel'],
        default: 'kebab',
      },
    })
}).argv

main(args)
