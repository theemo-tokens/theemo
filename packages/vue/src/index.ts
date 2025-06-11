import { inject, provide, ref } from 'vue';

import { ThemeManager } from '@theemo/theme';

import type { FeatureWithValue, Theme } from '@theemo/theme';

/**
 * Theemo to manage themes and features
 */
export class Theemo {
  private internalActiveTheme = ref<Theme>();
  private internalFeatures = ref<FeatureWithValue[]>([]);

  #manager: ThemeManager;

  constructor() {
    this.#manager = new ThemeManager({
      themeChanged: (theme: Theme) => {
        this.internalActiveTheme.value = theme;

        this.#updateFeatures();
      },
      featureChanged: () => {
        this.#updateFeatures();
      }
    });

    this.internalActiveTheme.value = this.#manager.activeTheme;
    this.#updateFeatures();
  }

  #updateFeatures = () => {
    this.internalFeatures.value = this.#manager.features;
  };

  /**
   * List of all available themes
   */
  get themes(): Theme[] {
    return this.#manager.themes;
  }

  /**
   * The active theme
   */
  get activeTheme(): Theme | undefined {
    return this.internalActiveTheme.value;
  }

  /** All features for the active theme */
  get features(): FeatureWithValue[] {
    return this.internalFeatures.value;
  }

  /**
   * Set a feature to the given value
   *
   * @param featureName the feature to change
   * @param value the value for that feature
   */
  setFeature = (featureName: string, value: string): void => {
    this.#manager.setFeature(featureName, value);
  };

  /**
   * Unsets a feature. Reverts to its default.
   *
   * @param featureName the feature to unset
   */
  unsetFeature = (featureName: string): void => {
    this.#manager.unsetFeature(featureName);
  };

  /**
   * Swithes to another theme
   *
   * @param name the name of the new theme
   */
  switchTheme = async (name: string): Promise<void> => {
    await this.#manager.switchTheme(name);
  };
}

const THEEMO = Symbol('Theemo');

/**
 * Uses `provide()` from `vue` to provide an instance of `Theemo`.
 */
export function provideTheemo(): void {
  provide(THEEMO, new Theemo());
}

/**
 * Consumes the provided `Theemo`.
 *
 * @returns the provided `Theemo`
 */
export function injectTheemo(): Theemo | undefined {
  return inject(THEEMO);
}
