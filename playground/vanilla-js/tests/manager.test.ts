import { Principal, ThemeManager } from '@theemo/theme';
import { describe, expect, test, vi } from 'vitest';
// import { server } from '@vitest/browser/context'
// const { canEmulateColorScheme, emulateColorScheme } = server.commands

describe('ThemeManager', async () => {
  // const emulationPossible = await canEmulateColorScheme();
  const manager = new ThemeManager();

  const findFeatureByName = (name: string) => {
    return manager.features.find((f) => f.name === name);
  };

  test('available themes', () => {
    const themeNames = manager.themes.map((t) => t.name);

    expect(themeNames).toStrictEqual(['forest', 'ocean']);
  });

  test('ocean theme features', () => {
    const featureNames = manager.features.map((f) => f.name);

    expect(featureNames).toStrictEqual(['color-scheme']);
  });

  test('overwrite browser feature', () => {
    let colorSchemeFeature = findFeatureByName('color-scheme');

    expect(colorSchemeFeature?.principal).toBe(Principal.Browser);

    // overwrite
    manager.setFeature('color-scheme', 'dark');

    colorSchemeFeature = findFeatureByName('color-scheme');

    expect(colorSchemeFeature?.principal).toBe(Principal.User);

    // unset
    manager.unsetFeature('color-scheme');

    colorSchemeFeature = findFeatureByName('color-scheme');

    expect(colorSchemeFeature?.principal).toBe(Principal.Browser);
  });

  test('set unknown feature and unknown option', () => {
    expect(() => manager.setFeature('lalala', 'lululu')).toThrowError(
      `Cannot find feature 'lalala': feature doesn't exist`
    );

    expect(() => manager.setFeature('color-scheme', 'lululu')).toThrowError(
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

  // https://github.com/theemo-tokens/theemo/issues/1491
  // test.runIf(emulationPossible)('browser to switch color scheme and manager to react appropriately', async () => {
  //   await manager.switchTheme('ocean');
  //   await emulateColorScheme('light');

  //   let colorSchemeFeature = findFeatureByName('color-scheme');
  //   expect(colorSchemeFeature?.value).toBe('light');
  
  //   await emulateColorScheme('dark');
  //   colorSchemeFeature = findFeatureByName('color-scheme');
  //   expect(colorSchemeFeature?.value).toBe('dark');
  // })
});
