#!/usr/bin/env node

import { command } from 'yargs'
import { main } from './main'

export type SupportedNamingConventions = 'pascal' | 'kebab' | 'snake' | 'camel'

export interface Args {
  name: string
  filenameCase: SupportedNamingConventions
  directoryCase: SupportedNamingConventions
  typescript: boolean
  path?: string
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
      typescript: {
        type: 'boolean',
        default: false,
      },
    })
}).argv

main(args)
