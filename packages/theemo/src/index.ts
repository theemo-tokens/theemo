/**
 * The yordle powered theme automator
 *
 * @packageDocumentation
 */

import Theemo from './theemo.js';

import type TheemoConfig from './config.js';

// api docs

export default Theemo;

export type { TheemoConfig };
export type { BaseToken, default as Token, TokenTier } from './token.js';

// config
export type { default as GenerateConfig } from './generate/config.js';
export type { default as SyncConfig } from './sync/config.js';
export type { default as LexerConfig } from './sync/lexer/config.js';
export type { default as ReaderConfig } from './sync/reader/config.js';
export type { default as WriterConfig } from './sync/writer/config.js';

// tools
export type {
  FigmaReaderConfig,
  FigmaReferencerConfig,
  FigmaReferencerPluginConfig,
  FigmaReferencerType,
} from './tools/figma/config.js';
export type { default as Figma } from './tools/figma/index.js';
export type { FigmaTheemoPluginConfig } from './tools/figma/referencers/theemo-plugin.js';
export type {
  StyleDictionaryConfig,
  StyleDictionaryWriterConfig,
} from './tools/style-dictionary/config.js';
export type { default as StyleDictionary } from './tools/style-dictionary/index.js';
export type { ReaderTool, Tools, WriterTool } from './tools/tool.js';
