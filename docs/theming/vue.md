# Vue

Theemo integration for vue to manage themes.

## Installation

```sh
pnpm add -D @theemo/vue @theemo/vite
```

## Usage

### 1. Prepare `vite`

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

Then in your `index.html` add <code v-pre>{{theemo}}</code> that will be replaced with the
default theme (so it is instantly loaded):

```html [index.html]
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="UTF-8">
    <link rel="icon" href="/favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vite App</title>
    {{theemo}}
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

### 2. Provide & Inject

There are two exports in `@theemo/vue` for providing and injecting `Theemo`.
Provide theemo from your `App.vue`:

```html [App.vue]
<script setup lang="ts">
import { provideTheemo } from '@theemo/vue';

provideTheemo();
</script>
```

then later down the component tree, you can use it to swith themes:

```html [components/theme-switcher.vue]
<script setup lang="ts">
import { injectTheemo } from '@theemo/vue';

const theemo = injectTheemo();

theemo.switchTheme('ocean');
</script>
```

### 3. Manually

You can also use the `Theemo` class and manually instantiate it, if one instance
is what you need.

```ts
import { Theemo } from '@theemo/vue';

const theemo = new Theemo();
theemo.switchTheme('ocean');
```
