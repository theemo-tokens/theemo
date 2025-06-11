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

## Integrations

The output from `theemo build` is _one_ CSS file ready to include in your
application. You can either publish your theme package or have it part of your
monorepo. From there you can of course inject it manually into your project.
Better is to use one of the provided (vite based)
[integrations](../integrations.md) to load and manage themes.
