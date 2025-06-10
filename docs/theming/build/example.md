# Example

This example converts tokens into CSS with [`@property`
format](./css-at-property.md), using [regular CSS custom properties with
`light-dark()` for color-scheme](./css-custom-properties-color-scheme.md) and
[constraind tokens](./constrained-tokens.md) for density.

::: info

[Inspect the Example in
Code](https://github.com/theemo-tokens/tree/main/themes/super-theemo).

:::

## Input

::: code-group

```json [sizing.tokens.json]
{
  "sizing": {
    "base": {
      "$value": "1em",
      "$description": "",
      "$type": "dimension"
    },
    "ratio": {
      "$value": 1.3,
      "$description": "",
      "$type": "number"
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

```json [density.tokens.json]
{
  "spacing": {
    "density": {
      "$value": [
        {
          "value": 1,
          "features": {
            "density": "comfortable"
          }
        },
        {
          "value": 1.2,
          "features": {
            "density": "spacious"
          }
        },
        {
          "value": 0.8,
          "features": {
            "density": "compact"
          }
        }
      ],
      "$description": "",
      "$type": "number"
    }
  }
}
```

:::

## Configuration

```js [config.js] twoslash
import StyleDictionary from 'style-dictionary';

import {
  isConstrainedByPlatform,
  isConstrainedToken,
  isCSSProperty,
  matchesConstraints,
  registerTheemo
} from '@theemo/style-dictionary';

registerTheemo(StyleDictionary);

function makeDensityPlatform(density) {
  return {
    transformGroup: 'theemo',
    buildPath: 'build/',
    constraints: {
      features: {
        density: density
      }
    },
    options: {
      outputReferences: true,
      showFileHeader: false
    },
    files: [
      {
        format: 'css/variables',
        destination: `density-${density}.css`,
        filter: isConstrainedByPlatform
      }
    ]
  };
}

/** @type import("style-dictionary/types").Config */
export default {
  source: ['tokens/**/*.json'],
  preprocessors: ['theemo/token'],
  platforms: {
    css: {
      transformGroup: 'theemo',
      buildPath: 'build/',
      options: {
        outputReferences: true,
        showFileHeader: false,
        useCSSColorTransform: true
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
    },
    // constrained tokens (to combine them later under given selectors)
    'density-comfortable': makeDensityPlatform('comfortable'),
    'density-spacious': makeDensityPlatform('spacious'),
    'density-compact': makeDensityPlatform('compact')
  }
};
```

## Output

::: code-group

```css [properties.css]
@property --palette-brand-red {
  syntax: "<color>";
  inherits: true;
  initial-value: #e41b1b;
}

@property --palette-brand-yellow {
  syntax: "<color>";
  inherits: true;
  initial-value: #ffec40;
}

@property --sizing-base {
  syntax: "<length>";
  inherits: true;
  initial-value: 1em;
}

@property --sizing-ratio {
  syntax: "<number>";
  inherits: true;
  initial-value: 1.3;
}

/* ... more @property ... */
```

```css [vars.css]
:root {
  --brand-text: var(--palette-brand-yellow);
  --brand-background: var(--palette-brand-red);
  --layout-background: light-dark(var(--palette-structure-white), var(--palette-structure-200));
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

```css [density-comfortable.css]
:root {
  --spacing-density: 1;
}
```

```css [density-spacious.css]
:root {
  --spacing-density: 1.2;
}
```

:::
