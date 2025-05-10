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

function createCSSPropertyFormatter() {
  return (token: TransformedToken) => {
    let value = (token.value ?? token.$value) as string;

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
  format: async ({ dictionary, file }) => {
    const header = await fileHeader({ file });

    const formatIntoProperty = createCSSPropertyFormatter();
    const properties = dictionary.allTokens.map(formatIntoProperty).join('\n\n');

    return [header, properties].filter(Boolean).join('\n');
  }
};
