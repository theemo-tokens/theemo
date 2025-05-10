import { expect, test } from 'vitest';

import { transformTheemoValue } from '../../src/transforms/theemo-value';
import { toTransformedToken } from '../-utils';

test('find constrained value in an array of values', () => {
  expect(
    transformTheemoValue(
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
      }),
      {
        constraints: {
          features: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'color-scheme': 'light'
          }
        }
      }
    )
  ).toBe('black');
});

test('find constrained value', () => {
  expect(
    transformTheemoValue(
      toTransformedToken({
        value: {
          value: 'white',
          features: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'color-scheme': 'dark'
          }
        }
      }),
      {
        constraints: {
          features: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'color-scheme': 'dark'
          }
        }
      }
    )
  ).toBe('white');
});

// tbh: I'm not sure if the original should be returned here?
// could be for the next pass though
test('no constrained value found, return original', () => {
  expect(
    transformTheemoValue(
      toTransformedToken({
        value: {
          value: 'white',
          features: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'color-scheme': 'dark'
          }
        }
      }),
      {
        constraints: {
          features: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'color-contrast': 'more'
          }
        }
      }
    )
  ).toStrictEqual({
    value: 'white',
    features: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'color-scheme': 'dark'
    }
  });
});

test('find computed and constrained value', () => {
  expect(
    transformTheemoValue(
      toTransformedToken({
        value: {
          value: 'white',
          transforms: {
            alpha: -20
          },
          features: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'color-scheme': 'dark'
          }
        }
      }),
      {
        constraints: {
          features: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'color-scheme': 'dark'
          }
        }
      }
    )
  ).toStrictEqual({
    value: 'white',
    transforms: {
      alpha: -20
    },
    features: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'color-scheme': 'dark'
    }
  });
});
