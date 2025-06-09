# CSS Custom Properties & CSS `light-dark()`

Converting tokens into CSS custom properties is the most straight forward
approach. When also coverting to [`@property`](./css-at-property.md) at the same
time, this needs some filtering to separate them. At the same time, color-scheme tokens can
be converted using the CSS `light-dark()` function.

Uses (provided by [registering theemo extensions](./style-dictionary.md#register-theemo-extensions)):

- [`matchesConstraints()` filter](./style-dictionary/filters.md#matchesconstraints)
- [`isCSSProperty()`
  filter](./style-dictionary/filters.md#iscssproperty-isnocssproperty)
- [`isConstrainedToken()`
  filter](./style-dictionary/filters.md#isconstrainedtoken-isnoconstrainedtoken)
- [`color/css/light-dark` transform](./style-dictionary/transforms.md#color-css-light-dark)

## Input

These tokens may have color schemes as feature constraints or regular references.

::: code-group

```json [layout.tokens.json]
{
  "layout": {
    "background": {
      "$value": [
        {
          "value": "{palette.structure.white}",
          "features": {
            "color-scheme": "light"
          }
        },
        {
          "value": "{palette.structure.200}",
          "features": {
            "color-scheme": "dark"
          }
        }
      ],
      "$description": "",
      "$type": "color"
    },
    "contrast": {
      "$value": [
        {
          "value": "{palette.structure.900}",
          "features": {
            "color-scheme": "light"
          }
        },
        {
          "value": "{palette.structure.400}",
          "features": {
            "color-scheme": "dark"
          }
        }
      ],
      "$description": "",
      "$type": "color"
    }
  }
}
```

```json [intents/action.tokens.json]
{
  "intent": {
    "action": {
      "base": {
        "background": {
          "$value": "{palette.brand.500}",
          "$description": "",
          "$type": "color"
        },
        "border": {
          "$value": "{intent.action.base.background}",
          "$description": "",
          "$type": "color"
        },
        "text": {
          "$value": "{palette.letters.brand-highlight}",
          "$description": "",
          "$type": "color"
        }
      }
    }
  }
}
```

:::

## Configuration

The output format for them is `css/variables` to convert these tokens into CSS
cutsom properties (provided by Style Dictionary). They can be another file next
to tokens converted to [`@property`](./css-at-property.md). To do that, a set of
filters is needed to only pick qualified tokens for that format.

Filters:

- Can't be a CSS `@property`
- Can match the `color-scheme` feature constraint
- Can't be any other constraint

```js [config.js] {31-45}
import StyleDictionary from 'style-dictionary';

import {
  isConstrainedByPlatform,
  isConstrainedToken,
  isCSSProperty,
  matchesConstraints,
  registerTheemo
} from '@theemo/style-dictionary';

registerTheemo(StyleDictionary);

/** @type import("style-dictionary/types").Config */
const config = {
  source: ['tokens/**/*.json'],
  preprocessors: ['theemo/token'],
  platforms: {
    css: {
      transformGroup: 'theemo',
      buildPath: 'build/',
      options: {
        outputReferences: true,
        showFileHeader: false
      },
      files: [
        {
          format: 'css/properties',
          destination: 'properties.css',
          filter: isCSSProperty
        },
        { // [!code focus:15]
          format: 'css/variables',
          destination: 'vars.css',
          filter: (token) =>
            // when no CSS property
            !isCSSProperty(token) &&
            // and matches color-scheme constraint
            (matchesConstraints(token, {
              features: {
                'color-scheme': ['light', 'dark']
              }
            }) ||
              // but no other constraint
              !isConstrainedToken(token))
        }
      ]
    },
  }
};

export default config;
```

## Output

```css [vars.css]
:root {
  --layout-background: light-dark(var(--palette-structure-white), var(--palette-structure-200));
  --layout-contrast: light-dark(var(--palette-structure-900), var(--palette-structure-400));
  --intent-action-base-text: var(--palette-letters-brand-highlight);
  --intent-action-base-background: var(--palette-brand-500);
  --intent-action-base-border: var(--intent-action-base-background);
  /* ... more tokens ... */
}
```

TODO: link to configure this for `theemo build`
