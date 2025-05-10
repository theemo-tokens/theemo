import { isTypography } from '@theemo/tokens';

import type { Token, TypographyValue } from '@theemo/tokens';
import type { TransformedToken } from 'style-dictionary';
import type { Transform } from 'style-dictionary/types';

export function transformTypographyCss(token: TransformedToken): string {
  const value = token.value as TypographyValue;

  // font: (font-style) font-variant font-weight font-size/line-height font-family;
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  return `${value.fontWeight || ''} ${value.fontSize}${
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    value.lineHeight ? '/' + value.lineHeight : ''
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  } "${value.fontFamily}"`
    .trim()
    .replace(/\s\s+/g, ' ');
}

/**
 * Convert a W3C `typography` token to a value that can be used with the css `font` property
 *
 * @see [Extending Style Dictionary](https://theemo.io/sync/style-dictionary/extensions)
 */
export const typographyCssTransform: Transform = {
  name: 'typography/css',
  type: 'value',
  filter: (token) => isTypography(token as Token),
  // @ts-expect-error for backwards compatibility
  matcher: (token) => isTypography(token as Token),
  transformer: transformTypographyCss,
  transform: transformTypographyCss
};
