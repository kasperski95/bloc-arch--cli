import Case from 'case'
import { ProjectFile } from './abstractions/ProjectFile'
import { IParameters } from './index'

export async function main({
  name,
  filenameCase,
  path,
  directoryCase,
}: IParameters) {
  let filenameCasing = filenameCase as 'pascal' | 'kebab' | 'snake' | 'camel'
  let directoryCasing = directoryCase as 'pascal' | 'kebab' | 'snake' | 'camel'

  let filenameFormatter = Case[filenameCasing]
  let directoryNameFormatter = Case[directoryCasing]

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
    new ProjectFile('', `index.ts`, 'index.ts').generate(),
  ])
}
