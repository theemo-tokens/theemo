import fs from 'fs';

import StyleDictionary, { Config, TransformTypes } from 'style-dictionary';

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
  build() {
    const config = this.loadConfig() as TheemoConfig;
    if (config) {
      for (const type of ['value', 'attribute', 'name']) {
        StyleDictionary.registerTransform({
          name: `theemo/transform/${type}`,
          type: type as TransformTypes,
          matcher: property => {
            return this.applyMatcher(
              type as keyof TheemoTransforms,
              config,
              property as Record<string, unknown>
            );
          },
          transformer: property => {
            return this.applyTransformer(
              type as keyof TheemoTransforms,
              config,
              property as Record<string, unknown>
            );
          }
        });
      }
      StyleDictionary.registerTransformGroup({
        name: 'theemo/css',
        transforms: [
          'theemo/transform/name',
          'theemo/transform/attribute',
          'theemo/transform/value',
          ...StyleDictionary.transformGroup.css
        ]
      });
      const sd = StyleDictionary.extend(config);

      sd.buildAllPlatforms();
    }
  }

  private applyMatcher(
    type: keyof TheemoTransforms,
    config: TheemoConfig,
    property: Record<string, unknown>
  ) {
    return Boolean(config.transforms?.[type]?.matcher?.(property));
  }

  private applyTransformer(
    type: keyof TheemoTransforms,
    config: TheemoConfig,
    property: Record<string, unknown>
  ) {
    return config.transforms?.[type]?.transformer(property) ?? '';
  }

  private loadConfig(): Config | undefined {
    const file = this.findConfig();

    if (file) {
      return requireFile(file);
    }

    return undefined;
  }

  private findConfig() {
    const files = ['config.json', 'config.js'];
    for (const file of files) {
      if (fs.existsSync(file)) {
        return file;
      }
    }

    return undefined;
  }
}
