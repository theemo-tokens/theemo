import { addComment } from 'node_modules/style-dictionary/lib/common/formatHelpers/createPropertyFormatter';
import {
  fileHeader,
  getReferences,
  outputReferencesFilter,
  usesReferences
} from 'style-dictionary/utils';

import type { TokenType } from '@theemo/tokens';
import type { Config, Dictionary, TransformedToken } from 'style-dictionary';
import type { Format, LocalOptions } from 'style-dictionary/types';

const CSS_TYPE_MAPPING: Partial<Record<TokenType, string>> = {
  color: 'color',
  number: 'number',
  dimension: 'dimension',
  duration: 'time'
};

function tokenTypeToCSSType(type: TokenType): string {
  return CSS_TYPE_MAPPING[type] ?? '';
}

function createCSSPropertyFormatter(dictionary: Dictionary, options: Config & LocalOptions) {
  const {
    outputReferences = false,
    // outputReferenceFallbacks = false,
    // format,
    // formatting = {},
    // themeable = false,
    usesDtcg = false
  } = options;

  const { tokens, unfilteredTokens } = dictionary;

  return (token: TransformedToken) => {
    let value = (token.value ?? token.$value) as string;
    // const originalValue = token.original.value ?? token.original.value;

    // const shouldOutputRef =
    //   usesReferences(originalValue) &&
    //   (typeof outputReferences === 'function'
    //     ? outputReferencesFilter(token, { dictionary, usesDtcg })
    //     : outputReferences);

    // if (shouldOutputRef) {
    //   // Formats that use this function expect `value` to be a string
    //   // or else you will get '[object Object]' in the output
    //   const refs = getReferences(
    //     originalValue,
    //     tokens,
    //     { unfilteredTokens, warnImmediately: false },
    //     []
    //   );

    //   // original can either be an object value, which requires transitive value transformation in web CSS formats
    //   // or a different (primitive) type, meaning it can be stringified.
    //   const originalIsObject = typeof originalValue === 'object' && originalValue !== null;

    //   if (!originalIsObject) {
    //     // TODO: find a better way to deal with object-value tokens and outputting refs
    //     // e.g. perhaps it is safer not to output refs when the value is transformed to a non-object
    //     // for example for CSS-like formats we always flatten to e.g. strings

    //     // when original is object value, we replace value by matching ref.value and putting a var instead.
    //     // Due to the original.value being an object, it requires transformation, so undoing the transformation
    //     // by replacing value with original.value is not possible. (this is the early v3 approach to outputting refs)

    //     // when original is string value, we replace value by matching original.value and putting a var instead
    //     // this is more friendly to transitive transforms that transform the string values (v4 way of outputting refs)
    //     value = originalValue;
    //   }

    //   refs.forEach((ref) => {
    //     // value should be a string that contains the resolved reference
    //     // because Style Dictionary resolved this in the resolution step.
    //     // Here we are undoing that by replacing the value with
    //     // the reference's name
    //     if (
    //       (Object.hasOwn(ref, 'value') || Object.hasOwn(ref, '$value')) &&
    //       Object.hasOwn(ref, 'name')
    //     ) {
    //       const refVal = ref.value ?? ref.$value;
    //       const replaceFunc = function () {
    //         return `var(--${ref.name}, ${refVal})`;
    //       };

    //       // TODO: add test
    //       // technically speaking a reference can be made to a number or boolean token, in this case we stringify it first
    //       value = `${value}`.replace(
    //         originalIsObject ? refVal : new RegExp(`{${ref.path.join('\\.')}(\\.\\$?value)?}`, 'g'),
    //         replaceFunc
    //       );
    //     }
    //   });
    // }

    const type = (token.type ?? token.$type) as TokenType;
    let output = `@property --${token.name} {\n  syntax: "<${tokenTypeToCSSType(type)}>";\n  inherits: true;\n  initial-value: ${value};\n}`;

    const comment = (token.description ?? token.$description ?? token.comment) as string;

    if (comment /*&& commentStyle !== none*/) {
      output = addComment(output, comment, { commentStyle: 'long', commentPosition: 'above' });
    }

    return output;
  };
}

export const cssPropertiesFormater: Format = {
  name: 'css/properties',
  format: async ({ dictionary, file, options }) => {
    const header = await fileHeader({ file });

    const formatIntoProperty = createCSSPropertyFormatter(dictionary, options);
    const properties = dictionary.allTokens.map(formatIntoProperty).join('\n\n');

    return [header, properties].filter(Boolean).join('\n');
  }
};
