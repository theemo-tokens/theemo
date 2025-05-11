import { describe, expect, test } from 'vitest';

import { isBrowserFeature } from '../../src';
import { BrowserMechanic, validateFeature } from '../../src/features';

test('isBrowserFeature()', () => {
  expect(
    isBrowserFeature({
      name: 'color-scheme',
      options: ['light', 'dark'],
      browserFeature: 'color-scheme'
    })
  ).toBeTruthy();

  expect(
    isBrowserFeature({
      name: 'invalid-browser-feature',
      options: ['light', 'dark'],
      browserFeature: 'invalid-feature',
      defaultOption: 'lala'
    })
  ).toBeFalsy();

  expect(
    // @ts-expect-error testing invalid object
    isBrowserFeature({
      name: 'no-browser-feature',
      options: ['light', 'dark']
    })
  ).toBeFalsy();
});

describe('validateFeature()', () => {
  test('browser feature', () => {
    const browserFeature = validateFeature({
      name: 'browser-feature',
      options: ['light', 'dark'],
      browserFeature: 'color-scheme'
    });

    expect(browserFeature.success).toBeTruthy();
  });

  test('modal feature', () => {
    const modalFeature = validateFeature({
      name: 'modal-feature',
      options: ['smaller', 'normal', 'bigger'],
      defaultOption: 'normal'
    });

    expect(modalFeature.success).toBeTruthy();
  });

  test('invalid browser feature', () => {
    const invalidBrowserFeature = validateFeature({
      name: 'invalid-browser-feature',
      options: ['light', 'dark'],
      browserFeature: 'invalid-feature',
      defaultOption: 'purple'
    });

    expect(invalidBrowserFeature.success).toBeFalsy();
    expect(invalidBrowserFeature.errors).toStrictEqual([
      `Feature 'invalid-browser-feature' uses invalid browser mechanic: 'invalid-feature' does not exist. Supported values are: '${Object.values(BrowserMechanic).join("', ")}'`
    ]);
  });

  test('incomplete feature', () => {
    // @ts-expect-error testing invalid object
    const incompleteFeature = validateFeature({
      name: 'incomplete-feature',
      options: ['a', 'b']
    });

    expect(incompleteFeature.success).toBeFalsy();
    expect(incompleteFeature.errors).toStrictEqual([
      `Feature 'incomplete-feature' requires 'defaultOption' or 'browserFeature'`
    ]);
  });

  test('missing options', () => {
    // @ts-expect-error testing for an invalid type here
    const missingOptions = validateFeature({
      name: 'missing-options',
      browserFeature: 'color-scheme'
    });

    expect(missingOptions.success).toBeFalsy();
    expect(missingOptions.errors).toStrictEqual([`Feature 'missing-options' requires options`]);
  });

  test('no name', () => {
    // @ts-expect-error testing for an invalid type here
    const noNameFeature = validateFeature({
      options: ['a', 'b'],
      browserFeature: 'color-scheme'
    });

    expect(noNameFeature.success).toBeFalsy();
    expect(noNameFeature.errors).toStrictEqual(['Feature is missing a name']);
  });

  test('empty feature', () => {
    // @ts-expect-error testing for an invalid type here
    const emptyFeature = validateFeature({});

    expect(emptyFeature.success).toBeFalsy();
    expect(emptyFeature.errors).toStrictEqual([
      'Feature is missing a name',
      `Feature 'undefined' requires options`,
      `Feature 'undefined' requires 'defaultOption' or 'browserFeature'`
    ]);
  });
});
