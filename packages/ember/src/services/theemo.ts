import { tracked } from '@glimmer/tracking';
import Service from '@ember/service';

import { ThemeManager } from '@theemo/theme';

import type Owner from '@ember/owner';
import type { FeatureWithValue, Theme } from '@theemo/theme';

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

  get themes(): Theme[] {
    return this.#manager.themes;
  }

  get activeTheme(): Theme | undefined {
    return this.internalActiveTheme;
  }

  get features(): FeatureWithValue[] {
    return this.internalFeatures;
  }

  setFeature = (featureName: string, value: string): void => {
    this.#manager.setFeature(featureName, value);
  };

  unsetFeature = (featureName: string): void => {
    this.#manager.unsetFeature(featureName);
  };

  switchTheme = async (name: string): Promise<void> => {
    await this.#manager.switchTheme(name);
  };
}
