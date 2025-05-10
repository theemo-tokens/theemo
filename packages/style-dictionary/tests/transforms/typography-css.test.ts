import { expect, test } from 'vitest';

import { transformTypographyCss } from '../../src/transforms/typography-css';
import { toTransformedToken } from '../-utils';

test('transformTypographyCss()', () => {
  expect(
    transformTypographyCss(
      toTransformedToken({
        value: {
          fontWeight: '400',
          fontSize: '32px',
          lineHeight: '48px',
          fontFamily: 'Comic Sans'
        }
      })
    )
  ).toBe('400 32px/48px "Comic Sans"');

  expect(
    transformTypographyCss(
      toTransformedToken({
        value: {
          fontSize: '32px',
          lineHeight: '48px',
          fontFamily: 'Comic Sans'
        }
      })
    )
  ).toBe('32px/48px "Comic Sans"');

  expect(
    transformTypographyCss(
      toTransformedToken({
        value: {
          fontSize: '32px',
          fontFamily: 'Comic Sans'
        }
      })
    )
  ).toBe('32px "Comic Sans"');
});
