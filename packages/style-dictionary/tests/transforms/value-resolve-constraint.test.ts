import { expect, test } from 'vitest';

import { resolveValueConstraint } from '../../src/transforms/value-resolve-constraint';
import { toTransformedToken } from '../-utils';

test('find constrained value in an array of values', () => {
  expect(
    resolveValueConstraint(
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
      }),
      {
        constraints: {
          features: {
            'color-scheme': 'light'
          }
        }
      }
    )
  ).toBe('black');
});

test('find constrained value', () => {
  expect(
    resolveValueConstraint(
      toTransformedToken({
        value: {
          value: 'white',
          features: {
            'color-scheme': 'dark'
          }
        }
      }),
      {
        constraints: {
          features: {
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
    resolveValueConstraint(
      toTransformedToken({
        value: {
          value: 'white',
          features: {
            'color-scheme': 'dark'
          }
        }
      }),
      {
        constraints: {
          features: {
            'color-contrast': 'more'
          }
        }
      }
    )
  ).toStrictEqual({
    value: 'white',
    features: {
      'color-scheme': 'dark'
    }
  });
});

test('find computed and constrained value', () => {
  expect(
    resolveValueConstraint(
      toTransformedToken({
        value: {
          value: 'white',
          transforms: {
            alpha: -20
          },
          features: {
            'color-scheme': 'dark'
          }
        }
      }),
      {
        constraints: {
          features: {
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
      'color-scheme': 'dark'
    }
  });
});
