import Case from 'case'
import { ProjectFile } from './project-file'
import { Args } from './index'
import { Logger } from './logger'

export async function main({ name, filenameCase, path, directoryCase }: Args) {
  let filenameFormatter = Case[filenameCase]
  let directoryNameFormatter = Case[directoryCase]

  const data = {
    filenames: {
      eventFile: filenameFormatter(`${name} event`),
      stateFile: filenameFormatter(`${name} state`),
    },
    name: {
      camel: Case.camel(name),
      pascal: Case.pascal(name),
      kebab: Case.kebab(name),
    },
  }

  if (path) ProjectFile.createProjectDir(path)
  ProjectFile.setSharedTemplateData(data)

  const dirName = directoryNameFormatter(name)

  try {
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
    new Logger().error('Generation failed.', err)
  }
}
