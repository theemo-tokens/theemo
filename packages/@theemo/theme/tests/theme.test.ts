import { describe, expect, test } from 'vitest';

import { validateTheme } from '../src/theme';
import { loadThemePackage } from './helpers';

describe('validateTheme()', () => {
  test('ocean theme', async () => {
    const oceanTheme = await loadThemePackage('ocean-theme');
    const oceanValidation = validateTheme(oceanTheme.theemo);

    expect(oceanValidation.success).toBeTruthy();
  });

  test('no name', () => {
    // @ts-expect-error testing for an invalid type here
    const validation = validateTheme({
      file: 'styles.css'
    });

    expect(validation.success).toBeFalsy();
    expect(validation.errors).toStrictEqual([`Theme requires 'name'`]);
  });

  test('no file', () => {
    // @ts-expect-error testing for an invalid type here
    const validation = validateTheme({
      name: 'hi'
    });

    expect(validation.success).toBeFalsy();
    expect(validation.errors).toStrictEqual([`Theme 'hi' requires 'file'`]);
  });
});
