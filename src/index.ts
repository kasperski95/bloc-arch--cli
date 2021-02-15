#!/usr/bin/env node

import 'reflect-metadata'
import { main } from './main'
import { options } from 'yargs'

const parameters = options({
  name: { type: 'string', demandOption: true },
  filenameCase: {
    type: 'string',
    choices: ['pascal', 'kebab', 'snake', 'camel'],
    default: 'pascal',
  },
}).argv

export type IParameters = typeof parameters

main(parameters)
