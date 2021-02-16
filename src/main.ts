import Case from 'case'
import { existsSync } from 'fs'
import { join } from 'path'
import process from 'process'
import { Args } from './index'
import { Logger } from './logger'
import { ProjectFile } from './project-file'

export async function main({ name, filenameCase, path, directoryCase }: Args) {
  let filenameFormatter = Case[filenameCase]
  let directoryNameFormatter = Case[directoryCase]

  const data = {
    filenames: {
      eventFile: filenameFormatter(`${name} event`),
      stateFile: filenameFormatter(`${name} state`),
      blocFile: filenameFormatter(`${name} bloc`),
    },
    name: {
      camel: Case.camel(name),
      pascal: Case.pascal(name),
      kebab: Case.kebab(name),
    },
  }

  try {
    if (path) ProjectFile.setBlocDirectory(path)
    ProjectFile.setSharedTemplateData(data)

    const dirName = directoryNameFormatter(name)

    const destination = join(process.cwd(), path || '', dirName)
    if (existsSync(destination)) {
      throw new Error(
        `Directory "${destination}" exists. Please remove it or create a bloc with a different name.`
      )
    }

    await Promise.all([
      new ProjectFile(
        dirName,
        filenameFormatter(`${name}-bloc`) + '.ts',
        'bloc.ts'
      ).generate(),
      new ProjectFile(
        dirName,
        data.filenames.eventFile + '.ts',
        'event.ts'
      ).generate(),
      new ProjectFile(
        dirName,
        data.filenames.stateFile + '.ts',
        'state.ts'
      ).generate(),
      new ProjectFile(dirName, `index.ts`, 'index.ts').generate(),
    ])
  } catch (err) {
    new Logger().error('Could not create files.', err)
    process.exit(1)
  }
}
