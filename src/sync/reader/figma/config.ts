import { ReaderSource } from '../config';
import { Style, Node } from 'figma-api';

export default interface FigmaReaderConfig {
  source: ReaderSource.Figma;
  figmaFile: string;
  figmaSecret: string;
  referencer?: ReferencerConfig;

  isTokenByStyle?: (style: Style) => boolean;
  isTokenByText?: (node: Node<'TEXT'>) => boolean;
  getNameFromText?: (node: Node<'TEXT'>) => string;
  getValueFromText?: (node: Node<'TEXT'>) => string;
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
