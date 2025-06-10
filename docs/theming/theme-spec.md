# Theme Specification

A Theemo theme is an NPM package with a bit of metadata to recognize a theme.
That helps bundlers to load them and runtime to manage features at runtime.

You can use [`theemo build`](./build/theemo-package.md) to generate the required spec. Then publish the
package to a registry or use it as part of your monorepo.

## Specification

A Theemo theme needs minimal information in `package.json`:

1. Add `theemo-theme` to `keywords`.
2. Add `theemo` field with information about your theme

### `theemo` Field

The `theemo` field contains information about:

- `name` of your theme
- `file` the CSS file for your theme
- `features` available to your theme

## Features

An array of features available to either the product integrating the theme or
even for end-users.

Features are `ColorSchemeFeature | ColorContrastFeature | MotionFeature |
CustomFeature` and can be summarized as:

```ts
interface Feature {
  name: string;
  options: string[];
  defaultOption?: string;
  browserFeature?: 'color-scheme' | 'color-contrast' | 'motion';
}
```

### Browser Features

Browsers have bulit-in mechanics to support a couple of features in which they
act as [agents or principals](../design-tokens/traits.md#principals-and-agents)
for the browser or operating system. Thus they are supported by the theemo
[`ThemeManager`](/api/@theemo/theme/classes/ThemeManager.md) (see [Vanilla
Example](./vanilla.md)).

Browser Features are
[`ColorSchemeFeature`](/api/@theemo/theme/interfaces/ColorSchemeFeature.md),
[`ColorContrastFeature`](/api/@theemo/theme/interfaces/ColorContrastFeature.md)
and [`MotionFeature`](/api/@theemo/theme/interfaces/MotionFeature.md) and must
be denoted by the `browserFeature` field for theemo to recognize.

Here is an example to define a color scheme feature:

```json
{
  "name": "color-scheme",
  "browserFeature": "color-scheme",
  "options": [
    "light",
    "dark"
  ]
}
```

### Custom Features

Other features not supported by special browser mechanics are custom features,
for example different font sizes or density you may offer to your end users.

Here is an example for density:

```json
{
  "name": "density",
  "options": [
    "compact",
    "comfortable",
    "spacious"
  ],
  "defaultOption": "comfortable"
}
```

## Example

Here is a minimal package example, with `sync` and `build:*` scripts present

```json
{
  "name": "package-name",
  "keywords": [
    "theemo-theme"
  ],
  "theemo": {
    "name": "theemo",
    "file": "dist/theemo.css",
    "features": [
      {
        "name": "color-scheme",
        "browserFeature": "color-scheme",
        "options": [
          "light",
          "dark"
        ]
      },
      {
        "name": "density",
        "options": [
          "compact",
          "comfortable",
          "spacious"
        ],
        "defaultOption": "comfortable"
      }
    ],
  },
  "scripts": {
    "sync": "theemo sync",
    "build:css": "style-dictionary build",
    "build:theme": "theemo build"
  },
  "devDependencies": {
    "@theemo/cli": "^1.0.0",
    "@theemo/figma": "^1.0.0",
    "@theemo/build": "^1.0.0",
    "@theemo/sync": "^1.0.0",
    "@theemo/style-dictionary": "^1.0.0",
    "@theemo/tokens": "^1.0.0",
    "style-dictionary": "^5.0.0"
  }
}
```
