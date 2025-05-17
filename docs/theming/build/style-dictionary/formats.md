# Formats

## `css/properties`

Creates CSS `@property` tokens with a registered `type` so CSS knows what to do
with your value. CSS `@property`'s represent the _raw_ value and as such cannot
contain references. For this the `isCSSProperty()` filter is available to verify
only those tokens suitable for use as `@property` will pass.

```js [config.js] twoslash
import StyleDictionary from 'style-dictionary';
import { isCSSProperty, cssPropertiesFormater } from '@theemo/style-dictionary';

StyleDictionary.registerFormat(cssPropertiesFormater);

export default {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      files: [
        {
          format: 'css/properties',
          destination: 'properties.css',
          filter: isCSSProperty
        }
      ]
    }
  }
};
```

Example:

```css
@property --palette-negative-500 {
  syntax: "<color>";
  inherits: true;
  initial-value: #a517e8;
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

::: info

- [API Docs](../../../api/@theemo/style-dictionary/variables/cssPropertiesFormater.md)

:::
