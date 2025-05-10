import { tracked } from '@glimmer/tracking';
import Service from '@ember/service';

import { ThemeManager } from '@theemo/theme';

import type Owner from '@ember/owner';
import type { Feature as _Feature, Principal, Theme } from '@theemo/theme';

type FeatureValues = Record<string, string>;

type Feature = _Feature & {
  principal: Principal;
  value: unknown;
};

export default class TheemoService extends Service {
  @tracked activeTheme?: Theme;
  @tracked features: Feature[] = [];

  @tracked browserFeatureValues: FeatureValues = {};
  @tracked modeFeatureValues: FeatureValues = {};

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
    this.features = (this.activeTheme?.features ?? []).map((f) => ({
      ...f,
      value: this.#manager.featureValues[f.name],
      principal: this.#manager.getPrincipal(f.name)
    }));
    this.browserFeatureValues = this.#manager.browserFeatureValues;
    this.modeFeatureValues = this.#manager.modeFeatureValues;
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

  getPrincipal = (featureName: string) => {
    return this.#manager.getPrincipal(featureName);
  };
}
