# Building a Theme Package

Final step in the build phase is to package up your CSS files to publish them on
a registry or use your theme in a monorepo.

This guide helps you using the `theemo build` command:

- Combine multiple CSS files (eg from [style dictionary](./style-dictionary.md))
  into _one_ CSS file
- Apply necessary CSS selectors
- Write metadata to `package.json`

## Installation

Make sure these packages are installed:

```sh
pnpm add -D @theemo/cli @theemo/build
```

## Configuration

Create a config file `theemo.config.js` with the `build` key:

```js [theemo.config.js]
import { defineConfig } from '@theemo/cli';

export default defineConfig({
  build: {...}
});
```

Find available [configuration options](../../config/build.md).

## Usage

Place a `script` in your `package.json` and add your theme name:

```json [package.json]
{
  "name": "your-theme",
  "keywords": ["theemo-theme"],
  "theemo": {
    "name": "your-theme"
  },
  "scripts": {
    "build:theme": "theemo build"
  },
  "devDependencies": {
    "@theemo/cli": "^1.0.0",
    "@theemo/build": "^1.0.0"
  }
}
```

Run it with:

```sh
pnpm build:theme
```

Check your `file` and see the output.
