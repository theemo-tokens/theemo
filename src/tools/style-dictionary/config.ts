import Token from '../../token';
import ToolConfig from '../config';
import { Tools } from '../tool';

/**
 * Config for Style Dictionary
 *
 * Style Dictionary is used as `WriterTool` and `BuilderTool` - yet there is
 * only the part of `writer` you can further parametrize.
 */
export interface StyleDictionaryConfig extends ToolConfig {
  writer: StyleDictionaryWriterConfig;
}

/**
 * The config for Style Dicitionary being used as `WriterTool`.
 *
 * @remarks
 * The result from `Lexer` is pushed into the writer. Such, the configuration
 * requires you to provide a folder for named groups, the file for the
 * respective token and the "path" (the canonical name of the token, so to say)
 * within that file.
 */
export interface StyleDictionaryWriterConfig {
  tool: Tools.StyleDictionary;

  /**
   * The file for the given token.
   */
  fileForToken: (token: Token) => string;

  /**
   * The path (the canonical name) of the token
   */
  pathForToken: (token: Token) => string[];

  /**
   * The folder for the named group
   */
  folderForGroup?: (group: string) => string;
}
