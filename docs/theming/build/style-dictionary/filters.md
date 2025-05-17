# Filters

These filters are designed to work with the metadata Theemo attaches to a Token.
Helpful to shape the platforms in Style Dictionary.

## `isComputedToken()` / `isNoComputedToken()`

Checks whether a token contains a transform.

A computed token:

```json [tokens.json]
{
  "$value": {
    "value": "#ee00aa",
    "transforms": {
      "alpha": -10
    }
  },
  "$type": "color"
}
```

Usage:

```js [config.js] twoslash
import StyleDictionary from 'style-dictionary';
import { isComputedToken } from '@theemo/style-dictionary';

export default {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      files: [
        {
          format: 'css/variables',
          destination: 'computed-tokens.css',
          filter: isComputedToken
        }
      ]
    }
  }
};
```

::: info

- [API Docs: `isComputedToken()`](../../../api/@theemo/style-dictionary/functions/isComputedToken.md)
- [API Docs: `isNoComputedToken()`](../../../api/@theemo/style-dictionary/functions/isNoComputedToken.md)

:::

## `isConstrainedToken()` / `isNoConstrainedToken()`

Checks whether a token contains a transform.

A constrained token:

```json [tokens.json]
{
  "$value": {
    "value": "#ff0088", 
    "features": { 
      "color-scheme": "light" 
    }
  },
  "$type": "color"
}
```

Usage:

```js [config.js] twoslash
import StyleDictionary from 'style-dictionary';
import { isConstrainedToken } from '@theemo/style-dictionary';

export default {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      files: [
        {
          format: 'css/variables',
          destination: 'constrained-tokens.css',
          filter: isConstrainedToken
        }
      ]
    }
  }
};
```

::: info

- [API Docs: `isConstrainedToken()`](../../../api/@theemo/style-dictionary/functions/isConstrainedToken.md)
- [API Docs: `isNoConstrainedToken()`](../../../api/@theemo/style-dictionary/functions/isNoConstrainedToken.md)

:::

## `isConstrainedByPlatform()`

When platform constraints are added to a token with
[`attribute/constraints`](transforms.md#attributeconstraints), then you can use
`isConstrainedByPlatform()` to filter for them.

Usage:

```js [config.js] twoslash
import StyleDictionary from 'style-dictionary';
import { isConstrainedByPlatform } from '@theemo/style-dictionary';

export default {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      constraints: {
        features: {
          'color-scheme': 'light'
        }
      },
      files: [
        {
          format: 'css/variables',
          destination: 'constrained-tokens.css',
          filter: isConstrainedByPlatform
        }
      ]
    }
  }
};
```

::: info

- [API Docs](../../../api/@theemo/style-dictionary/functions/isConstrainedByPlatform.md)

:::

## `isCSSProperty()` / `isNoCSSProperty()`

Checks whether a token can be formatted into a CSS `@property`. Use it in
combination with the [`css/properties`](./formats.md#cssproperties) formatter.

Usage:

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

::: info

- [API Docs: `isCSSProperty()`](../../../api/@theemo/style-dictionary/functions/isCSSProperty.md)
- [API Docs: `isNoCSSProperty()`](../../../api/@theemo/style-dictionary/functions/isNoCSSProperty.md)

:::

## `isReferenceToken()` / `isNoReferenceToken()`

Check wether a token references another value.

Usage:

```js [config.js] twoslash
import StyleDictionary from 'style-dictionary';
import { isNoReferenceToken } from '@theemo/style-dictionary';

export default {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      files: [
        {
          format: 'css/variables',
          destination: 'raw-tokens.css',
          filter: isNoReferenceToken
        }
      ]
    }
  }
};
```

::: info

- [API Docs: `isReferenceToken()`](../../../api/@theemo/style-dictionary/functions/isReferenceToken.md)
- [API Docs: `isNoReferenceToken()`](../../../api/@theemo/style-dictionary/functions/isNoReferenceToken.md)

:::

## `matchesConstraints()`

When you want to filter for any constraints (free from platform constraints),
you can make yourself a filter for that.

Usage:

```js [config.js] twoslash
import StyleDictionary from 'style-dictionary';
import { matchesConstraints } from '@theemo/style-dictionary';

export default {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      files: [
        {
          format: 'css/variables',
          destination: 'raw-tokens.css',
          filter: (token) => matchesConstraints(token, {
            features: {
              'density': 'spacious'
            }
          })
        }
      ]
    }
  }
};
```

::: info

- [API Docs](../../../api/@theemo/style-dictionary/functions/matchesConstraints.md)

:::
