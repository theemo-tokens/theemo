import { findConstrainedValue, isColor, isConstrainedValue } from '@theemo/tokens';

import type { ConstrainedValue, Token, TokenType } from '@theemo/tokens';
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

function getColorSchemeValues(token: TransformedToken) {
  const value = token.value as ConstrainedValue<TokenType>;

  return {
    light: findValueByFeature(value, 'color-scheme', 'light'),
    dark: findValueByFeature(value, 'color-scheme', 'dark')
  };
}

function transform(token: TransformedToken) {
  const { light, dark } = getColorSchemeValues(token);

  if (light && dark) {
    return `light-dark(${light}, ${dark})`;
  }

  return '';
}

function filter(token: TransformedToken) {
  if (isColor(token as Token) && isConstrainedValue(token.original.value)) {
    const { light, dark } = getColorSchemeValues(token);

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
  transitive: true,
  filter,
  // @ts-expect-error for backwards compatibility
  matcher: filter,
  transformer: transform,
  transform
};
