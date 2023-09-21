export type { FigmaReaderConfig } from './config.js';
export { ColorAlphaFormat, ColorFormat, defineReaderConfig } from './config.js';
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
export { figmaReader } from './tool.js';
