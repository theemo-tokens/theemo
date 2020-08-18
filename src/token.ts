/**
 * The usage level of a token
 *
 * @remarks
 * This is described in various ways, have a look at these references:
 *
 * - {@link https://gos.si/blog/full-featured-themes-in-figma/
 *   | Full Featured Themes in Figma (Gossmann)}
 *
 * - {@link
 *   https://uxdesign.cc/design-tokens-how-to-use-them-effectively-d495ff05cbbf
 *   | Design Tokens: How to use them effectivel (Manandhar)}
 *
 * - {@link https://dev.to/ynab/a-semantic-color-system-the-theory-hk7
 *   | The Theory: A Semantic Color System (Carlin)}
 */
export enum TokenType {
  /**
   * The default token type is unknown, until classified by you
   */
  Unknown = 'unknown',

  /**
   * A very low-level token type, e.g. a color of your palette
   */
  Basic = 'basic',

  /**
   * A token given a _semantic meaning_, e.g. the _action_ color
   * (referencing to a `basic` token)
   */
  Purpose = 'purpose',

  /**
   * A token for a _specific_ use-case. E.g. The heading color for
   * your hero component
   */
  Component = 'component'
}

/**
 * DTO to describe a Design Token
 */
export interface BaseToken {
  // Generic Properties

  /**
   * The tokens name
   */
  name: string;

  /**
   * The description for the token
   */
  description?: string;

  // classification

  /**
   * The type describes the usage level of a token
   */
  type: TokenType;

  /**
   * The category helps token manager tools to generate the respective value in
   * the appropriate format.
   *
   * @remarks
   * Resources:
   *
   * - {@link
   *   https://amzn.github.io/style-dictionary/#/properties?id=category-type-item
   *   | Style-Dictionary}
   *
   * - {@link
   *   https://github.com/salesforce-ux/theo#supported-categories
   *   | Theo}
   */
  category?: string;

  // context

  /**
   * Indicates the color scheme, to which the token belongs
   *
   * @remarks
   * Given the category is a color, then color scheme becomes relevant.
   * Since OS more and more adopting light and dark mode, there is also support
   * coming from browsers to detect for it and provide switchting mechanisms
   *
   * References:
   *
   * - {@link
   *   https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
   *   | @media (prefers-color-scheme) on MDN}
   */
  colorScheme?: string;

  // /**
  //  * Given the category is color, then color scheme becomes relevant.
  //  * For accessibility reasons, users may set their preference in OS/browsers.
  //  * With media queries this can be queried for and a wished preference can be provided.
  //  *
  //  * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast
  //  */
  // contrast: string;

  /**
   * The name of the reference this token points to
   */
  reference?: string;
}

export default interface Token extends BaseToken {
  /**
   * The tokens value
   */
  value?: string;
}
