# Vanilla JS/TS

Use `@theemo/vite` to load themes and `@theemo/theme` to manage themes.

## Installation

```sh
pnpm add -D @theemo/vite @theemo/theme
```

## Configuration

Add `@theemo/vite` to load all themes

```ts [vite.config.ts]
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

## Usage

Instantiate `ThemeManager` to start switching themes and features.

```ts
import { ThemeManager } from '@theemo/theme';

const manager = new ThemeManager();
manager.switchTheme('ocean');
```

## References

- [Example on Playground](https://github.com/theemo-tokens/theemo/tree/main/playground/vanilla-js)
- [API: `@theemo/theme`](/api/@theemo/theme/)
- [API: `@theemo/vite`](/api/@theemo/vite/)
