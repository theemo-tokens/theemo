import { isShadow } from '@theemo/tokens';

import type { ShadowValue, ShadowValueSingular, Token } from '@theemo/tokens';
import type { TransformedToken } from 'style-dictionary';
import type { Transform } from 'style-dictionary/types';

function transformShadow(value: ShadowValueSingular) {
  return `${value.offsetX} ${value.offsetY} ${value.blur} ${value.spread} ${value.color}`
    .trim()
    .replace(/\s\s+/g, ' ');
}

function transform(token: TransformedToken) {
  const value = token.value as ShadowValue;

  if (Array.isArray(value)) {
    return value.map(transformShadow).join(', ');
  }

  return transformShadow(value);
}

/**
 * Convert a `shadow` token to a value that can be used with the css `box-shadow` property
 *
 * @see [Extending Style Dictionary](https://theemo.io/sync/style-dictionary/extensions)
 */
export const shadowCssTransform: Transform = {
  name: 'shadow/css',
  type: 'value',
  transitive: true,
  filter: (token) => isShadow(token as Token),
  // @ts-expect-error for backwards compatibility
  matcher: (token: TransformedToken) => isShadow(token as Token),
  transformer: transform,
  transform
};
