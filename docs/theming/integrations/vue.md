# Vue

Theemo integration for vue to manage themes.

## Installation

```sh
pnpm add -D @theemo/vue @theemo/vite
```

## Configuration

Add `@theemo/vite` to load all themes

```ts [vite.config.ts]
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { theemo } from '@theemo/vite';

export default defineConfig({
  plugins: [
    vue(),
    theemo({
      defaultTheme: '<your-default-theme-name>'
    })
  ]
});
```

## Usage

### With Provide & Inject

There are two exports in `@theemo/vue` for providing and injecting `Theemo`.
Provide theemo from your `App.vue`:

```html [src/App.vue]
<script setup lang="ts">
import { provideTheemo } from '@theemo/vue';

provideTheemo();
</script>
```

then later down the component tree, you can use it to swicth themes:

```html [src/components/theme-switcher.vue]
<script setup lang="ts">
import { injectTheemo } from '@theemo/vue';

const theemo = injectTheemo();

theemo.switchTheme('ocean');
</script>
```

### Manually

You can also use the `Theemo` class and manually instantiate it, if one instance
is what you need.

```ts
import { Theemo } from '@theemo/vue';

const theemo = new Theemo();
theemo.switchTheme('ocean');
```

## References

- [Example on Playground](https://github.com/theemo-tokens/theemo/tree/main/playground/vue)
- [API](/api/@theemo/vue/)
