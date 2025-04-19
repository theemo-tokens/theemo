import { extractConfig } from './config';
import {
  BrowserMechanic,
  ColorContrast,
  ColorScheme,
  isAdaptiveFeature,
  isBrowserFeature,
  isModalFeature,
  Motion,
  Principal
} from './features';

import type { TheemoRuntimeConfig } from './config';
import type { BrowserFeature } from './features';
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

type FeatureValues = Record<string, string>;

function match(feature: BrowserFeature) {
  const values: FeatureValues = {};

  for (const [value, query] of Object.entries(queries[feature.browserFeature])) {
    const check = window.matchMedia(query);

    if (check.matches) {
      values[feature.name] = value;
    }
  }

  return values;
}

export function setupListeners(features: BrowserFeature[], cb: (values: FeatureValues) => void) {
  const disposals: (() => void)[] = [];

  const values: FeatureValues = {};

  for (const feature of features) {
    for (const [value, query] of Object.entries(queries[feature.browserFeature])) {
      const check = window.matchMedia(query);
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
    dispose: () => {
      disposals.forEach((dispose) => dispose());
    }
  };
}

interface Options {
  themeChanged?: (theme: Theme) => void;
  featureChanged?: (name: string, value?: string) => void;
}

export class ThemeManager {
  #elements: Map<string, HTMLLinkElement> = new Map();
  #config: TheemoRuntimeConfig;
  #options: Options;

  activeTheme?: Theme;

  #defaultFeatureValues: FeatureValues = {};
  #adaptiveFeatureValues: FeatureValues = {};
  #modeFeatureValues: FeatureValues = {};

  #activeThemeManager: {
    teardownListeners?: () => void;
  } = {};

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
      void this.setTheme(this.#config.options.defaultTheme);
    }
  }

  /**
   * List of available themes
   */
  get themes(): Theme[] {
    return this.#config.themes;
  }

  get adaptiveFeatureValues() {
    return this.#adaptiveFeatureValues;
  }

  get modeFeatureValues() {
    return this.#modeFeatureValues;
  }

  get featureValues() {
    return {
      ...this.#defaultFeatureValues,
      ...this.#adaptiveFeatureValues,
      ...this.#modeFeatureValues
    };
  }

  #findFeature(name: string) {
    const feature = this.activeTheme?.features?.find((f) => f.name === name);

    if (!feature) {
      throw new Error(`Cannot find feature '${name}': feature doesn't exist`);
    }

    return feature;
  }

  getPrincipal(featureName: string): Principal {
    const feature = this.#findFeature(featureName);

    const overriddenValue = isAdaptiveFeature(feature) && this.modeFeatureValues[feature.name];

    const principal = isAdaptiveFeature(feature)
      ? overriddenValue
        ? Principal.User
        : Principal.Browser
      : Principal.User;

    return principal;
  }

  setMode(featureName: string, value: string) {
    const feature = this.#findFeature(featureName);

    if (!isModalFeature(feature)) {
      throw new Error(`Cannot set mode for '${feature.name}': mode is not allowed`);
    }

    if (!feature.options.includes(value)) {
      throw new Error(`Cannot set mode '${feature.name}' to '${value}': option doesn't exist`);
    }

    this.#modeFeatureValues[feature.name] = value;

    document.documentElement.setAttribute(`data-theemo-${feature.name}`, value);

    this.#options.featureChanged?.(feature.name, value);
  }

  unsetMode(featureName: string) {
    const feature = this.#findFeature(featureName);

    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.#modeFeatureValues[feature.name];

    document.documentElement.removeAttribute(`data-theemo-${feature.name}`);

    this.#options.featureChanged?.(feature.name);
  }

  /**
   * Set the _main_ theme at the body.
   * Method name is very likely to change
   *
   * @param name theme name
   */
  async setTheme(name: string): Promise<void> {
    if (this.activeTheme?.name === name) {
      return;
    }

    const theme = this.themes.find((t) => t.name === name);

    if (!theme) {
      throw new Error(`Cannot set theme '${name}': theme doesn't exist`);
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
    this.#setupAdaptiveFeatures(theme);

    // set new theme the active one
    this.activeTheme = theme;
    this.#options.themeChanged?.(theme);
  }

  async #ensureThemeIsLoaded(theme: Theme) {
    if (!this.#elements.has(theme.name)) {
      await this.#loadTheme(theme.name);
    }
  }

  #activateTheme(theme: Theme) {
    const element = this.#elements.get(theme.name) as HTMLLinkElement;

    element.disabled = false;
  }

  #setupAdaptiveFeatures(theme: Theme) {
    const adaptiveBrowserFeatures = (theme.features ?? [])
      .filter(isBrowserFeature)
      .filter(isAdaptiveFeature);

    const browser = setupListeners(adaptiveBrowserFeatures, (values: FeatureValues) =>
      this.#handleChangeFeatures(values)
    );

    this.#activeThemeManager.teardownListeners = browser.dispose;
    this.#adaptiveFeatureValues = browser.values;
  }

  #handleChangeFeatures(values: FeatureValues) {
    const dump = { ...this.featureValues };

    this.#adaptiveFeatureValues = {
      ...this.#adaptiveFeatureValues,
      ...values
    };

    const changes = Object.entries(this.featureValues).filter(([k, v]) => dump[k] !== v);

    for (const [k, v] of changes) {
      this.#options.featureChanged?.(k, v);
    }
  }

  #setupDefaultFeatures(theme: Theme) {
    const defaultFeatures = (theme.features ?? []).filter((f) => f.defaultOption !== undefined);

    this.#defaultFeatureValues = defaultFeatures.reduce(
      (values, f) => ({
        ...values,
        [f.name]: f.defaultOption
      }),
      {}
    );
  }

  #deactivateTheme(theme: Theme) {
    this.#defaultFeatureValues = {};
    this.#adaptiveFeatureValues = {};
    this.#modeFeatureValues = {};

    // clear classes
    this.#clearModes(theme);

    // disable link
    (this.#elements.get(theme.name) as HTMLLinkElement).disabled = true;
  }

  #clearModes(theme: Theme) {
    for (const feature of (theme.features ?? []).filter(isModalFeature)) {
      document.documentElement.removeAttribute(`data-theemo-${feature.name}`);
    }
  }

  async #loadTheme(name: string) {
    const element = await this.#createLinkElement(name);

    this.#elements.set(name, element);
  }

  #createLinkElement(theme: string): Promise<HTMLLinkElement> {
    const linkElement = document.createElement('link');

    linkElement.setAttribute('href', `/${this.#config.options.outDir}/${theme}.css`);
    linkElement.setAttribute('type', 'text/css');
    linkElement.setAttribute('rel', 'stylesheet');
    linkElement.setAttribute('title', theme);
    linkElement.dataset.theemo = theme;
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
