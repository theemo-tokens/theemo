# CSS `@property` Tokens

Style Dictionary by default ships with `css/variables` formatter to convert
tokens into CSS custom properties. The standard since then advanced and
introduced `@property` syntax for CSS, which basically are typed custom
properties, which then CSS can better understand and use much more appropriately
(eg. sound gradients).

Uses (provided by [registering theemo extensions](./style-dictionary.md#register-theemo-extensions)):

- [`css/properties` formatter](./style-dictionary/formats.md#css-properties)
- [`isCSSProperty` filter](./style-dictionary/filters.md#iscssproperty-isnocssproperty)

## Input

```json [tokens.json]
{
  "palette": {
    "brand": {
      "red": {
        "$value": "#e41b1b",
        "$description": "",
        "$type": "color"
      }
    }
  },
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

## Configuration

```js [config.js]
import StyleDictionary from 'style-dictionary';

import {
  isCSSProperty
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
        }
      ]
    },
  }
};

export default config;
```

## Output

```css
@property --palette-brand-red {
  syntax: "<color>";
  inherits: true;
  initial-value: #e41b1b;
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
```
