import { expect, test } from 'vitest';

import {
  isConstrainedByPlatform,
  isConstrainedToken,
  isNoConstrainedToken,
  matchesConstraints
} from '../../src';
import { toTransformedToken } from '../-utils';

test('matchesConstraints()', () => {
  expect(
    matchesConstraints(
      toTransformedToken({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        value: { value: '#ff0088', features: { 'color-scheme': 'light' } }
      }),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      { features: { 'color-scheme': 'light' } }
    )
  ).toBeTruthy();

  expect(
    matchesConstraints(
      toTransformedToken({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        value: { value: '#ff0088', features: { 'color-scheme': 'light' } }
      }),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      { features: { 'color-scheme': ['light', 'dark'] } }
    )
  ).toBeTruthy();

  expect(
    matchesConstraints(
      toTransformedToken({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        value: { value: '#ff0088', features: { 'color-scheme': 'light' } }
      }),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      { features: { 'color-scheme': 'dark' } }
    )
  ).toBeFalsy();
});

test('isConstrainedToken()', () => {
  expect(
    isConstrainedToken(
      toTransformedToken({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        value: { value: '#ff0088', features: { 'color-scheme': 'light' } }
      })
    )
  ).toBeTruthy();

  expect(
    isConstrainedToken(
      toTransformedToken({
        value: '#ee00aa'
      })
    )
  ).toBeFalsy();
});

test('isNoConstrainedToken()', () => {
  expect(
    isNoConstrainedToken(
      toTransformedToken({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        value: { value: '#ff0088', features: { 'color-scheme': 'light' } }
      })
    )
  ).toBeFalsy();

  expect(
    isNoConstrainedToken(
      toTransformedToken({
        value: '#ee00aa'
      })
    )
  ).toBeTruthy();
});

test('isConstrainedByPlattform()', () => {
  expect(
    isConstrainedByPlatform(
      toTransformedToken({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        value: { value: '#ff0088', features: { 'color-scheme': 'light' } },
        attributes: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          constraints: { features: { 'color-scheme': 'light' } }
        }
      })
    )
  ).toBeTruthy();

  expect(
    isConstrainedByPlatform(
      toTransformedToken({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        value: { value: '#ff0088', features: { 'color-scheme': 'dark' } },
        attributes: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          constraints: { features: { 'color-scheme': 'light' } }
        }
      })
    )
  ).toBeFalsy();
});
