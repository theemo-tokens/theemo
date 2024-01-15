/**
 * @packageDocumentation
 *
 * Packages contains a reader to sync tokens from Figma. Also allows you to read
 * Figma Plugins.
 *
 * ## Installation
 *
 * ```sh
 * pnpm add -D @theemo/figma
 * ```
 */

export type { File, Node, Style } from './-figma-types.js';
export type { FigmaVariable } from './-figma-variable-types.js';
export type {
  ColorAlphaFormat,
  ColorConfig,
  ColorFormat,
  FigmaParserConfigWithDefaults,
  FigmaReaderConfig
} from './config.js';
export {
  DEFAULT_PARSER_CONFIG,
  getNameFromStyle,
  getNameFromText,
  getNameFromVariable,
  getTypeFromToken,
  getValueFromText,
  isTokenByStyle,
  isTokenByText,
  isTokenByVariable
} from './config.js';
export type { Plugin } from './plugin.js';
export { theemoPlugin } from './plugins/theemo.js';
export type { FigmaToken } from './token.js';
export { figmaReader } from './tool.js';
