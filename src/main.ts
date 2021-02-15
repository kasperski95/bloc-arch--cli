import Case from 'case'
import { ProjectFile } from './abstractions/ProjectFile'
import { IParameters } from './index'

export async function main({ name, filenameCase }: IParameters) {
  let fileCase = filenameCase as 'pascal' | 'kebab' | 'snake' | 'camel'

  let filenameFormatter = Case[fileCase]

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

  ProjectFile.createProjectDir(name)
  ProjectFile.setSharedTemplateData(data)

  await Promise.all([
    new ProjectFile(
      '',
      filenameFormatter(`${name}-bloc`) + '.ts',
      'bloc.ts'
    ).generate(),
    new ProjectFile(
      '',
      data.filenames.eventFile + '.ts',
      'event.ts'
    ).generate(),
    new ProjectFile(
      '',
      data.filenames.stateFile + '.ts',
      'state.ts'
    ).generate(),
    new ProjectFile('', `index.ts`, 'index.ts').generate(),
  ])
}
