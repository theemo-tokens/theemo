import { tracked } from '@glimmer/tracking';
import Service from '@ember/service';

import { ThemeManager } from '@theemo/theme';

import type Owner from '@ember/owner';
import type { FeatureValue, FeatureWithValue, Theme } from '@theemo/theme';

/**
 * Manage Themes in Ember
 */
export default class TheemoService extends Service {
  @tracked private internalActiveTheme?: Theme;
  @tracked private internalFeatures: FeatureWithValue[] = [];

  #manager: ThemeManager;

  constructor(owner: Owner) {
    super(owner);
    this.#manager = new ThemeManager({
      themeChanged: (theme: Theme) => {
        this.internalActiveTheme = theme;

        this.#updateFeatures();
      },
      featureChanged: () => {
        this.#updateFeatures();
      }
    });

    this.internalActiveTheme = this.#manager.activeTheme;
    this.#updateFeatures();
  }

  #updateFeatures = () => {
    this.internalFeatures = this.#manager.features;
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
    return this.internalActiveTheme;
  }

  /** All features for the active theme */
  get features(): FeatureWithValue[] {
    return this.internalFeatures;
  }

  /**
   * Set a feature to the given value
   *
   * @param featureName the feature to change
   * @param value the value for that feature
   */
  setFeature = (featureName: string, value: FeatureValue): void => {
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
