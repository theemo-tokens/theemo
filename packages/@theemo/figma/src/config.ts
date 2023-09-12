import type { FigmaVariable, Variable } from './-figma-variable-types.js';
import type { Plugin } from './plugin.js';
import type { FigmaToken } from './token.js';
import type { Constraints, TokenType, TokenValue } from '@theemo/core';
import type { Node, Style } from 'figma-api';
import type { GetFileResult } from 'figma-api/lib/api-types.js';

export enum ColorFormat {
  Rgb = 'rgb',
  Hex = 'hex',
  Hsl = 'hsl'
}

export enum ColorAlphaFormat {
  Rgb = 'rgb',
  Hsl = 'hsl'
}

export interface ColorConfig {
  color: ColorFormat;
  colorAlpha: ColorAlphaFormat;
}

export interface FigmaParserConfig {
  //
  // style tokens
  //

  /**
   * This is to verify that a given `Style` node found in figmas node tree is
   * considered to be a token or not
   */
  isTokenByStyle?: (style: Style) => boolean;

  /**
   * To retrieve the name for a token from a `Style`
   */
  getNameFromStyle?: (style: Style) => string;

  //
  // text node tokens
  //

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
  getValueFromText?: (node: Node<'TEXT'>) => TokenValue<'unknown'>;

  //
  // variable tokens
  //

  isTokenByVariable?: (variable: FigmaVariable) => boolean;

  getNameFromVariable?: (variable: FigmaVariable) => string;

  considerMode?: (mode: string) => boolean;

  getConstraints?: (mode: string, variable: FigmaVariable) => void | Constraints;

  //
  // misc
  //

  /**
   * To retrieve the type of a token
   */
  getTypeFromToken?: (token: FigmaToken) => TokenType;

  /**
   * Add properties relevant for you to the token
   */
  getPropertiesForToken?: (token: FigmaToken, document: GetFileResult) => Record<string, unknown>;

  formats?: ColorConfig;
}

/**
 * Config for Figma as a `ReaderTool`
 */
export interface FigmaReaderConfig {
  /** The secret for the figma file, get it though ENV */
  secret: string;

  /** The URL for the figma file, get it though ENV */
  files: string[];

  plugins: Plugin[];

  parser: FigmaParserConfig;
}

export interface FigmaConfig {
  reader: FigmaReaderConfig;
}

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

export type FigmaParserConfigWithDefaults = FigmaParserConfig & DefaultFigmaParserConfig;

export function isTokenByStyle(style: Style) {
  return !style.name.startsWith('.');
}

export function getNameFromStyle(style: Style) {
  return style.name
    .replaceAll('/', '.')
    .replace(/^\.(.+)/, '$1')
    .toLowerCase();
}

export function isTokenByText() {
  return false;
}

export function getNameFromText(node: Node<'TEXT'>) {
  return node.name.toLowerCase();
}

export function getValueFromText(node: Node<'TEXT'>) {
  return node.characters;
}

export function isTokenByVariable(variable: Variable) {
  return !variable.hiddenFromPublishing && variable.resolvedType !== 'BOOLEAN';
}

export function getNameFromVariable(variable: FigmaVariable) {
  return variable.name.replaceAll('/', '.').toLowerCase();
}

/**
 * To retrieve the type of a token
 */
export function getTypeFromToken(token: FigmaToken) {
  return token.type as TokenType;
}

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

export function defineReaderConfig(config: FigmaReaderConfig): FigmaReaderConfig {
  return config;
}
