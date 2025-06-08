# `@theemo/svelte`

Theemo integration for [Svelte](#svelte) and [SvelteKit](#sveltekit) to manage
themes.

## Svelte

[Svelte Example on
Playground](https://github.com/theemo-tokens/tree/main/playground/svelte)

(when you use vite with svelte starter template)

### Installation

```sh
pnpm add -D @theemo/svelte @theemo/vite
```

### Configuration for Svelte

Add `@theemo/vite` to load all themes

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { theemo } from '@theemo/vite';

export default defineConfig({
  plugins: [
    svelte(),
    theemo({
      defaultTheme: '<your-default-theme-name>'
    })
  ],
})
```

### Usage for Svelte

There are two exports in `@theemo/svelte` for setting and getting `Theemo` from
the context. Set theemo from your `App.svelte`:

```html
<!-- src/App.svelte -->
<script lang="ts">
  import { setTheemoContext } from '@theemo/svelte';

  setTheemoContext();
</script>
```

then later down the component tree, you can use it to switch themes:

```html
<!-- src/lib/theme-switcher.svelte -->
<script setup lang="ts">
  import { getTheemoContext } from '@theemo/svelte';
  
  const theemo = getTheemoContext();

  theemo.switchTheme('ocean');
</script>
```

## SvelteKit

[SvelteKit Example on
Playground](https://github.com/theemo-tokens/tree/main/playground/sveltekit)

(when using `sv` CLI to start your project)

### Installation

```sh
pnpm add -D @theemo/svelte
```

### Configuration for SvelteKit

Add theemo to your svelte config.

```ts
// svelte.config.js
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

```ts
// vite.config.ts
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { theemoPlugin } from '@theemo/svelte/kit';

export default defineConfig({
  plugins: [
    sveltekit(),
    theemoPlugin({
      defaultTheme: '<your-default-theme-name>'
    })
  ]
});
```

### Usage for SvelteKit

There are two exports in `@theemo/svelte` for providing and injecting `Theemo`.
Provide theemo from your `App.svelte`:

```html
<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import { setTheemoContext } from '@theemo/svelte';

  setTheemoContext();
</script>
```

then later down the component tree, you can use it to switch themes:

```html
<!-- src/lib/theme-switcher.svelte -->
<script setup lang="ts">
  import { getTheemoContext } from '@theemo/svelte';
  
  const theemo = getTheemoContext();

  theemo.switchTheme('ocean');
</script>
```

## Usage Manually

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

- [Svelte Example on
Playground](https://github.com/theemo-tokens/tree/main/playground/svelte)
- [SvelteKit Example on
Playground](https://github.com/theemo-tokens/tree/main/playground/sveltekit)
- [API](https://theemo.io/api/@theemo/svelte/)
