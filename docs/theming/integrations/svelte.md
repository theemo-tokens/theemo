# Svelte

When you use vite with svelte starter template.

[Svelte Example on
Playground](https://github.com/theemo-tokens/theemo/tree/main/playground/svelte)

## Installation

```sh
pnpm add -D @theemo/svelte @theemo/vite
```

## Configuration

Add `@theemo/vite` to load all themes

```ts [vite.config.ts]
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { theemo } from '@theemo/vite';

export default defineConfig({
  plugins: [
    svelte(),
    theemo({
      defaultTheme: 'ocean'
    })
  ],
})
```

## Usage

### With Context

There are two exports in `@theemo/svelte` for setting and getting `Theemo` from
the context. Set theemo from your `App.svelte`:

```html [src/App.svelte]
<script lang="ts">
  import { setTheemoContext } from '@theemo/svelte';

  setTheemoContext();
</script>
```

then later down the component tree, you can use it to switch themes:

```html [src/lib/theme-switcher.svelte]
<script setup lang="ts">
  import { getTheemoContext } from '@theemo/svelte';
  
  const theemo = getTheemoContext();

  theemo.switchTheme('ocean');
</script>
```

### Manually

You can also use the `Theemo` class and manually instantiate it, if one instance
is what you need.

```ts
import { Theemo } from '@theemo/svelte';

const theemo = new Theemo();
theemo.switchTheme('ocean');
```

> [!IMPORTANT]
> At best, `Theemo` stays a single instance to avoid two classes try to manage
> themes

## References

- [Example on Playground](https://github.com/theemo-tokens/theemo/tree/main/playground/svelte)
- [API](/api/@theemo/svelte/)
