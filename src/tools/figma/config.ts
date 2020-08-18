import { Style, Node } from 'figma-api';
import { Tools } from '../tool';
import ToolConfig from '../config';

export interface FigmaConfig extends ToolConfig {
  reader: FigmaReaderConfig;
}

export interface FigmaReaderConfig {
  tool: Tools.Figma;
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

export interface ColorConfig {
  color: ColorFormat;
  colorAlpha: ColorAlphaFormat;
}

export enum ColorFormat {
  Rgb = 'rgb',
  Hex = 'hex',
  Hsl = 'hsl'
}

export enum ColorAlphaFormat {
  Rgb = 'rgb',
  Hsl = 'hsl'
}

export interface ColorNode {
  r: number;
  g: number;
  b: number;
  a: number;
  visible: boolean;
}

export interface ShadowNode {
  inner: boolean;
  x: number;
  y: number;
  radius: number;
  color: ColorNode;
}
