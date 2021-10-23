import LexerConfig from './lexer/config';
import ReaderConfig from './reader/config';
import WriterConfig from './writer/config';

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
export default interface SyncConfig {
  /** Config for reading tokens from external source */
  reader: ReaderConfig;
  /** Config to _make sense_ of your tokens, as you need them in your domain */
  lexer: LexerConfig;
  /** Config to write them onto the disk for your used token manager tool */
  writer: WriterConfig;
}
