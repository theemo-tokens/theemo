# Extending Style Dictionary

Style Dictionary allows extending the build platform. Theemo provides such
extensions to make the format in which tokens are generated understandable to
Style Dictionary as well as assisting with transformation to produce the right
format.

## Register Theemo Extensions

Registering Theemo in the [config for Style
Dictionary](https://amzn.github.io/style-dictionary/#/config) (which by
default is `config.js`):

```js
// config.js
const StyleDictionary = require('style-dictionary');
const { registerTheemo } = require('@theemo/style-dictionary');

registerTheemo(StyleDictionary);
```

## Example: Minimalistic Theme

In a straight forward system, without any constraints being used, the
configuration for Style Dictionary is fairly small and straight forward:

```js
const StyleDictionary = require('style-dictionary');
const { registerTheemo } = require('@theemo/style-dictionary');

registerTheemo(StyleDictionary);

module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    base: {
      transformGroup: 'theemo',
      buildPath: 'dist/',
      files: [
        {
          format: 'css/variables',
          destination: 'theemo.css',
        }
      ]
    }
  }
};
```

After registration use the
[`transformGroup`](https://amzn.github.io/style-dictionary/#/transform_groups)
`'theemo'` to load all registered transforms.

## Example: Theme with Features

For working with features (or constraints), Danny Banks gives a tutorial on [how
to deal with dark mode in Style
Dictionary](https://dbanks.design/blog/dark-mode-with-style-dictionary/) in
which he mentions the _Multi-file_ and _Single-token_ method. With the generated
constraints in the [reader](../reader.md) step, the _Single-token_ method is
favored and supported by provided extensions.

In the example here, a color-scheme feature with `light` and `dark` options is
generated. For reference here is how a token looks that supports both options:

```json
{
  "$value": [
    {
      "value": "#12544a",
      "features": {
        "color-scheme": "light"
      }
    },
    {
      "value": "#80e5d6",
      "features": {
        "color-scheme": "dark"
      }
    }
  ],
  "$type": "color"
}
```

That is, the build is going to create three files: `base.css`, `light.css` and
`dark.css` (and afterwards use [theming](../../theming.md) to combine them all
together into one asset).

We need two sorts of filters for the Style Dictionary build system:

1. The `base.css` file shall contain all tokens not having any constraints
2. The `light.css` and `dark.css` files shall contain tokens that match the
   given constraint.

Theemo provides `makeConstrainedFilter()` and `isConstrainedValue()` functions
for this, that support this.
For the latter also install the `@theemo/tokens` package if not already done.

Here is the final config:

```js
const StyleDictionary = require('style-dictionary');
const { registerTheemo, makeConstrainedFilter } = require('@theemo/style-dictionary');
const { isConstrainedValue } = require('@theemo/tokens');

registerTheemo(StyleDictionary);

module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    base: {
      transformGroup: 'theemo',
      buildPath: 'dist/',
      files: [
        {
          format: 'css/variables',
          destination: 'base.css',
          options: {
            outputReferences: true,
            showFileHeader: false
          },
          // we want all tokens without any constraints in the base file
          filter: (token) => {
            return !isConstrainedValue(token.value);
          }
        }
      ]
    },
    dark: {
      transformGroup: 'theemo',
      buildPath: 'dist/',
      // we want only tokens matching the `dark` color-scheme constraint
      constraints: {
        features: {
          'color-scheme': 'dark'
        }
      },
      files: [
        {
          format: 'css/variables',
          destination: 'dark.css',
          options: {
            outputReferences: true,
            showFileHeader: false
          },
          // filters do not have access to the `constraint` property above, so need to repeat here
          filter: makeConstrainedFilter({
            features: {
              'color-scheme': 'dark'
            }
          })
        }
      ]
    },
    light: {
      transformGroup: 'theemo',
      buildPath: 'dist/',
      // we want only tokens matching the `light` color-scheme constraint
      constraints: {
        features: {
          'color-scheme': 'light'
        }
      },
      files: [
        {
          format: 'css/variables',
          destination: 'light.css',
          options: {
            outputReferences: true,
            showFileHeader: false
          },
          // filters do not have access to the `constraint` property above, so need to repeat here
          filter: makeConstrainedFilter({
            features: {
              'color-scheme': 'light'
            }
          })
        }
      ]
    }
  }
};
```

## Provided Extensions

The total list of extension provided when using `registerTheemo()`.

::: info
A lot of this work has been done by [Lukas
Oppermann](https://lukasoppermann.com/) as part of
[`style-dictionary-utils`](https://github.com/lukasoppermann/style-dictionary-utils).
Necessary bits were copied over or slightly adjusted to work with Theemo. That
is to provide all of the transforms out-of-the-box from one provider (Theemo in
this case).

If you are in need for more transforms, please check the repository above.

Ideally, this somehow converges to some official destination. Currently the
specification is under heavy development and both parties are involved to find a solution.

Detailed Read: [W3C Design Tokens with Style Dictionary](https://lukasoppermann.medium.com/w3c-design-tokens-with-style-dictionary-f7ff5f2ba98c)
:::

### W3C Parser

The W3C parser is able to read the [W3C token format](https://tr.designtokens.org/format/).

It is part of `registerTheemo()` and currently not accessible outside.

::: info
See [Issue #725](https://github.com/theemo-tokens/theemo/issues/725)
:::

<!--
TODO: This somehow even works without this transform, please check

### Theemo Attribute Transforms

To make the constraints available for Style Dictionary, the `theemo/attributes`
transform can be used.

Manual Registration:

```ts
import { theemoAttributesTransform } from '@theemo/style-dictionary';

styleDictionary.registerTransform({
  name: 'theemo/attributes',
  ...theemoAttributesTransform
});
```
-->

### Name Transform

Transforms the canonical name of a token (with `.` as separator) into kebap case
(using `-` as separator)

```ts
import { namePathKebab } from '@theemo/style-dictionary';

styleDictionary.registerTransform({
  name: 'name/path/kebab',
  ...namePathKebab
});
```

### Theemo Value Transform

A constrained value is not readable for Style Dictionary, this transform returns
the actual value for a token to make it readable for Style Dictionary.

Turning this:

```json
{
  "$value": [
    {
      "value": "#12544a",
      "features": {
        "color-scheme": "light"
      }
    },
    {
      "value": "#80e5d6",
      "features": {
        "color-scheme": "dark"
      }
    }
  ],
  "$type": "color"
}
```

Into:

```json
{
  "$value": "#12544a",
  "$type": "color"
}
```

Given the constraints match a light color-scheme.

Manual Registration:

```ts
import { theemoValueTransform } from '@theemo/style-dictionary';

styleDictionary.registerTransform({
  name: 'theemo/value',
  ...theemoValueTransform
});
```

### Computed Color Transform

Given your value is applying transformations (coming directly from Figma with
the Theemo Figma Plugin), this transforms handles them.

Computing this formula:

```json
{
  "$value": { 
    "value": "#ff0088", 
    "transforms": { 
      "alpha": -10 
    } 
  },
  "$type": "color"
}
```

and resolving it into the final value.

Manual Registration:

```ts
import { theemoColorValueTransform } from '@theemo/style-dictionary';

styleDictionary.registerTransform({
  name: 'theemo/transform',
  ...theemoColorValueTransform
});
```

### Typography CSS Transform

Turns a `typography` token type and turns it into a CSS `font` declaration.

Manual Registration:

```ts
import { typographyCssTransform } from '@theemo/style-dictionary';

styleDictionary.registerTransform({
  name: 'typography/css',
  ...typographyCssTransform
});
```

### Shadow CSS Transform

Turns a `shadow` token type and turns it into a CSS `box-shadow` declaration.

Manual Registration:

```ts
import { shadowCssTransform } from '@theemo/style-dictionary';

styleDictionary.registerTransform({
  name: 'shadow/css',
  ...shadowCssTransform
});
```
