import { usesReferences } from 'style-dictionary/utils';

import { isComputedValue, isConstrainedValue } from '@theemo/tokens';

import type { TokenType } from '@theemo/tokens';
import type { TransformedToken } from 'style-dictionary';

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Values_and_Units/CSS_data_types
 */
const CSS_PROPERTY_TYPES = new Set<TokenType>(['color', 'number', 'dimension', 'duration']);

/**
 * Checks whether a token can be formatted into a CSS `@property`. Use it in
 * combination with the `css/properties` formatter.
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
 * @param token the token in question
 * @returns `true` when the token can be formatted as `@property`, otherwise `false`
 */
export function isCSSProperty(token: TransformedToken): boolean {
  const type = (token.type ?? token.$type) as TokenType;

  return (
    !usesReferences(token.original.value) &&
    !isConstrainedValue(token.original.value) &&
    !isComputedValue(token.original.value) &&
    CSS_PROPERTY_TYPES.has(type)
  );
}

/**
 * Checks whether a token can NOT be formatted into a CSS `@property`. Use it in
 * combination with the `css/properties` formatter.
 *
 * @example
 *
 * Usage:
 *
 * ```js
 * import StyleDictionary from 'style-dictionary';
 * import { isNoCSSProperty, cssPropertiesFormater } from '@theemo/style-dictionary';
 *
 * StyleDictionary.registerFormat(cssPropertiesFormater);
 *
 * export default {
 *   source: ['tokens/**\/*.json'],
 *   platforms: {
 *     css: {
 *       files: [
 *         {
 *           format: 'css/variables',
 *           destination: 'vars.css',
 *           filter: isNoCSSProperty
 *         }
 *       ]
 *     }
 *   }
 * };
 * ```
 *
 * @param token the token in question
 * @returns `true` when the token can NOT be formatted as `@property`, otherwise `false`
 */
export function isNoCSSProperty(token: TransformedToken): boolean {
  return !isCSSProperty(token);
}
