# @bloc-arch/cli <!-- omit in toc -->

Create JavaScript or TypeScript boilerplate code for BLoC pattern.

## Table of Contents <!-- omit in toc -->
- [Usage](#usage)
- [Syntax](#syntax)

---

## Usage
1. Add package to your project
    ```sh
      npm i @bloc-arch/cli -D
    ```
2. Add following script to your *package.json*
    ```json
    {
      ...
      "scripts": {
        ...
        "bloc": "bloc --path OUTPUT_PATH" // <= add this line
        ...
      }
      ...
    }

    ```
3. Run
    ```sh
    npm run bloc -- "bloc name"
    ```

## Syntax
```sh
bloc <bloc_name>
  [--path OUTPUT_PATH]
  [--filenameCase pascal | kebab | snake | camel]
  [--directoryCase pascal | kebab | snake | camel]
  [--typescript]
```
