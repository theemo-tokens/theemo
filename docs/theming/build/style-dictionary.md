# Style Dictionary

Style Dictionary is great to turn your tokens into CSS and thanks to its open
architecture Theemo offers extensions to generate the right formats.

Style Dictionary can generate tokens for multiple platforms (CSS, Android, iOS)
but they can also be used to generate tokens for the _same platform_ but under
_different constraints_.

Find them here:

- [CSS `@property` Tokens](./css-at-property.md)
- [CSS Custom Properties & Color Scheme
  Tokens](./css-custom-properties-color-scheme.md)
- [CSS Color Transforms](./css-color-transforms.md)
- [Constrained Tokens](./constrained-tokens.md)

And see the [full example](example.md) to see all of them in action.

## Constrained Tokens

For converting tokens with multiple values (Theemo calls them [_constrained
values_](../../design-tokens/internals.md#constrained-values)) two practices
have been established for Style Dictionary: Multiple files (one for each
constraint) or single file tokens (with multiple values).

Here is a comparison:

| Criteria | Multi File | Single File |
| -------- | ---------- | ----------- |
| Knowledge | Knowledge is with the file itself (filename?) | Knowledge stays with the token |
| Reading | You see all tokens for one constraint | You see all constrained values for one token |
| Authoring | Better at changing values for one constraint | Better changing on a token-by-token basis |
| Building | Not all conversion of token into CSS are possible (knowledge is somewhere else) | All knowledge is available, every conversion is possible |

For most of the time multi vs. single file is a choice of personal flavor and
technology can greatly assisst here (using Figma, PenPot or Token Studio).
When it comes to token conversion into platform (eg CSS) values, the single file
approach shows its advantage, as all the knowledge needed to transform a token
already is present on the token.

Theemo supports the idea of constrained values and the provided
extensions bring this support into Style Dictionary.

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

With
[`registerTheemo()`](../../api/@theemo/style-dictionary/functions/registerTheemo.md)
you have access to the following:

- Preprocessors
  - [`theemo/token`](./style-dictionary/preprocessors.md#theemotoken) (Style Dictionary >= v4)
- Parsers
  - [W3C Parser](./style-dictionary/parsers.md#w3c-parser) (Style Dictionary < v4)
- Formats
  - [`css/properties`](./style-dictionary/formats.md#cssproperties)
- Transforms
  - [`attribute/constraints`](./style-dictionary/transforms.md#attributeconstraints)
  - [`value/resolve-constraint`](./style-dictionary/transforms.md#valueresolve-constraint)
  - [`color/transforms`](./style-dictionary/transforms.md#colortransforms)
  - [`color/light-dark-css`](./style-dictionary/transforms.md#colorcsslight-dark)
- Transform Groups
  - [`theemo`](./style-dictionary/transform-groups.md#theemo)
