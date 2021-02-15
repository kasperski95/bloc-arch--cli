import { fork } from 'child_process'
import { join } from 'path'
import { existsSync, rmdirSync } from 'fs'
import Case from 'case'

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
  const outputPath = TEST_OUTPUT_DIRNAME
  if (existsSync(outputPath)) {
    rmdirSync(outputPath, { recursive: true })
  }
}

beforeEach(cleanUpIfNecessary)
afterEach(cleanUpIfNecessary)

it('should create folder and files', async () => {
  await run([BLOC_NAME, '--path', TEST_OUTPUT_DIRNAME])

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
    'index.ts',
    'test-bloc.ts',
    'test-event.ts',
    'test-state.ts',
  ]) {
    expect(
      existsSync(join(TEST_OUTPUT_DIRNAME, Case.pascal(BLOC_NAME), filename))
    ).toBeTruthy()
  }
})
