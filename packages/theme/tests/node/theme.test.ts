import { describe, expect, test } from 'vitest';

import { validateTheme } from '../../src/theme';
import { loadThemePackage } from './helpers';

describe('validateTheme()', () => {
  test('ocean theme', () => {
    const oceanTheme = loadThemePackage('@theemo-playground/ocean-theme');
    const oceanValidation = validateTheme(oceanTheme.theemo);

    expect(oceanValidation.success).toBeTruthy();
  });

  test('no name', () => {
    // @ts-expect-error testing for an invalid type here
    const validation = validateTheme({});

    expect(validation.success).toBeFalsy();
    expect(validation.errors).toStrictEqual([`Theme requires 'name'`]);
  });
});
