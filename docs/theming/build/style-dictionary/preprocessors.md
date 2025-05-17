# Preprocessors

## `theemo/token`

Style Dictionary is parsing tokens according to the DTCG specification, for
which [token properties are prefixed with the `$`
sign](https://tr.designtokens.org/format/#additional-group-properties), eg.
`$value`.
Even in the parsed form, these persist as `TransformedToken.$value`. However,
that breaks compatibility with other token libraries, that work with
`Token.value`, such as our own `@theemo/tokens` package.

For ecosystem compatibility, the `theemo/token` preprocessor copies all fields
starting with `$` to a non-`$` field.

Manual usage:

```js [config.js] twoslash
import StyleDictionary from 'style-dictionary';
import { theemoTokenPreprocessor } from '@theemo/style-dictionary';

styleDictionary.registerPreprocessor(theemoTokenPreprocessor);

export default {
  source: ['tokens/**/*.json'],
  preprocessors: ['theemo/token']
};
```

::: info

- [API Docs](../../../api/@theemo/style-dictionary/variables/theemoTokenPreprocessor.md)

:::
