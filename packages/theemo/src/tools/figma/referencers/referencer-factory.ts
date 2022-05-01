import { FigmaReferencerType } from '../config.js';
import NullReferencer from './null-referencer.js';
import TheemoPluginReferencer from './theemo-plugin.js';

import type { FigmaReferencerConfig, FigmaReferencerPluginConfig } from '../config.js';
import type Referencer from './referencer.js';

export default class ReferencerFactory {
  static create(config?: FigmaReferencerConfig): Referencer {
    switch (config?.type) {
      case FigmaReferencerType.FigmaPlugin:
        return ReferencerFactory.createPluginReferencer(config);

      default:
        return new NullReferencer();
    }
  }

  private static createPluginReferencer(config: FigmaReferencerPluginConfig): Referencer {
    switch (config.plugin) {
      case 'theemo':
        return new TheemoPluginReferencer(config.pluginConfig);

      default:
        return new NullReferencer();
    }
  }
}
