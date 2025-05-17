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

export function transformColorLightDark(token: TransformedToken): string {
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
 * Will turn your token into the CSS `light-dark()` function, when a token
 * supports `light` and `dark` `color-scheme` constraint.
 *
 * @example
 *
 * Turning this:
 *
 * ```json
 * {
 *   "$value": [
 *     {
 *       "value": "#12544a",
 *       "features": {
 *         "color-scheme": "light"
 *       }
 *     },
 *     {
 *       "value": "#80e5d6",
 *       "features": {
 *         "color-scheme": "dark"
 *       }
 *     }
 *   ],
 *   "$type": "color"
 * }
 * ```
 *
 * Into:
 *
 * ```css
 * :root {
 *   --token-name: light-dark(#12544a, #80e5d6);
 * }
 * ```
 */
export const colorCssLightDarkTransform: Transform = {
  name: 'color/css/light-dark',
  type: 'value',
  transitive: true,
  filter,
  // @ts-expect-error for backwards compatibility
  matcher: filter,
  transformer: transformColorLightDark,
  transform: transformColorLightDark
};
