/**
 * The yordle powered theme automator
 *
 * @packageDocumentation
 */

import TheemoConfig from './config.js';
import Theemo from './theemo.js';

// api docs

export default Theemo;

export type { TheemoConfig };
export type { default as Token, BaseToken, TokenTier } from './token';

// config
export type { default as SyncConfig } from './sync/config';
export type { default as ReaderConfig } from './sync/reader/config';
export type { default as LexerConfig } from './sync/lexer/config';
export type { default as WriterConfig } from './sync/writer/config';
export type { default as GenerateConfig } from './generate/config';

// tools
export type { Tools, ReaderTool, WriterTool } from './tools/tool';
export type { default as Figma } from './tools/figma';
export type { default as StyleDictionary } from './tools/style-dictionary';
export type {
  FigmaReaderConfig,
  FigmaReferencerConfig,
  FigmaReferencerType,
  FigmaReferencerPluginConfig
} from './tools/figma/config';
export type { FigmaTheemoPluginConfig } from './tools/figma/referencers/theemo-plugin';
export type {
  StyleDictionaryConfig,
  StyleDictionaryWriterConfig
} from './tools/style-dictionary/config';
