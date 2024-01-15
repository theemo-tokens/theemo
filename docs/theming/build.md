# Theming

Theemo generates a CSS theme file for you supporting color schemes in an
adaptive way. Pick color scheme automatically (let the browser decide) or
manually? - Choice is yours. You can configure the generation step to whatever
you prefer.

Theemo will take care of generating a CSS file and enhance it with classes or
CSS media queries as pleased.

::: warning Note

Generating themes currently works with light and dark color-schemes, which is
only one of the [constraints](../design-tokens/theming.md) available for tokens.
That is this works with the output of [style dictionary
sync](../sync/style-dictionary/writer.md).

This is in heavy need of refactoring to support more constraints, please keep in mind.

:::

## Setup

To get you started, install these packages:

```sh
pnpm add -D @theemo/cli @theemo/build
```

Create a config file `theemo.config.mjs`, and start with this template. You'll
find further configuration in the respective readers and writers that you use.

```js
import { defineConfig } from '@theemo/cli';

export default defineConfig({
  build: {...}
});
```

To run it, place it as a `script` in your `package.json` and add your theme metadata:

```json
{
  "keywords": [
    "theemo-theme"
  ],
  "theemo": {
    "name": "theemo",
    "colorSchemes": [
      "light",
      "dark"
    ],
    "file": "dist/theemo.css"
  },
  "scripts": {
    "build": "theemo build"
  }
}
```

Now you can run it with:

```sh
pnpm build
```

## Configuration

The config options are placed in your config file, within `build` property.

### `auto: boolean`

Linking the stylesheet of your theme with:

```html
<link href="path/to/your/theme.css" rel="stylesheet" />
```

Do you want it to have immediate (autmatically) effect on loading? Or do you
want to _activate_ it manually by adding a CSS class to the area where it should
have an affect?

### `base?: string`

Default: `base.css`

The `base` file, e.g. the CSS file that does not contain any color scheme
related statements.

### `input: string` and `output: string`

Default `output`: `dist`

The `input` and `output` folder. Theemo will take multiple CSS files from an
input folder and turns them into _one_ file into the output folder. Theemo
expects input files to look like this:

```css
:root {
  --foo: bar;
  /* ... */
}
```

### `colorSchemes: object`

If your theme ships with multiple color schemes, this is the way to configure
them. Let's start with a sample configuration:

```json
{
  "colorSchemes": {
    "light": {
      "auto": true,
      "manual": true
    },
    "dark": {
      "file": "lights-out.css",
      "auto": false
    }
  }
}
```

The name of the color scheme is the key of the object in which they are defined.

The `activation` can happen automatically (if the name is recognized as `light`
or `dark`) which will generate CSS media queries (e.g. `@media (prefers-color-scheme: light)`). If a browser is configured to instruct a
website to prefer a named color scheme, this will be picked up.

When a `file` is given then this will be the input, anyway if defaults to
`${name}.css` inside `input` folder.

A `manual` activation can requested (ie. if activation is
`auto`) to generate CSS classes to manually enable the color scheme in the
preferred area of your website.

### `defaultColorScheme: string`

Given you have multiple color schemes, its good practice to pick one which is
used as default. The value here refers to the keys you configured in `colorSchemes`.

## Examples

Here are some sample configurations and how to use the generated output.

Given for the example:

- There is a `light` and `dark` color scheme
- The theme is named `ocean`

### Auto-Theme with `light` auto Color Scheme

Config:

```js
import { defineConfig } from '@theemo/cli';

export default defineConfig({
  build: {
    auto: true,
    defaultColorScheme: 'light',
    colorSchemes: {
      light: {
        auto: true,
        manual: false
      },
      dark: {
        auto: true,
        manual: false
      }
    }
  }
});
```

Output:

```css
/* No color scheme related tokens */
:root,
.ocean {
  --bar: baz;
}

@media (prefers-color-scheme: no-preference), (prefers-color-scheme: light) {
  :root,
  .ocean {
    --foo: lightblue;
  }
}

@media (prefers-color-scheme: dark) {
  :root,
  .ocean {
    --foo: darkblue;
  }
}
```

Usage:

```html
<head>
  <link rel="stylesheet" href="path/to/ocean.css" type="text/css" />
</head>
<body></body>
```

### Auto-Theme with `light` auto Color Scheme and Manual Activation

Config:

```js
import { defineConfig } from '@theemo/cli';

export default defineConfig({
  build: {
    auto: true,
    defaultColorScheme: 'light',
    colorSchemes: {
      light: {
        auto: true,
        manual: true
      },
      dark: {
        auto: true,
        manual: true
      }
    }
  }
});
```

Output:

```css
/* No color scheme related tokens */
:root,
.ocean {
  --bar: baz;
}

@media (prefers-color-scheme: no-preference), (prefers-color-scheme: light) {
  :root,
  .ocean {
    --foo: lightblue;
  }
}

.ocean-light {
  --foo: lightblue;
}

@media (prefers-color-scheme: dark) {
  :root,
  .ocean {
    --foo: darkblue;
  }
}

.ocean-dark {
  --foo: darkblue;
}
```

Usage:

```html
<head>
  <link rel="stylesheet" href="path/to/ocean.css" type="text/css" />
</head>
<body>
  <div>Here is the light</div>
  <div class="ocean-dark">Lights out</div>
</body>
```

### Manual-Theme with `light` auto Color Scheme

Config:

```js
import { defineConfig } from '@theemo/cli';

export default defineConfig({
  build: {
    auto: false,
    defaultColorScheme: 'light',
    colorSchemes: {
      light: {
        auto: true,
        manual: false
      },
      dark: {
        auto: true,
        manual: false
      }
    }
  }
});
```

Output:

```css
/* No color scheme related tokens */
.ocean {
  --bar: baz;
}

@media (prefers-color-scheme: no-preference), (prefers-color-scheme: light) {
  .ocean {
    --foo: lightblue;
  }
}

@media (prefers-color-scheme: dark) {
  .ocean {
    --foo: darkblue;
  }
}
```

Usage 1:

```html
<head>
  <link rel="stylesheet" href="path/to/ocean.css" type="text/css" />
</head>
<body class="ocean">
  Activation for the whole document
</body>
```

Usage 2:

```html
<head>
  <link rel="stylesheet" href="path/to/ocean.css" type="text/css" />
</head>
<body>
  Here is no theme active

  <div class="ocean">Swim in the water</div>
</body>
```

## Integration

The output from `generate` is _one_ CSS file ready to include in your
application as demonstrated above. You can publish your theme package
(on npm or your internal registry) and include the `dist/<your-theme-name>.css`
file.

Additionally, when running `theemo generate`, this will update your
`package.json` with a `"theemo"` section. With that it is possible to write
framework integrations, that will pick up these information and integrate the
theme in your framework with zero-config.

Head over to [frameworks](./frameworks.md) to see what options are available.
