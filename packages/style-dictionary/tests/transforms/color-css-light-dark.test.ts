import { expect, test } from 'vitest';

import { transformColorLightDark } from '../../src/transforms/color-css-light-dark';
import { toTransformedToken } from '../-utils';

test('transformColorLightDark()', () => {
  expect(
    transformColorLightDark(
      toTransformedToken({
        value: [
          {
            value: 'white',
            features: {
              'color-scheme': 'dark'
            }
          },
          {
            value: 'black',
            features: {
              'color-scheme': 'light'
            }
          }
        ]
      })
    )
  ).toBe('light-dark(black, white)');

  expect(
    transformColorLightDark(
      toTransformedToken({
        value: [
          {
            value: 'white',
            features: {
              'color-scheme': 'dark'
            }
          }
        ]
      })
    )
  ).toBe('');
});
