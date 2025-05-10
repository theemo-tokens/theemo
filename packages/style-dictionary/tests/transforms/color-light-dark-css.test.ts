import { expect, test } from 'vitest';

import { transformColorLightDark } from '../../src/transforms/color-light-dark-css';
import { toTransformedToken } from '../-utils';

test('transformColorLightDark()', () => {
  expect(
    transformColorLightDark(
      toTransformedToken({
        value: [
          {
            value: 'white',
            features: {
              // eslint-disable-next-line @typescript-eslint/naming-convention
              'color-scheme': 'dark'
            }
          },
          {
            value: 'black',
            features: {
              // eslint-disable-next-line @typescript-eslint/naming-convention
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
              // eslint-disable-next-line @typescript-eslint/naming-convention
              'color-scheme': 'dark'
            }
          }
        ]
      })
    )
  ).toBe('');
});
