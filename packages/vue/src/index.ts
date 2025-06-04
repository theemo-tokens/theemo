import { inject, provide, ref } from 'vue';

import { ThemeManager } from '@theemo/theme';

import type { FeatureWithValue, Theme } from '@theemo/theme';

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

  get themes(): Theme[] {
    return this.#manager.themes;
  }

  get activeTheme(): Theme | undefined {
    return this.internalActiveTheme.value;
  }

  get features(): FeatureWithValue[] {
    return this.internalFeatures.value;
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

const THEEMO = Symbol('Theemo');

export function provideTheemo(): void {
  provide(THEEMO, new Theemo());
}

export function injectTheemo(): Theemo | undefined {
  return inject(THEEMO);
}
