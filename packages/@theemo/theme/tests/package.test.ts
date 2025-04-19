import { describe, expect, test } from 'vitest';

import { isTheemoPackage, validateTheemoPackage } from '../src';
import { loadThemePackage } from './helpers';

test('isTheemoPackage()', () => {
  expect(isTheemoPackage({ name: 'some-pkg' })).toBeFalsy();

  expect(isTheemoPackage({ keywords: ['theemo-theme'] })).toBeTruthy();
});

describe('validateTheemoPackage()', () => {
  test('ocean theme', async () => {
    const oceanTheme = await loadThemePackage('ocean-theme');
    const oceanValidation = validateTheemoPackage(oceanTheme);

    expect(oceanValidation.success).toBeTruthy();
  });

  test('no keyword', () => {
    const validation = validateTheemoPackage({
      name: 'no-theemo-file',
      theemo: {
        name: 'hi',
        file: 'theme.css'
      }
    });

    expect(validation.success).toBeFalsy();
    expect(validation.errors).toStrictEqual([
      `Package 'no-theemo-file' requires keyword 'theemo-theme'`
    ]);
  });

  test('no theme', () => {
    // @ts-expect-error testing for an invalid type here
    const validation = validateTheemoPackage({
      name: 'no-theemo',
      keywords: ['theemo-theme']
    });

    expect(validation.success).toBeFalsy();
    expect(validation.errors).toStrictEqual([`Package 'no-theemo' requires 'theemo' field`]);
  });
});
