# Transforms

## `attribute/constraints`

Copies constraints from platform to the token, so they are available for
filtering.

Manual Registration:

```js [config.js] twoslash
import StyleDictionary from 'style-dictionary';
import { attributeConstraintsTransform } from '@theemo/style-dictionary';

StyleDictionary.registerTransform(attributeConstraintsTransform);

export default {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transforms: ['attribute/constraints']
    }
  }
};
```

::: info

- [API Docs](../../../api/@theemo/style-dictionary/variables/attributeConstraintsTransform.md)

:::

## `value/resolve-constraint`

A constrained value is not readable for Style Dictionary, this transform returns
the actual value based on the given constraint for a platform.

Turning this:

```json [token]
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

```json [token]
{
  "$value": "#12544a",
  "$type": "color"
}
```

Manual Registration:

```js [config.js] twoslash
import StyleDictionary from 'style-dictionary';
import { valueResolveConstraintTransform } from '@theemo/style-dictionary';

StyleDictionary.registerTransform(valueResolveConstraintTransform);

export default {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      constraints: {
        features: {
          'color-scheme': 'light'
        }
      },
      transforms: ['value/resolve-constraint']
    }
  }
};
```

::: info

- [API Docs](../../../api/@theemo/style-dictionary/variables/valueResolveConstraintTransform.md)

:::

## `color/css/light-dark`

Will turn your token into the CSS `light-dark()` function, when a token supports
`light` and `dark` `color-scheme` constraint.

Turning this:

```json [token]
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

```css
:root {
  --token-name: light-dark(#12544a, #80e5d6);
}
```

## `color/transforms`

Given your value is applying transformations (coming directly from Figma with
the Theemo Figma Plugin), this transforms handles them.

Computing this formula:

```json [token]
{
  "$value": { 
    "value": "#f00",
    "transforms": {
      "hue": 180
    }
  },
  "$type": "color"
}
```

to:

```json [token]
{
  "$value": "#ff0800",
  "$type": "color"
}
```

you can use the `useCSSColorTransform` option to turn this into the CSS color
function applying the tranform:

```json [token]
{
  "$value": "hsl(from red calc(h + 180) s l)",
  "$type": "color"
}
```

Manual Registration:

```js [config.js] twoslash
import StyleDictionary from 'style-dictionary';
import { colorTransform } from '@theemo/style-dictionary';

StyleDictionary.registerTransform(colorTransform);

export default {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      options: {
        useCSSColorTransform: true
      },
      transforms: ['color/transforms']
    }
  }
};
```

::: info

- [API Docs](../../../api/@theemo/style-dictionary/variables/colorTransform.md)

:::
