import { Node, Style } from 'figma-api';

import ToolConfig from '../config';
import { Tools } from '../tool';
import { FigmaTheemoPluginConfig } from './referencers/theemo-plugin';

/**
 * Config for Figma
 *
 * Figma is used as a `ReaderTool`.
 */
export interface FigmaConfig extends ToolConfig {
  reader: FigmaReaderConfig;
}

/**
 * Config for Figma as a `ReaderTool`
 */
export interface FigmaReaderConfig {
  tool: Tools.Figma;

  /** The URL for the figma file, get it though ENV */
  figmaFile: string;
  /** The secret for the figma file, get it though ENV */
  figmaSecret: string;

  /**
   * The config for the referencer
   */
  referencer?: FigmaReferencerConfig;

  /**
   * This is to verify that a given `Style` node found in figmas node tree is
   * considered to be a token or not
   */
  isTokenByStyle?: (style: Style) => boolean;

  /**
   * To retrieve the name for a token from a `Style`
   */
  getNameFromStyle?: (style: Style) => string;

  /**
   * This is to verify that a given `Node`found in figmas node tree is
   * considered to be a token or not, depending on the name of the node
   */
  isTokenByText?: (node: Node<'TEXT'>) => boolean;

  /**
   * To retrieve the name for a token from a `Node`
   */
  getNameFromText?: (node: Node<'TEXT'>) => string;

  /**
   * To retrieve the value for a token from a `Node`
   */
  getValueFromText?: (node: Node<'TEXT'>) => string;
}

// Referencer Options

/**
 * Figma does not support references of tokens, as such this information is
 * coming through another source, which is described here.
 *
 * @example
 *
 * Use with the theemo plugin:
 *
 * ```json
 * referencer: {
 *   type: 'figma-plugin',
 *   plugin: 'theemo',
 *   pluginOptions: {
 *     jsonbinFile: process.env.JSONBIN_FILE,
 *     jsonbinSecret: process.env.JSONBIN_SECRET,
 *     formats: {
 *       color: 'hex',
 *       colorAlpha: 'rgb'
 *     }
 *   }
 * }
 * ```
 */
export type FigmaReferencerConfig = FigmaReferencerPluginConfig & {
  type: FigmaReferencerType;
};

/**
 * The type of source for retrieving references
 */
export enum FigmaReferencerType {
  FigmaPlugin = 'figma-plugin'
}

/**
 * The interface to describe a figma plugin beind used as reference information
 */
export interface FigmaReferencerPluginConfig {
  type: FigmaReferencerType.FigmaPlugin;
  plugin: string;
  pluginConfig: FigmaTheemoPluginConfig & Record<string, unknown>;
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
