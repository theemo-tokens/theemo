import { getContext, setContext } from 'svelte';

import { ThemeManager } from '@theemo/theme';

import type { FeatureWithValue, Theme } from '@theemo/theme';

class Theemo {
  private internalActiveTheme: Theme | undefined = $state();
  private internalFeatures: FeatureWithValue[] = $state([]);

  #manager: ThemeManager;

  constructor() {
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

const THEEMO: symbol = Symbol('Theemo');

export function setTheemoContext(): void {
  setContext(THEEMO, new Theemo());
}

export function getTheemoContext(): Theemo {
  return getContext(THEEMO);
}
