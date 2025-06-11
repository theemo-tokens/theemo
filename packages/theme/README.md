# `@theemo/theme`

Theemo manager when loaded with vite.

## Installation

```sh
pnpm add -D @theemo/vite @theemo/theme
```

## Configuration

Add `@theemo/vite` to load all themes

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import { theemo } from '@theemo/vite';

export default defineConfig({
  plugins: [
    theemo({
      defaultTheme: '<your-default-theme-name>'
    })
  ]
});
```

## Usage with `@theemo/theme`

Instantiate `ThemeManager` to start switching themes and features.

```ts
import { ThemeManager } from '@theemo/theme';

const manager = new ThemeManager();
manager.switchTheme('ocean');
```

## References

- [Example on Playground](https://github.com/theemo-tokens/tree/main/playground/vanilla-js)
- [API](https://theemo.io/api/@theemo/theme/)
