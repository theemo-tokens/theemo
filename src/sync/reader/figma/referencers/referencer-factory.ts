import {
  ReferencerConfig,
  ReferencerType,
  ReferencerPluginConfig
} from '../config';
import NullReferencer from './null-referencer';
import TheemoPluginReferencer from './plugin/theemo';
import Referencer from './referencer';

export default class ReferencerFactory {
  static create(config?: ReferencerConfig): Referencer {
    switch (config?.type) {
      case ReferencerType.FigmaPlugin:
        return ReferencerFactory.createPluginReferencer(config);

      default:
        return new NullReferencer();
    }
  }

  private static createPluginReferencer(
    config: ReferencerPluginConfig
  ): Referencer {
    switch (config.plugin) {
      case 'theemo':
        return new TheemoPluginReferencer(config.pluginOptions);

      default:
        return new NullReferencer();
    }
  }
}
