# Build Options

- **Type**: [`BuildConfig`](../api/@theemo/build/interfaces/BuildConfig.md)

Confiure the `build` in your `theemo.config.js`.

```js [theemo.config.js] twoslash
import { defineConfig } from '@theemo/cli';

export default defineConfig({
  build: {
    // ...
  }
});
```

## `build.outDir`

- **Type**: `string`
- **Default**: `dist`

This is where files will be build into.

## `build.files`

- **Type**: `string[]`
- **Default**: `[]`

The files that will be concatenated into the output file.

## `build.features`

- **Type**: `BuildFeature[]`
- **Default**: `[]`
- **Related**: [Features](../../design-tokens/features.md)

When your theme supports features, you describe them here so they can be created
appropriately.

### Color Scheme

Color Scheme is supported by browser mechanics. Theemo expects your
CSS files to use `light-dark()` function.

::: code-group

```js [theemo.config.js] twoslash
import { defineConfig } from '@theemo/cli';

export default defineConfig({
  build: {
    features: [
      {
        name: 'color-scheme',
        browserFeature: 'color-scheme',
        options: ['light', 'dark']
      }
    ]
  }
});
```

```css [dist/theme.css]
:root {
  --text-normal: light-dark(var(--palette-letters-dark), var(--palette-letters-light));
  /* more tokens */
  color-scheme: light dark;
}

[data-theemo-color-scheme="light"] {
  color-scheme: light;
}

[data-theemo-color-scheme="dark"] {
  color-scheme: dark;
}
```

:::

The `options` define the order being used for `color-scheme` CSS property
(change the order to make `dark` the default).

Theemo generates `[data-theemo-color-scheme="light"]` these selectors to
manually set a certain color scheme.

### Color Contrast

Color contrast is supported by browsers with a media query. As such, theemo
requires CSS files for all the media query values you want to support. Theemo
then wraps them in the necessary media query.

::: code-group

```js [theemo.config.js] twoslash
import { defineConfig } from '@theemo/cli';

export default defineConfig({
  build: {
    features: [
      {
        name: 'color-contrast',
        browserFeature: 'color-contrast',
        options: {
          less: 'build/contrast-less.css',
          more: 'build/contrast-more.css'
        }
      }
    ]
  }
});
```

```css [dist/theme.css]
@media (prefers-contrast: less) {
  :root {
    --text-contrast: var(--text-subtle);
  }
}

@media (prefers-contrast: more) {
  :root {
    --text-contrast: var(--text-muted);
  }
}
```

```css [build/contrast-less.css]
:root {
  --text-contrast: var(--text-subtle);
}
```

```css [build/contrast-more.css]
:root {
  --text-contrast: var(--text-muted);
}
```

:::

### Motion

Motion is supported by browsers with a media query. As such, theemo
requires CSS files for all the media query values you want to support. Theemo
then wraps them in the necessary media query.

::: code-group

```js [theemo.config.js] twoslash
import { defineConfig } from '@theemo/cli';

export default defineConfig({
  build: {
    features: [
      {
        name: 'motion',
        browserFeature: 'motion',
        options: {
          'no-preference': 'build/motion.css',
          reduce: 'build/motion-reduce.css'
        }
      }
    ]
  }
});
```

```css [dist/theme.css]
@media (prefers-reduced-motion: no-preference) {
  :root {
    --animation-speed: 500ms;
  }
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --animation-speed: 1s;
  }
}
```

```css [build/motion.css]
:root {
  --animation-speed: 500ms;
}
```

```css [build/motion-reduce.css]
:root {
  --animation-speed: 1s;
}
```

:::

### Custom

Any non-browser-supported feature is a custom feature. As such you need to
configure the `options`, to which CSS files they point and the `defaultOption`.

::: code-group

```js [theemo.config.js] twoslash
import { defineConfig } from '@theemo/cli';

export default defineConfig({
  build: {
    features: [
      {
        name: 'density',
        options: {
          compact: 'build/density-compact.css',
          comfortable: 'build/density-comfortable.css',
          spacious: 'build/density-spacious.css'
        },
        defaultOption: 'comfortable'
      }
    ]
  }
});
```

```css [dist/theme.css]
[data-theemo-density="compact"] {
  --spacing-density: .8;
}

:root, [data-theemo-density="comfortable"] {
  --spacing-density: 1;
}

[data-theemo-density="spacious"] {
  --spacing-density: 1.2;
}
```

:::

## `build.lightningcss`

- **Type**: [`BuildConfig.lightningcss`](../api/@theemo/build/interfaces/BuildConfig.md#lightningcss)
- **Default**: `true`
- **Related**: [`lightningcss` Documentation](https://lightningcss.dev/docs.html)

The final CSS file will be optimized by [`lightningcss`](https://lightningcss.dev). You can turn this off by
setting this value to `false` or provide options to lightningcss.
