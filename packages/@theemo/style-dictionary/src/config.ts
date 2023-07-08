import type { Token, TokenCollection } from '@theemo/core';

/**
 * The config for Style Dicitionary being used as `WriterTool`.
 *
 * @remarks
 * The result from `Lexer` is pushed into the writer. Such, the configuration
 * requires you to provide the file for the respective token and the "path"
 * (the canonical name of the token, so to say) within that file.
 */
export interface StyleDictionaryWriterConfig {
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
  valueForToken?: (token: Token, tokens: TokenCollection) => string | undefined;

  /**
   * Customize the data for a token
   */
  dataForToken?: (token: Token) => Record<string, unknown>;
}