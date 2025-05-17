import { addComment } from 'node_modules/style-dictionary/lib/common/formatHelpers/createPropertyFormatter';
import { fileHeader } from 'style-dictionary/utils';

import type { TokenType } from '@theemo/tokens';
import type { TransformedToken } from 'style-dictionary';
import type { Format } from 'style-dictionary/types';

const CSS_TYPE_MAPPING: Partial<Record<TokenType, string>> = {
  color: 'color',
  number: 'number',
  dimension: 'length',
  duration: 'time'
};

function tokenTypeToCSSType(type: TokenType): string {
  return CSS_TYPE_MAPPING[type] ?? '';
}

export function formatTokenIntoCSSProperty(token: TransformedToken): string {
  let value = (token.value ?? token.$value) as string;

  const type = (token.type ?? token.$type) as TokenType;
  let output = `@property --${token.name} {\n  syntax: "<${tokenTypeToCSSType(type)}>";\n  inherits: true;\n  initial-value: ${value};\n}`;

  const comment = (token.description ?? token.$description ?? token.comment) as string;

  if (comment /*&& commentStyle !== none*/) {
    output = addComment(output, comment, { commentStyle: 'long', commentPosition: 'above' });
  }

  return output;
}

/**
 * Creates CSS `@property` tokens with a registered `type` so CSS knows what to
 * do with your value. CSS `@property`'s represent the _raw_ value and as such cannot contain references. For this the `isCSSProperty()` filter is available
 * to verify only those tokens suitable for use as `@property` will pass.
 *
 * @example
 *
 * Usage:
 *
 * ```js
 * import StyleDictionary from 'style-dictionary';
 * import { isCSSProperty, cssPropertiesFormater } from '@theemo/style-dictionary';
 *
 * StyleDictionary.registerFormat(cssPropertiesFormater);
 *
 * export default {
 *   source: ['tokens/**\/*.json'],
 *   platforms: {
 *     css: {
 *       files: [
 *         {
 *           format: 'css/properties',
 *           destination: 'properties.css',
 *           filter: isCSSProperty
 *         }
 *       ]
 *     }
 *   }
 * };
 * ```
 *
 * @example
 *
 * Output:
 *
 * ```css
 * @property --palette-negative-500 {
 *   syntax: "<color>";
 *   inherits: true;
 *   initial-value: #a517e8;
 * }
 *
 * @property --sizing-base {
 *   syntax: "<length>";
 *   inherits: true;
 *   initial-value: 1em;
 * }
 *
 * @property --sizing-ratio {
 *   syntax: "<number>";
 *   inherits: true;
 *   initial-value: 1.3;
 * }
 * ```
 */
export const cssPropertiesFormater: Format = {
  name: 'css/properties',
  format: async ({ dictionary, file }) => {
    const header = await fileHeader({ file });

    const properties = dictionary.allTokens.map(formatTokenIntoCSSProperty).join('\n\n');

    return [header, properties].filter(Boolean).join('\n');
  }
};
