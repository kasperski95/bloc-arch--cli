import Case from 'case'
import { fork } from 'child_process'
import { existsSync, mkdirSync, rmdirSync } from 'fs'
import { join } from 'path'

const TEST_OUTPUT_DIRNAME = 'test-output'
const BLOC_NAME = 'test'

async function run(args: string[]) {
  return new Promise((resolve, reject) => {
    const process = fork(join(__dirname, '../dist/index.js'), args)

    process.addListener('exit', () => {
      resolve(undefined)
    })
  })
}

function cleanUpIfNecessary() {
  if (existsSync(TEST_OUTPUT_DIRNAME)) {
    rmdirSync(TEST_OUTPUT_DIRNAME, { recursive: true })
  }
}

// -----------------------------------------------------------

beforeEach(() => {
  cleanUpIfNecessary()
  mkdirSync(TEST_OUTPUT_DIRNAME)
})
afterEach(cleanUpIfNecessary)

it('should create folder and files', async () => {
  await run([BLOC_NAME, '--path', TEST_OUTPUT_DIRNAME])

  for (let filename of [
    'index.js',
    'TestBloc.js',
    'TestEvent.js',
    'TestState.js',
  ]) {
    expect(
      existsSync(join(TEST_OUTPUT_DIRNAME, Case.kebab(BLOC_NAME), filename))
    ).toBeTruthy()
  }
})

it('should support typescript', async () => {
  await run([BLOC_NAME, '--path', TEST_OUTPUT_DIRNAME, '--typescript'])

  for (let filename of [
    'index.ts',
    'TestBloc.ts',
    'TestEvent.ts',
    'TestState.ts',
  ]) {
    expect(
      existsSync(join(TEST_OUTPUT_DIRNAME, Case.kebab(BLOC_NAME), filename))
    ).toBeTruthy()
  }
})

it('should support alternative file and directory cases', async () => {
  await run([
    BLOC_NAME,
    '--path',
    TEST_OUTPUT_DIRNAME,
    '--directoryCase',
    'pascal',
    '--filenameCase',
    'kebab',
  ])

  for (let filename of [
    'index.js',
    'test-bloc.js',
    'test-event.js',
    'test-state.js',
  ]) {
    expect(
      existsSync(join(TEST_OUTPUT_DIRNAME, Case.pascal(BLOC_NAME), filename))
    ).toBeTruthy()
  }
})
