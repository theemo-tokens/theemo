import { ColorContrast } from './features/color-contrast';
import { ColorScheme } from './features/color-scheme';
import { Motion } from './features/motion';
import { Feature } from './theme';

interface Preferences {
  [Feature.ColorScheme]: ColorScheme;
  [Feature.ColorContrast]: ColorContrast;
  [Feature.Motion]: Motion;
}

const SYSTEM_DEFAULTS: Preferences = {
  [Feature.ColorScheme]: ColorScheme.Light,
  [Feature.ColorContrast]: ColorContrast.NoPreference,
  [Feature.Motion]: Motion.NoPreference
};

type Checks = {
  [key in Feature]: Record<Preferences[key], MediaQueryList>;
};

const checks: Checks = {
  [Feature.ColorScheme]: {
    [ColorScheme.Dark]: window.matchMedia('(prefers-color-scheme: dark)'),
    [ColorScheme.Light]: window.matchMedia('(prefers-color-scheme: light)')
  },
  [Feature.ColorContrast]: {
    [ColorContrast.NoPreference]: window.matchMedia('(prefers-color-contrast: no-preference)'),
    [ColorContrast.More]: window.matchMedia('(prefers-color-contrast: more)'),
    [ColorContrast.Less]: window.matchMedia('(prefers-color-contrast: less)'),
    [ColorContrast.Custom]: window.matchMedia('(prefers-color-contrast: custom)')
  },
  [Feature.Motion]: {
    [Motion.NoPreference]: window.matchMedia('(prefers-reduced-motion: no-preference)'),
    [Motion.Reduce]: window.matchMedia('(prefers-reduced-motion)')
  }
};

export function readUserPreferences() {
  const preferences: Preferences = SYSTEM_DEFAULTS;

  function match() {
    for (const [feature, modes] of Object.entries(checks)) {
      for (const [pref, check] of Object.entries(modes)) {
        if (check.matches) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          preferences[feature] = pref;
        }
      }
    }
  }

  match();

  for (const modes of Object.values(checks)) {
    for (const check of Object.values(modes)) {
      check.addEventListener('change', match);
    }
  }

  return preferences;
}
