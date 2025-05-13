# Transforms

## `name/path/kebab`

Transforms the canonical name of a token (with `.` as separator) into kebap case
(using `-` as separator)

```ts
import { namePathKebab } from '@theemo/style-dictionary';

StyleDictionary.registerTransform(namePathKebab);

export default {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transforms: ['name/path/kebab']
    }
  }
};
```

::: info

- [API Docs](../../../api/@theemo/style-dictionary/variables/namePathKebabTransform.md)

:::

## `attribute/constraints`

## `value/resolve-constraint`

A constrained value is not readable for Style Dictionary, this transform returns
the actual value based on the given constraint for a platform.

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

Manual Registration:

```ts
import { theemoValueTransform } from '@theemo/style-dictionary';

StyleDictionary.registerTransform(theemoValueTransform);

export default {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      constraints: {
        features: {
          'color-scheme': 'light'
        }
      },
      transforms: ['theemo/value']
    }
  }
};
```

::: info

- [API Docs](../../../api/@theemo/style-dictionary/variables/theemoValueTransform.md)

:::

## `color/light-dark-css`

## `color/theemo`

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

## `typography/css`

Turns a `typography` token type and turns it into a CSS `font` declaration.

Manual Registration:

```ts
import { typographyCssTransform } from '@theemo/style-dictionary';

styleDictionary.registerTransform({
  name: 'typography/css',
  ...typographyCssTransform
});
```

## `shadow/css`

Turns a `shadow` token type and turns it into a CSS `box-shadow` declaration.

Manual Registration:

```ts
import { shadowCssTransform } from '@theemo/style-dictionary';

styleDictionary.registerTransform({
  name: 'shadow/css',
  ...shadowCssTransform
});
```
