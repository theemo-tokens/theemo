import type { File, Node, Style } from './-figma-types.js';
import type { FigmaVariable } from './-figma-variable-types.js';
import type { Token, TokenType } from '@theemo/tokens';

/**
 * The `FigmaToken` used in the `figmaReader`.
 *
 * Extends the Token from `@theemo/token` with additional Figma properties
 */
export interface FigmaToken<T extends TokenType = 'unknown'> extends Token<T> {
  /**
   * The extended Figma properties
   */
  figma: {
    /**
     * The file from where the token was sourced
     */
    file: File;

    /**
     * The respective node at which the token was found
     */
    node?: Node;

    /**
     * The related `Style` node the token was found
     */
    style?: Style;

    /**
     * The related `FigmaVariable` the token token was found
     */
    variable?: FigmaVariable;
  };
}
