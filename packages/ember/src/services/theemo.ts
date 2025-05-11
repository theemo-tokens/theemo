import { tracked } from '@glimmer/tracking';
import Service from '@ember/service';

import { ThemeManager } from '@theemo/theme';

import type Owner from '@ember/owner';
import type { FeatureWithValue, Theme } from '@theemo/theme';

export default class TheemoService extends Service {
  @tracked activeTheme?: Theme;
  @tracked features: FeatureWithValue[] = [];

  #manager: ThemeManager;

  constructor(owner: Owner) {
    super(owner);
    this.#manager = new ThemeManager({
      themeChanged: (theme: Theme) => {
        this.activeTheme = theme;

        this.#updateFeatures();
      },
      featureChanged: () => {
        this.#updateFeatures();
      }
    });

    this.activeTheme = this.#manager.activeTheme;
    this.#updateFeatures();
  }

  #updateFeatures = () => {
    this.features = this.#manager.features;
  };

  get themes(): Theme[] {
    return this.#manager.themes;
  }

  setMode = (featureName: string, value: string): void => {
    this.#manager.setMode(featureName, value);
  };

  unsetMode = (featureName: string): void => {
    this.#manager.unsetMode(featureName);
  };

  switchTheme = async (name: string): Promise<void> => {
    await this.#manager.switchTheme(name);
  };
}
