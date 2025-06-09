# CSS Color Transforms

Theemo supports color transformations, either at build time or at runtime by
generating CSS color transform functions.

Uses (provided by [registering theemo extensions](./style-dictionary.md#register-theemo-extensions)):

- [`color/transforms`
  transform](./style-dictionary/transforms.md#color-transforms)

::: warning

The output is using `hsl()` function. Meanwhile DTCG has added support for
mulitiple color functions. The implementation in Theemo landed earlier and does
not support the new format yet.

TODO: link to DTCG and create Issue

:::

## Input

These tokens may have color schemes as feature constraints or regular
references.

::: code-group

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
      },
      "disabled": {
        "background": {
          "$value": {
            "value": "{intent.action.base.background}",
            "transforms": {
              "alpha": -35
            }
          },
          "$description": "",
          "$type": "color"
        },
        "border": {
          "$value": {
            "value": "{intent.action.base.border}",
            "transforms": {
              "alpha": -35
            }
          },
          "$description": "",
          "$type": "color"
        },
        "text": {
          "$value": {
            "value": "{intent.action.base.text}",
            "transforms": {
              "alpha": -35
            }
          },
          "$description": "",
          "$type": "color"
        }
      }
    }
  }
}
```

```json [palette.tokens.json]
{
  "palette": {
    "brand": {
      "red": {
        "$value": "#e41b1b",
        "$description": "",
        "$type": "color"
      },
      "400": {
        "$value": {
          "value": "{palette.brand.500}",
          "transforms": {
            "lightness": -10
          }
        },
        "$description": "",
        "$type": "color"
      },
      "500": {
        "$value": "{palette.brand.red}",
        "$description": "",
        "$type": "color"
      },
      "600": {
        "$value": {
          "value": "{palette.brand.500}",
          "transforms": {
            "lightness": 10
          }
        },
        "$description": "",
        "$type": "color"
      }
    }
  }
}
```

:::

## Configuration

In addition to the config used at [CSS custom properties & CSS `light-dark()`] token
conversions, this will add the `useCSSColorTransform` flag to tell the
[`color/transforms`](./style-dictionary/transforms.md#color-transforms) to output using CSS color functions.

```js [config.js] {24}
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
        showFileHeader: false,
        useCSSColorTransform: true // [!code focus]
      },
      files: [
        {
          format: 'css/properties',
          destination: 'properties.css',
          filter: isCSSProperty
        },
        {
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
    }
  }
};

export default config;
```

## Output

### `useCSSColorTransform: true`

When setting `useCSSColorTransform: true` it will output CSS using color functions.

```css [vars.css]
:root {
  --palette-brand-500: var(--palette-brand-red);
  --palette-brand-100: hsl(from var(--palette-brand-500) h s calc(l - 40));
  --palette-brand-200: hsl(from var(--palette-brand-500) h s calc(l - 30));
  --palette-brand-300: hsl(from var(--palette-brand-500) h s calc(l - 20));
  --palette-brand-400: hsl(from var(--palette-brand-500) h s calc(l - 10));
  --palette-brand-600: hsl(from var(--palette-brand-500) h s calc(l + 10));
  --palette-brand-700: hsl(from var(--palette-brand-500) h s calc(l + 20));
  --palette-brand-800: hsl(from var(--palette-brand-500) h s calc(l + 30));
  --palette-brand-900: hsl(from var(--palette-brand-500) h s calc(l + 40));
  --intent-action-base-text: var(--palette-letters-brand-highlight);
  --intent-action-base-background: var(--palette-brand-500);
  --intent-action-base-border: var(--intent-action-base-background);
  --intent-action-disabled-text: hsl(from var(--intent-action-base-text) h s l / 0.65);
  --intent-action-disabled-background: hsl(from var(--intent-action-base-background) h s l / 0.65);
  --intent-action-disabled-border: hsl(from var(--intent-action-base-border) h s l / 0.65);
  /* ... more tokens ... */
}
```

### `useCSSColorTransform: false`

When setting `useCSSColorTransform: false` the color values are transformed at
build time. Use this, when your browser support doesn't include CSS color
functions yet.

TODO: run this at home
