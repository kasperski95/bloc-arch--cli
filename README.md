# @bloc-arch/cli <!-- omit in toc -->
![https://travis-ci.com/kasperski95/bloc-arch--cli.svg?branch=master](https://travis-ci.com/kasperski95/bloc-arch--cli.svg?branch=master)

Create JavaScript or TypeScript boilerplate code for BLoC pattern.

## Table of Contents <!-- omit in toc -->
- [Usage](#usage)
- [Syntax](#syntax)

---

## How to use?
1. Add package to your project
    ```sh
      npm i @bloc-arch/cli -D
    ```
2. Add following script to your *package.json*
    ```json
    {
      "scripts": {
        "bloc": "bloc --path OUTPUT_PATH"
      }
    }
    ```
3. Run
    ```sh
    npm run bloc -- "bloc name"
    ```

## Available flags
```sh
bloc <bloc_name>
  [--path OUTPUT_PATH]
  [--filenameCase pascal | kebab | snake | camel]
  [--directoryCase pascal | kebab | snake | camel]
  [--typescript]
```
