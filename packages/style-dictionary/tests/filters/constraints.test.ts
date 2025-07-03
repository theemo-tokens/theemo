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
        value: { value: '#ff0088', features: { 'color-scheme': 'light' } }
      }),

      { features: { 'color-scheme': 'light' } }
    )
  ).toBeTruthy();

  expect(
    matchesConstraints(
      toTransformedToken({
        value: { value: '#ff0088', features: { 'color-scheme': 'light' } }
      }),

      { features: { 'color-scheme': ['light', 'dark'] } }
    )
  ).toBeTruthy();

  expect(
    matchesConstraints(
      toTransformedToken({
        value: { value: '#ff0088', features: { 'color-scheme': 'light' } }
      }),

      { features: { 'color-scheme': 'dark' } }
    )
  ).toBeFalsy();
});

test('isConstrainedToken()', () => {
  expect(
    isConstrainedToken(
      toTransformedToken({
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
        value: { value: '#ff0088', features: { 'color-scheme': 'light' } },
        attributes: {
          constraints: { features: { 'color-scheme': 'light' } }
        }
      })
    )
  ).toBeTruthy();

  expect(
    isConstrainedByPlatform(
      toTransformedToken({
        value: { value: '#ff0088', features: { 'color-scheme': 'dark' } },
        attributes: {
          constraints: { features: { 'color-scheme': 'light' } }
        }
      })
    )
  ).toBeFalsy();
});
