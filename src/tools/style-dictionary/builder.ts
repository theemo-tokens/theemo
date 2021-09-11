import fs from 'fs';

import StyleDictionary, { Config } from 'style-dictionary';

import { requireFile } from '../../utils';

interface TheemoTransform {
  matcher?: (property: Record<string, unknown>) => boolean;
  transformer: (property: Record<string, unknown>) => string;
}

interface TheemoTransforms {
  value?: TheemoTransform;
  attribute?: TheemoTransform;
  name?: TheemoTransform;
}

interface TheemoConfig extends Config {
  transforms?: TheemoTransforms;
}

export default class StyleDictionaryBuilder {
  build(): void {
    const config = this.loadConfig();
    if (config) {
      const sd = StyleDictionary.extend(config);

      sd.buildAllPlatforms();
    }
  }

  private loadConfig(): Config | undefined {
    const file = this.findConfig();

    if (file) {
      return requireFile(file) as TheemoConfig;
    }
  }

  private findConfig() {
    const files = [
      'config.json',
      'config.json5',
      'config.js',
      'sd.config.js',
      'sd.config.json',
      'sd.config.json5'
    ];
    for (const file of files) {
      if (fs.existsSync(file)) {
        return file;
      }
    }
  }
}
