import { extractConfig } from './config';
import {
  BrowserMechanic,
  ColorContrast,
  ColorScheme,
  isBrowserFeature,
  isModalFeature,
  Motion,
  Principal
} from './features';

import type { TheemoRuntimeConfig, TheemoRuntimeTheme } from './config';
import type { BrowserFeature, Feature, FeatureValue, FeatureWithValue } from './features';
import type { Theme } from './theme';

const queries = {
  [BrowserMechanic.ColorScheme]: {
    [ColorScheme.Dark]: '(prefers-color-scheme: dark)',
    [ColorScheme.Light]: '(prefers-color-scheme: light)'
  },
  [BrowserMechanic.ColorContrast]: {
    [ColorContrast.NoPreference]: '(prefers-color-contrast: no-preference)',
    [ColorContrast.More]: '(prefers-color-contrast: more)',
    [ColorContrast.Less]: '(prefers-color-contrast: less)',
    [ColorContrast.Custom]: '(prefers-color-contrast: custom)'
  },
  [BrowserMechanic.Motion]: {
    [Motion.NoPreference]: '(prefers-reduced-motion: no-preference)',
    [Motion.Reduce]: '(prefers-reduced-motion)'
  }
};

type FeatureValues = Record<string, FeatureValue>;

function match(feature: BrowserFeature) {
  const values: FeatureValues = {};

  for (const [value, query] of Object.entries(queries[feature.browserFeature])) {
    const check = globalThis.matchMedia(query);

    if (check.matches) {
      values[feature.name] = value;
    }
  }

  return values;
}

export function setupListeners(
  features: BrowserFeature[],
  cb: (values: FeatureValues) => void
): {
  values: FeatureValues;
  dispose: () => void;
} {
  const disposals: (() => void)[] = [];

  const values: FeatureValues = {};

  for (const feature of features) {
    for (const [value, query] of Object.entries(queries[feature.browserFeature])) {
      const check = globalThis.matchMedia(query);
      const handler = () => cb(match(feature));

      check.addEventListener('change', handler);
      disposals.push(() => check.removeEventListener('change', handler));

      if (check.matches) {
        values[feature.name] = value;
      }
    }
  }

  return {
    values,
    dispose: (): void => {
      for (const dispose of disposals) dispose();
    }
  };
}

interface Options {
  themeChanged?: (theme: Theme) => void;
  featureChanged?: (feature: FeatureWithValue) => void;
}

/**
 * Manages theming at runtime
 *
 * - switch themes
 * - turn features on and off
 */
export class ThemeManager {
  #elements = new Map<string, HTMLLinkElement>();
  #config: TheemoRuntimeConfig;
  #options: Options;

