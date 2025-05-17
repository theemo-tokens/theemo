import type { PreprocessedTokens } from 'style-dictionary';
import type { DesignToken, Preprocessor } from 'style-dictionary/types';

function copyDollarField(object: Record<string, PreprocessedTokens | DesignToken>) {
  for (const [key, value] of Object.entries(object)) {
    if (key.startsWith('$')) {
      object[key.slice(1)] = value;
    }

    if (typeof value === 'object') {
      copyDollarField(object[key]);
    }
  }
}

/**
 * Style Dictionary is parsing tokens according to the DTCG specification, for
 * which [token properties are prefixed with the `$`
 * sign](https://tr.designtokens.org/format/#additional-group-properties), eg.
 * `$value`.
 * Even in the parsed form, these persist as `TransformedToken.$value`. However,
 * that breaks compatibility with other token libraries, that work with
 * `Token.value`, such as our own `@theemo/tokens` package.
 *
 * For ecosystem compatibility, the `theemo/token` preprocessor copies all
 * fields starting with `$` to a non-`$` field.
 *
 * @example
 *
 * Usage:
 *
 * ```js
 * import StyleDictionary from 'style-dictionary';
 * import { theemoTokenPreprocessor } from '@theemo/style-dictionary';
 *
 * styleDictionary.registerPreprocessor(theemoTokenPreprocessor);
 *
 * export default {
 *   source: ['tokens/**\/*.json'],
 *   preprocessors: ['theemo/token']
 * };
 * ```
 */
export const theemoTokenPreprocessor: Preprocessor = {
  name: 'theemo/token',
  preprocessor: (dictionary) => {
    copyDollarField(dictionary);

    return dictionary;
  }
};
