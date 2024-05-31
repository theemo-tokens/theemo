import type { File, Node, Style } from './-figma-types.js';
import type { FigmaVariable } from './-figma-variable-types.js';
import type { Plugin } from './plugin.js';
import type { FigmaToken } from './token.js';
import type { Constraints, TokenType, TokenValue } from '@theemo/tokens';

/**
 * Options to generate (non-alpha) color format
 */
export enum ColorFormat {
  /**
   * With `rgb()`
   *
   * @see [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value)
   */
  Rgb = 'rgb',

  /**
   * In hex format
   *
   * @see [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value)
   */
  Hex = 'hex',

  /**
   * With `hsl()`
   *
   * @see [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value)
   */
  Hsl = 'hsl'
}

/**
 * Options to generate color in alpha format
 */
export enum ColorAlphaFormat {
  /**
   * With `rgba()`
   *
   * @see [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value)
   */
  Rgb = 'rgb',

  /**
   * With `hsl()`
   *
   * @see [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value)
   */
  Hsl = 'hsl'
}

/**
 * Color format generation options
 */
export interface ColorConfig {
  color: ColorFormat;
  colorAlpha: ColorAlphaFormat;
}

/**
 * Configuration for Figma Parser
 */
export interface FigmaParserConfig {
  //
  // style tokens
  //

  /**
   * This is to verify that a given `Style` node found in figmas node tree is
   * considered to be a token or not
   *
   * @see [Documentation](https://theemo.io/sync/figma/reader#istokenbystyle)
   * @see {@link isTokenByStyle | Default implementation}
   * @param style Figma Style
   * @returns true, when this style should be considered a token
   */
  isTokenByStyle?: (style: Style) => boolean;

  /**
   * To retrieve the name for a token from a `Style`
   *
   * @see [Documentation](https://theemo.io/sync/figma/reader#getnamefromstyle)
   * @see {@link getNameFromStyle | Default implementation}
   * @param style Figma Style
   * @returns the name for the given style
   */
  getNameFromStyle?: (style: Style) => string;

  //
  // text node tokens
  //

  /**
   * This is to verify that a given `Node`found in figmas node tree is
   * considered to be a token or not, depending on the name of the node
   *
   * @see [Documentation](https://theemo.io/sync/figma/reader#istokenbytext)
   * @see {@link isTokenByText | Default implementation}
   * @param node Figma Text Node
   * @returns true, when this text node should be considered a token
   */
  isTokenByText?: (node: Node<'TEXT'>) => boolean;

  /**
   * To retrieve the name for a token from a `Node`
   *
   * @see [Documentation](https://theemo.io/sync/figma/reader#getnamefromtext)
   * @see {@link getNameFromText | Default implementation}
   * @param node Figma Text Node
   * @returns the token name for the text node
   */
  getNameFromText?: (node: Node<'TEXT'>) => string;

  /**
   * To retrieve the value for a token from a `Node`
   *
   * @see [Documentation](https://theemo.io/sync/figma/reader#getvaluefromtext)
   * @see {@link getValueFromText | Default implementation}
   * @param node Figma Text Node
   * @returns the token value of that text node
   */
  getValueFromText?: (node: Node<'TEXT'>) => TokenValue<'unknown'>;

  //
  // variable tokens
  //

  /**
   * Should this variable be considered a token, or not?
   *
   * @see [Documentation](https://theemo.io/sync/figma/reader#istokenbyvariable)
   * @see {@link isTokenByVariable | Default implementation}
   * @param variable Figma Variable
   * @returns true, when this variable is considered to be atoken
   */
  isTokenByVariable?: (variable: FigmaVariable) => boolean;

  /**
   * Retrieve the token name for the given variable
   *
   * @see [Documentation](https://theemo.io/sync/figma/reader#getnamefromvariable)
   * @see {@link getNameFromVariable | Default implementation}
   * @param variable Figma Variable
   * @returns the token name for the variable
   */
  getNameFromVariable?: (variable: FigmaVariable) => string;

  /**
   * Should this mode considered to be used for tokens?
   *
   * @see [Documentation](https://theemo.io/sync/figma/reader#considermode)
   * @param mode the name of the mode
   * @returns true, when the mode is used for tokens
   */
  considerMode?: (mode: string) => boolean;

  /**
   * Returns the constraints for a considered mode
   *
   * @see [Documentation](https://theemo.io/sync/figma/reader#getconstraints)
   * @see [Theming](https://theemo.io/design-tokens/theming)
   * @param mode the name of the mode
   * @param variable Figma Variable
   * @returns the constraints for the given mode
   */
  getConstraints?: (mode: string, variable: FigmaVariable) => Constraints | undefined;

  //
  // misc
  //

  /**
   * When the type of a token was detected incorrectly or is missing for some
   * other reasons, here is a chance to provide it
   *
   * @see [Documentation](https://theemo.io/sync/figma/reader#gettypefromtoken)
   * @param token Figma Token
   * @returns the type of a token
   */
  getTypeFromToken?: (token: FigmaToken) => TokenType;

  /**
   * Add properties relevant for you to the token.
   *
   * @see [Documentation](https://theemo.io/sync/figma/reader#getpropertiesfortoken)
   * @param token Figma Token
   * @param document The Figma File from which this token was sourced
   * @returns an object with properties
   */
  getPropertiesForToken?: (token: FigmaToken, document: File) => Record<string, unknown>;

  /**
   * The formats in which tokens are written to disk
   */
  formats?: ColorConfig;
}

/**
 * Config for Figma as a `ReaderTool`
 *
 * @see [Documentation](https://theemo.io/sync/figma/reader)
 */
export interface FigmaReaderConfig {
  /**
   * The secret for the figma file, get it though ENV
   *
   * @see [Connecting to Figma](https://theemo.io/sync/figma/reader#connecting-to-figma)
   */
  secret: string;

  /**
   * The files your want to source. An array of Figma file IDs
   *
   * @see [Documentation](https://theemo.io/sync/figma/reader#files)
   */
  files: string[];

  /**
   * Bring plugin support
   *
   * @see [Configuring plugins](https://theemo.io/sync/figma/reader#plugins)
   * @see [Write your own plugin](https://theemo.io/sync/figma/plugins)
   */
  plugins: Plugin[];

  /**
   * Parser configuration how to interpret your Figma files and extract the
   * tokens you want
   */
  parser: FigmaParserConfig;
}

/**
 * Figma reader config with auto-completion support for your IDE
 *
 * @param config your config =)
 * @returns the config for `figmaReader()`
 */
export function defineReaderConfig(config: FigmaReaderConfig): FigmaReaderConfig {
  return config;
}
