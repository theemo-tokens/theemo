import { describe, expect, test } from 'vitest';

import { Principal, ThemeManager } from '../../src';

describe('ThemeManager', () => {
  const manager = new ThemeManager();

  test('available themes', () => {
    const themeNames = manager.themes.map((t) => t.name);

    expect(themeNames).toStrictEqual(['forest', 'ocean']);
  });

  test('ocean theme features', () => {
    const featureNames = manager.activeTheme?.features?.map((f) => f.name);

    expect(featureNames).toStrictEqual(['color-scheme']);
  });

  test('overwrite browser feature', () => {
    expect(manager.getPrincipal('color-scheme')).toBe(Principal.Browser);

    manager.setMode('color-scheme', 'dark');

    expect(manager.getPrincipal('color-scheme')).toBe(Principal.User);

    manager.unsetMode('color-scheme');

    expect(manager.getPrincipal('color-scheme')).toBe(Principal.Browser);
  });

  test('set unknown feature and unknown option', () => {
    expect(() => manager.setMode('lalala', 'lululu')).toThrowError(
      `Cannot find feature 'lalala': feature doesn't exist`
    );

    expect(() => manager.setMode('color-scheme', 'lululu')).toThrowError(
      `Cannot set mode 'color-scheme' to 'lululu': option doesn't exist`
    );
  });

  test('switch theme', async () => {
    expect(manager.activeTheme?.name, 'active default theme').toBe('ocean');

    await manager.switchTheme('forest');

    expect(manager.activeTheme?.name).toBe('forest');
  });

  test('switch to unknown theme', async () => {
    await expect(
      async () => await manager.switchTheme('theme-that-does-not-exist')
    ).rejects.toThrowError(`Cannot switch theme 'theme-that-does-not-exist': theme doesn't exist`);
  });
});
