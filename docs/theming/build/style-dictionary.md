# Style Dictionary

Style Dictionary is great to turn your tokens into CSS and thanks to its open
architecture Theemo offers extensions to generate the right formats.

## Register Theemo Extensions

To use all provided extension, register them all at once in the [config for Style
Dictionary](https://styledictionary.com/reference/config/) (which by
default is `config.js`). Without any constraints being used, the
configuration for Style Dictionary is fairly small and straight forward:

```js [config.js] twoslash
import StyleDictionary from 'style-dictionary';
import { registerTheemo } from '@theemo/style-dictionary';

registerTheemo(StyleDictionary);

export default {
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
[`transformGroup`](https://styledictionary.com/reference/hooks/transform-groups/)
`'theemo'` to load all registered transforms.
