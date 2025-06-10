# Configuring Theemo

You can configure theemo in `theemo.config.js`:

The most basic config file looks like this:

```js [theemo.config.js]
export default {
  // config options
}
```

Alternative locations are also possible:

- `.config/theemo.js`
- `.config/theemo.cjs`
- `.config/theemo.mjs`
- `theemo.config.js`
- `theemo.config.cjs`
- `theemo.config.mjs`

## Config Intellisense

Since Theemo ships with TypeScript typings, you can leverage your IDE's
intellisense with jsdoc type hints:

```js [theemo.config.js]
/** @type {import('@theemo/cli').TheemoConfig} */
export default {
  // config options
}
```

Alternatively, you can use the `defineConfig` helper which should provide
intellisense without the need for jsdoc annotations:

```js [theemo.config.js]
import { defineConfig } from '@theemo/cli';

export default defineConfig({
  // ...
})
```

## Using Environment Variables

Environmental Variables can be obtained from `process.env` as usual. Also Theemo
loads `.env` files.
