import type { File } from './-figma-types.js';
import type { FigmaParserConfigWithDefaults } from './defaults.js';
import type { FigmaToken } from './token.js';
import type { Token, TokenCollection } from '@theemo/tokens';

/**
 * A `Plugin` which can be used to help parse tokens when being used in the `figmaReader()`
 *
 * @see [Plugin Documentation](https://theemo.io/sync/figma/plugins)
 */
export interface Plugin {
  /**
   * Any setup step required for your plugin.
   *
   * @param config Receivse the Figma Reader Parser config with defaults
   */
  setup?(config: FigmaParserConfigWithDefaults): Promise<void> | void;

  /**
   * Figma plugins can store data and make it accessible through the REST API.
   *
   * Your reader plugin has the chance to read that information here.
   *
   * The value here will be appended when making a GET request to Figma. Such as:
   *
   * ```
   * GET /v1/files/:key?plugin_data=S{YOUR_PLUGIN_DATA}
   * ```
   *
   * @see [Figma REST API](https://www.figma.com/developers/api#get-files-endpoint)
   */
  getPluginData?(): string;

  /**
   * Any additional properties to a token, that your plugin is fetching can be
   * attached to the token here
   *
   * @see {@link FigmaParserConfig.getProperties}
   * @param token the FigmaToken
   * @returns any additional token properties from your plugin
   */
  getProperties?(token: FigmaToken): Partial<Token>;

  /**
   * Your plugin can parse a source file
   *
   * @param file the entire file itself
   * @param fileId the fileId
   */
  parse?(file: File, fileId: string): TokenCollection<FigmaToken>;

  /**
   * Resolving tokens, in case your plugin stores information needed to resolve
   * tokens. Use this method to support resolving tokens.
   *
   * @param token the token to be resolved
   * @param tokens all tokens
   */
  resolve?(token: FigmaToken, tokens: TokenCollection<FigmaToken>): FigmaToken;
}