  #activeThemeManager: {
    teardownListeners?: () => void;
  } = {};

  #defaultFeatureValues: FeatureValues = {};
  #browserFeatureValues: FeatureValues = {};
  #modeFeatureValues: FeatureValues = {};

  /** The active theme */
  activeTheme?: Theme;

  /** Features of the active theme */
  features: FeatureWithValue[] = [];

  constructor(options: Options = {}) {
    this.#options = options;
    this.#config = extractConfig();

    // find loaded themes and disable all
    for (const link of document.querySelectorAll<HTMLLinkElement>('head > link')) {
      if (link.dataset.theemo) {
        this.#elements.set(link.dataset.theemo, link);
        link.disabled = link.dataset.theemo !== this.#config.options.defaultTheme;
      }
    }

    // officially activate the default
    if (this.#config.options.defaultTheme) {
      void this.switchTheme(this.#config.options.defaultTheme);
    }
  }

  /**
   * List of available themes
   */
  get themes(): TheemoRuntimeTheme[] {
    return this.#config.themes;
  }

  get #featureValues(): FeatureValues {
    return {
      ...this.#defaultFeatureValues,
      ...this.#browserFeatureValues,
      ...this.#modeFeatureValues
    };
  }

  #findFeature(name: string) {
    const feature = this.features.find((f) => f.name === name);

    if (!feature) {
      throw new Error(`Cannot find feature '${name}': feature doesn't exist`);
    }

    return feature;
  }

  #getPrincipal(featureOrName: string | Feature): Principal {
    const feature =
      typeof featureOrName === 'string' ? this.#findFeature(featureOrName) : featureOrName;

    const overriddenValue = isBrowserFeature(feature) && this.#modeFeatureValues[feature.name];

    const principal = isBrowserFeature(feature)
      ? overriddenValue
        ? Principal.User
        : Principal.Browser
      : Principal.User;

    return principal;
  }

  /**
   * Set the feature to a value
   *
   * @param featureName the name of the feature
   * @param value the value for that feature
   */
  setFeature(featureName: string, value: FeatureValue): void {
    const feature = this.#findFeature(featureName);

    if (!(feature.options as FeatureValue[]).includes(value)) {
      throw new Error(`Cannot set mode '${feature.name}' to '${value}': option doesn't exist`);
    }

    this.#modeFeatureValues[feature.name] = value;

    this.#updateFeatures();

    document.documentElement.setAttribute(`data-theemo-${feature.name}`, value);

    this.#options.featureChanged?.(feature);
  }

  /**
   * Turn off a feature. Revert to its default.
   *
   * @param featureName the name of the feature
   */
  unsetFeature(featureName: string): void {
    const feature = this.#findFeature(featureName);

    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.#modeFeatureValues[feature.name];

    this.#updateFeatures();

    document.documentElement.removeAttribute(`data-theemo-${feature.name}`);

    this.#options.featureChanged?.(feature);
  }

  /**
   * Switch to another theme
   *
   * @param name theme name
   */
  async switchTheme(name: string): Promise<void> {
    if (this.activeTheme?.name === name) {
      return;
    }

    const theme = this.themes.find((t) => t.name === name);

    if (!theme) {
      throw new Error(`Cannot switch theme '${name}': theme doesn't exist`);
    }

    // load and activate theme
    await this.#ensureThemeIsLoaded(theme);
    this.#activateTheme(theme);

    // disable previous theme
    if (this.activeTheme) {
      this.#deactivateTheme(this.activeTheme);
    }

    // setup managing features
    this.#setupDefaultFeatures(theme);
    this.#setupBrowserFeatures(theme);

    // set new theme the active one
    this.activeTheme = theme;
    this.#updateFeatures();
    this.#options.themeChanged?.(theme);
  }

  async #ensureThemeIsLoaded(theme: TheemoRuntimeTheme) {
    if (!this.#elements.has(theme.name)) {
      await this.#loadTheme(theme);
    }
  }

  #activateTheme(theme: Theme) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const element = this.#elements.get(theme.name)!;

    element.disabled = false;
  }

  #setupBrowserFeatures(theme: Theme) {
    const browserBrowserFeatures = (theme.features ?? []).filter((element) =>
      isBrowserFeature(element)
    );

    const browser = setupListeners(browserBrowserFeatures, (values: FeatureValues) =>
      this.#handleChangeFeatures(values)
    );

    this.#activeThemeManager.teardownListeners = browser.dispose;
    this.#browserFeatureValues = browser.values;
  }

  #handleChangeFeatures(values: FeatureValues) {
    const dump = { ...this.#featureValues };

    this.#browserFeatureValues = {
      ...this.#browserFeatureValues,
      ...values
    };

    this.#updateFeatures();

    const changes = Object.entries(this.#featureValues)
      .filter(([k, v]) => dump[k] !== v)
      .map(([k]) => k);

    for (const featureName of changes) {
      this.#options.featureChanged?.(this.#findFeature(featureName));
    }
  }

  #updateFeatures() {
    this.features = (this.activeTheme?.features ?? []).map(
      (f) =>
        ({
          ...f,
          value: this.#featureValues[f.name],
          browserValue: isBrowserFeature(f) ? this.#browserFeatureValues[f.name] : undefined,
          principal: this.#getPrincipal(f)
        }) as FeatureWithValue
    );
  }

  #setupDefaultFeatures(theme: Theme) {
    const defaultFeatures = (theme.features ?? []).filter((element) => isModalFeature(element));

    this.#defaultFeatureValues = Object.fromEntries(
      defaultFeatures.map((f) => [f.name, f.defaultOption])
    );
  }

  #deactivateTheme(theme: Theme) {
    this.#defaultFeatureValues = {};
    this.#browserFeatureValues = {};
    this.#modeFeatureValues = {};

    // clear classes
    this.#clearModes(theme);

    // disable link
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.#elements.get(theme.name)!.disabled = true;
  }

  #clearModes(theme: Theme) {
    for (const feature of theme.features ?? []) {
      document.documentElement.removeAttribute(`data-theemo-${feature.name}`);
    }
  }

  async #loadTheme(theme: TheemoRuntimeTheme) {
    const element = await this.#createLinkElement(theme);

    this.#elements.set(theme.name, element);
  }

  #createLinkElement(theme: TheemoRuntimeTheme): Promise<HTMLLinkElement> {
    const linkElement = document.createElement('link');

    linkElement.setAttribute('href', `/${this.#config.options.outDir}/${theme.filename}.css`);
    linkElement.setAttribute('type', 'text/css');
    linkElement.setAttribute('rel', 'stylesheet');
    linkElement.setAttribute('title', theme.name);
    linkElement.dataset.theemo = theme.name;
    document.head.append(linkElement);

    return new Promise((resolve) => {
      const listener = () => {
        linkElement.removeEventListener('load', listener);
        linkElement.disabled = true;

        resolve(linkElement);
      };

      linkElement.addEventListener('load', listener);
    });
  }
}
