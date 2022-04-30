import Token from '../../token.js';
import TokenCollection from '../../token-collection.js';
import ToolConfig from '../config.js';
import { Tools } from '../tool.js';

/**
 * The config for Style Dicitionary being used as `WriterTool`.
 *
 * @remarks
 * The result from `Lexer` is pushed into the writer. Such, the configuration
 * requires you to provide the file for the respective token and the "path"
 * (the canonical name of the token, so to say) within that file.
 */
export interface StyleDictionaryWriterConfig {
  tool: Tools.StyleDictionary;

  /**
   * The directory to which the tokens are written to
   *
   * @defaultValue tokens
   */
  directory?: string;

  /**
   * The file for the given token.
   */
  fileForToken: (token: Token) => string;

  /**
   * The path (the canonical name) of the token
   */
  pathForToken: (token: Token) => string[];

  /**
   * The value for the given token
   */
  valueForToken?: (token: Token, tokens: TokenCollection) => string;

  /**
   * Customize the data for a token
   */
  dataForToken?: (token: Token) => Record<string, unknown>;
}

/**
 * Config for Style Dictionary
 *
 * Style Dictionary is used as `WriterTool` and `BuilderTool` - yet there is
 * only the part of `writer` you can further parametrize.
 */
export interface StyleDictionaryConfig extends ToolConfig {
  writer: StyleDictionaryWriterConfig;
}
