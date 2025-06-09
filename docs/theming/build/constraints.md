# Constraints

Conversion for tokens with [constrained
values](../../design-tokens/internals.md#constrained-values) will be explained
here. The idea is to use a Style Dictionary platform for each constraint, which
also means, there will be one CSS generated per such platform.

Uses:

- [`isConstrainedByPlatform`
  filter](./style-dictionary/filters.md#isconstrainedbyplatform)

## Input

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

## Configuration

In order to filter for tokens, we will set the `constraints` on the platform
itself and then use the `isConstrainedByPlatform()` to match tokens against them.

```js [config.js] {22-26,35}
import StyleDictionary from 'style-dictionary';

import {
  isConstrainedByPlatform,
  registerTheemo
} from '@theemo/style-dictionary';

registerTheemo(StyleDictionary);

/** @type import("style-dictionary/types").Config */
const config = {
  source: ['tokens/**/*.json'],
  preprocessors: ['theemo/token'],
  platforms: {
    css: {
      // ...
    },
    // constrained tokens (to combine them later under given selectors)
    'density-comfortable': {
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
          destination: `density-comfortable.css`,
          filter: isConstrainedByPlatform
        }
      ]
    }
  }
};

export default config;
```

This is apparently for _one_ constraint match. Usually there are more such
values, so it is prime candidate to turn these into functions:

```js [config.js]
import StyleDictionary from 'style-dictionary';

import {
  isConstrainedByPlatform,
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
const config = {
  source: ['tokens/**/*.json'],
  preprocessors: ['theemo/token'],
  platforms: {
    css: {
      // ...
    },
    // constrained tokens (to combine them later under given selectors)
    'density-comfortable': makeDensityPlatform('comfortable'),
    'density-spacious': makeDensityPlatform('spacious'),
    'density-compact': makeDensityPlatform('compact')
  }
};

export default config;
```

## Output

::: code-group

```css [density-compact.css]
:root {
  --spacing-density: 0.8;
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

TODO: link to configure this for `theemo build`
