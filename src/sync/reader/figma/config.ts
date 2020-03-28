import { ReaderSource } from '../config';
import { Style } from 'figma-api';

export default interface FigmaReaderConfig {
  source: ReaderSource.Figma;
  figmaFile: string;
  figmaSecret: string;
  referencer?: ReferencerConfig;

  isTokenByStyle?: (style: Style) => boolean;
  isTokenByNode?: (node: Node) => boolean;
}

// Referencer Options

export type ReferencerConfig = ReferencerPluginConfig & {
  type: ReferencerType;
};

export enum ReferencerType {
  FigmaPlugin = 'figma-plugin'
}

export interface ReferencerPluginConfig {
  type: ReferencerType.FigmaPlugin;
  plugin: string;
  pluginOptions: object;
}
