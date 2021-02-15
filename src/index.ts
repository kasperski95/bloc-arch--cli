#!/usr/bin/env node

import 'reflect-metadata'
import { main } from './main'
import { options } from 'yargs'

const parameters = options({
  path: { type: 'string' },
  name: { type: 'string', demandOption: true },
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
}).argv

export type IParameters = typeof parameters

main(parameters)
