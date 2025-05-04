import { usesReferences } from 'style-dictionary/utils';

import { isComputedValue, isConstrainedValue } from '@theemo/tokens';

import type { TokenType } from '@theemo/tokens';
import type { TransformedToken } from 'style-dictionary';

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Values_and_Units/CSS_data_types
 */
const CSS_PROPERTY_TYPES: TokenType[] = ['color', 'number', 'dimension', 'duration'];

export function isCSSProperty(token: TransformedToken): boolean {
  const type = (token.type ?? token.$type) as TokenType;

  return (
    !usesReferences(token.original.value) &&
    !isConstrainedValue(token.original.value) &&
    !isComputedValue(token.original.value) &&
    CSS_PROPERTY_TYPES.includes(type)
  );
}

export function isNoCSSProperty(token: TransformedToken): boolean {
  return !isCSSProperty(token);
}
