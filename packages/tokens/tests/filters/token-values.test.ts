import { describe, expect, test } from 'vitest';

import { isComputedValue, isConstrainedValue, matchesConstrainedValue } from '../../src';

describe('filter token values', () => {
  describe('isComputedValue', () => {
    test('with transforms present', () => {
      expect(isComputedValue({ value: '#ff0088', transforms: { alpha: -10 } })).toBeTruthy();
    });

    test('value array with transforms present', () => {
      expect(
        isComputedValue([
          { value: '#ff0088', transforms: { alpha: -10 } },
          { value: '#8800FF', transforms: { hue: -10 } }
        ])
      ).toBeTruthy();
    });

    test('primitive value is not', () => {
      expect(isComputedValue('#ff0088')).toBeFalsy();
    });
  });

  describe('isConstrainedValue', () => {
    test('with features', () => {
      expect(
        isConstrainedValue({ value: '#ff0088', features: { 'color-scheme': 'light' } })
      ).toBeTruthy();
    });

    test('value array with features', () => {
      expect(
        isConstrainedValue([
          { value: '#ff0088', features: { 'color-scheme': 'light' } },

          { value: '#9900ff', features: { 'color-scheme': 'dark' } }
        ])
      ).toBeTruthy();
    });

    test('with scope', () => {
      expect(isConstrainedValue({ value: '#ff0088', scope: 'spotlight' })).toBeTruthy();
    });

    test('primitive value is not', () => {
      expect(isConstrainedValue('#ff0088')).toBeFalsy();
    });
  });

  describe('matchesConstrainedValue', () => {
    test('matching on feature', () => {
      expect(
        matchesConstrainedValue(
          { value: '#ff0088', features: { 'color-scheme': 'light' } },

          { features: { 'color-scheme': 'light' } }
        )
      ).toBeTruthy();
    });

    test('matching on feature array', () => {
      expect(
        matchesConstrainedValue(
          { value: '#ff0088', features: { 'color-scheme': 'light' } },

          { features: { 'color-scheme': ['light', 'dark'] } }
        )
      ).toBeTruthy();

      expect(
        matchesConstrainedValue(
          { value: '#ff0088', features: { 'color-scheme': 'light' } },

          { features: { 'color-scheme': ['dark'] } }
        )
      ).toBeFalsy();
    });

    test('value array, matching one by feature', () => {
      expect(
        matchesConstrainedValue(
          [
            { value: '#ff0088', features: { 'color-scheme': 'light' } },

            { value: '#9900ff', features: { 'color-scheme': 'dark' } }
          ],

          { features: { 'color-scheme': 'light' } }
        )
      ).toBeTruthy();
    });

    test('feature is not matching a scope', () => {
      expect(
        matchesConstrainedValue(
          { value: '#ff0088', scope: 'spotlight' },

          { features: { 'color-scheme': 'light' } }
        )
      ).toBeFalsy();
    });

    test('matching on scope', () => {
      expect(
        matchesConstrainedValue({ value: '#ff0088', scope: 'spotlight' }, { scope: 'spotlight' })
      ).toBeTruthy();
    });

    test('primitive value is not matching', () => {
      expect(matchesConstrainedValue('#ff0088', {})).toBeFalsy();
    });
  });
});
