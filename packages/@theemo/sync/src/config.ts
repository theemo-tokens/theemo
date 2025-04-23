import type { LexerConfig } from './lexer/config.js';
import type { ReaderConfig } from './reader/config.js';
import type { WriterConfig } from './writer/config.js';

/**
 * The config used to configure the `theemo sync` command.
 *
 * `sync` consists of three steps:
 *
 * 1. reading
 * 2. lexing
 * 3. writing
 *
 * See the config for each respective step. Reading and writing is expressed
 * through the supported tools.
 */
export interface SyncConfig {
  /** Config for reading tokens from external source */
  reader: ReaderConfig;
  /** Config to _make sense_ of your tokens, as you need them in your domain */
  lexer: LexerConfig;
  /** Config to write them onto the disk for your used token manager tool */
  writer: WriterConfig;
}

export function defineConfig(config: SyncConfig): SyncConfig {
  return config;
}
