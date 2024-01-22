import type { Token, TokenCollection } from '@theemo/tokens';

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
   *
   * @param token the Token
   * @return the file path
   */
  fileForToken: (token: Token) => string;

  /**
   * The path (the canonical name) of the token
   *
   * @param token the Token
   * @return the segments of the name
   */
  pathForToken: (token: Token) => string[];

  /**
   * The value for the given token
   *
   * @param token the Token
   * @param tokens all tokens
   * @return the value for the given token
   */
  valueForToken?: (token: Token, tokens: TokenCollection) => string | undefined;

  /**
   * Customize the data for a token
   *
   * @param token the Token
   * @returns additional properties for a token
   */
  dataForToken?: (token: Token) => Record<string, unknown>;
}
