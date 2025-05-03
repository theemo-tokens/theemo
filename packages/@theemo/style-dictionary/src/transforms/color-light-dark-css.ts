import { findConstrainedValue, isColor, isConstrainedValue } from '@theemo/tokens';

import type { ConstrainedValue, Token, TokenType, TokenValue } from '@theemo/tokens';
import type { TransformedToken } from 'style-dictionary';
import type { Transform } from 'style-dictionary/types';

function findValueByFeature(
  value: ConstrainedValue<TokenType> | ConstrainedValue<TokenType>[],
  featureName: string,
  featureValue: string
): string | undefined {
  const val = findConstrainedValue(value, { features: { [featureName]: featureValue } });

  if (val) {
    return val.value as string;
  }

  return undefined;
}

function transform(token: TransformedToken) {
  const value = token.value as ConstrainedValue<'color'>;

  const light = findValueByFeature(value, 'color-scheme', 'light');
  const dark = findValueByFeature(value, 'color-scheme', 'dark');

  // console.log(token.name, light, dark);

  if (light && dark) {
    return `light-dark(${light}, ${dark})`;
  }

  return '';
}

function filter(token: TransformedToken) {
  // console.log(token, isColor(token as Token), isConstrainedValue(token.value));

  const value = token.value as TokenValue<TokenType>;

  if (isColor(token as Token) && isConstrainedValue(value)) {
    const light = findValueByFeature(value, 'color-scheme', 'light');
    const dark = findValueByFeature(value, 'color-scheme', 'dark');

    return Boolean(light && dark);
  }

  return false;
}

/**
 * Convert a constrained `color` token to a value that uses `light-dark()` CSS function
 *
 * @see [Extending Style Dictionary](https://theemo.io/sync/style-dictionary/extensions)
 */
export const colorLightDarkCssTransform: Transform = {
  name: 'color/light-dark-css',
  type: 'value',
  filter,
  // @ts-expect-error for backwards compatibility
  matcher: filter,
  transformer: transform,
  transform
};
