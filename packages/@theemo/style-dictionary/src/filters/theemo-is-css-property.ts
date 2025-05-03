import { isComputedValue, isConstrainedValue } from '@theemo/tokens';

import type { TokenType } from '@theemo/tokens';
import type { TransformedToken } from 'style-dictionary';
import type { Filter } from 'style-dictionary/types';

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Values_and_Units/CSS_data_types
 */
const CSS_PROPERTY_TYPES: TokenType[] = ['color', 'number', 'dimension', 'duration'];

export function isCSSProperty(token: TransformedToken): boolean {
  const type = (token.type ?? token.$type) as TokenType;

  return (
    !isConstrainedValue(token.value) &&
    !isComputedValue(token.value) &&
    CSS_PROPERTY_TYPES.includes(type)
  );
}

export const theemoIsCssPropertyFilter: Filter = {
  name: 'theemo/is-css-property',
  // @ts-expect-error for backwards compatibility
  matcher: isCSSProperty,
  filter: isCSSProperty
};
