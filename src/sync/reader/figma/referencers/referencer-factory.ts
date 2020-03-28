import {
  ReferencerConfig,
  ReferencerType,
  ReferencerPluginConfig
} from '../config';
import NullReferencer from './null-referencer';
import StyleReferencer from './plugin/style-referencer';
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
      case 'style-referencer':
        return new StyleReferencer(config.pluginOptions);

      default:
        return new NullReferencer();
    }
  }
}
