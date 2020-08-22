import {
  FigmaReferencerConfig,
  FigmaReferencerType,
  FigmaReferencerPluginConfig
} from '../config';
import NullReferencer from './null-referencer';
import Referencer from './referencer';
import TheemoPluginReferencer from './theemo-plugin';

export default class ReferencerFactory {
  static create(config?: FigmaReferencerConfig): Referencer {
    switch (config?.type) {
      case FigmaReferencerType.FigmaPlugin:
        return ReferencerFactory.createPluginReferencer(config);

      default:
        return new NullReferencer();
    }
  }

  private static createPluginReferencer(
    config: FigmaReferencerPluginConfig
  ): Referencer {
    switch (config.plugin) {
      case 'theemo':
        return new TheemoPluginReferencer(config.pluginConfig);

      default:
        return new NullReferencer();
    }
  }
}
