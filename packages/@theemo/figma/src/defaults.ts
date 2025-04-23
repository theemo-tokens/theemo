import { ColorAlphaFormat, ColorFormat, type FigmaParserConfig } from './config';

import type { Node, Style } from './-figma-types.js';
import type { FigmaVariable } from './-figma-variable-types.js';
import type { FigmaToken } from './token.js';
import type { TokenType } from '@theemo/tokens';

// types for optional keys
// by https://gist.github.com/eddiemoore/7873191f366675e520e802a9fb2531d8

type Undefined<T> = { [P in keyof T]: P extends undefined ? T[P] : never };

type FilterFlags<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
};

type AllowedNames<Base, Condition> = FilterFlags<Base, Condition>[keyof Base];

type SubType<Base, Condition> = Pick<Base, AllowedNames<Base, Condition>>;

type OptionalKeys<T> = Exclude<keyof T, NonNullable<keyof SubType<Undefined<T>, never>>>;

type DefaultFigmaParserConfig = Omit<
  Required<Pick<FigmaParserConfig, OptionalKeys<FigmaParserConfig>>>,
  'getPropertiesForToken' | 'getConstraints'
>;

/**
 * You can configure the figma parser for the figma reader and the plugins. For
 * the config everything is optional, yet there are defaults being used.
 *
 * For plugin development, you'll receive the config with the defaults being
 * used. That's helpful for developing the plugin, as your IDE shows you, which
 * of the config has a default or not.
 */
export type FigmaParserConfigWithDefaults = FigmaParserConfig & DefaultFigmaParserConfig;

/**
 * Default implementation for {@link FigmaParserConfig.isTokenByStyle | `isTokenByStyle()`}
 *
 * Mimics Figma's behavior on handling styles beginning with a `.`
 *
 * @see [Documentation](/sync/figma/reader#istokenbystyle)
 * @param style Figma Style
 * @returns `false` when style starts with a `.`, otherwise `true`
 */
export function isTokenByStyle(style: Style): boolean {
  return !style.name.startsWith('.');
}

/**
 * Default implementation for {@link FigmaParserConfig.getNameFromStyle | `getNameFromStyle()`}
 *
 * Does the following things:
 * - replaces `/` with `.`
 * - removes a `.` when it is a prefix
 * - turns string into lower case
 *
 * @see [Documentation](/sync/figma/reader#getnamefromstyle)
 * @param style Figma Style
 * @returns normalized name
 */
export function getNameFromStyle(style: Style): string {
  return style.name
    .replaceAll('/', '.')
    .replace(/^\.(.+)/, '$1')
    .toLowerCase();
}

/**
 * Default implementation for {@link FigmaParserConfig.isTokenByText | `isTokenByText()`}
 *
 * @see [Documentation](/sync/figma/reader#istokenbytext)
 * @returns `false` - please implement your own
 */
export function isTokenByText() {
  return false;
}

/**
 * Default implementation for {@link FigmaParserConfig.getNameFromText | `getNameFromText()`}
 *
 * Returns the name of the node in lowercase
 *
 * @see [Documentation](/sync/figma/reader#getnamefromtext)
 * @param node Figma Text Node
 * @returns Normalized name
 */
export function getNameFromText(node: Node<'TEXT'>): string {
  return node.name.toLowerCase();
}

/**
 * Default implementation for {@link FigmaParserConfig.getValueFromText | `getValueFromText()`}
 *
 * Returns the text from the node
 *
 * @see [Documentation](/sync/figma/reader#getvaluefromtext)
 * @param node Figma Text Node
 * @returns text from the text node
 */
export function getValueFromText(node: Node<'TEXT'>): string {
  return node.characters;
}

/**
 * Default implementation for {@link FigmaParserConfig.isTokenByVariable | `isTokenByVariable()`}
 *
 * Considers the variable to a token when:
 * - It is a published variable
 * - The variable is not of type boolean
 *
 * @see [Documentation](/sync/figma/reader#istokenbyvariable)
 * @param variable Figma Variable
 * @returns `true` when the variable should be considered as token
 */
export function isTokenByVariable(variable: FigmaVariable): boolean {
  return !variable.hiddenFromPublishing && variable.resolvedType !== 'BOOLEAN';
}

/**
 * Default implementation for {@link FigmaParserConfig.getNameFromVariable | `getNameFromVariable()`}
 *
 * Replaces `/` with `.`
 *
 * @see [Documentation](/sync/figma/reader#getnamefromvariable)
 * @param variable Figma Variable
 * @returns normalized name
 */
export function getNameFromVariable(variable: FigmaVariable): string {
  return variable.name.replaceAll('/', '.').toLowerCase();
}

/**
 * Default implementation for {@link FigmaParserConfig.getTypeFromToken | `getTypeFromToken()`}
 *
 * @see [Documentation](/sync/figma/reader#gettypefromtoken)
 * @param token A parsed Figma Token
 * @returns the parsed type
 */
export function getTypeFromToken(token: FigmaToken) {
  return token.type as TokenType;
}

/**
 * @internal
 */
export const DEFAULT_PARSER_CONFIG: DefaultFigmaParserConfig = {
  isTokenByStyle,
  getNameFromStyle,
  isTokenByText,
  getNameFromText,
  getValueFromText,
  isTokenByVariable,
  getNameFromVariable,
  getTypeFromToken,
  considerMode() {
    return false;
  },
  formats: {
    color: ColorFormat.Hex,
    colorAlpha: ColorAlphaFormat.Rgb
  }
};
