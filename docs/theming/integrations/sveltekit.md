# SvelteKit

When using `sv` CLI to start your project.

[Sveltekit Example on
Playground](https://github.com/theemo-tokens/tree/main/playground/sveltekit)

## Installation

```sh
pnpm add -D @theemo/svelte
```

## Configuration

Add theemo to your svelte config.

```ts [svelte.config.js]
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { theemoSvelteConfig } from '@theemo/svelte/kit'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter()
  }
};

export default theemoSvelteConfig(config);
```

Add theemo for SvelteKit to vite config to load all your themes.

```ts [vite.config.ts]
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { theemoPlugin } from '@theemo/svelte/kit';

export default defineConfig({
  plugins: [
    sveltekit(),
    theemoPlugin({
      defaultTheme: 'ocean'
    })
  ]
});
```

## Usage

### With Context

There are two exports in `@theemo/svelte` for providing and injecting `Theemo`.
Provide theemo from your `App.svelte`:

```html [src/routes/+layout.svelte]
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

- [Example on Playground](https://github.com/theemo-tokens/tree/main/playground/sveltekit)
- [API](/api/@theemo/svelte/)
