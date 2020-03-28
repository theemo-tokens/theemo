export enum TokenType {
  Unknown = 'unknown',
  Basic = 'basic',
  Purpose = 'purpose',
  Component = 'component'
}

/**
 * DTO to describe a Design Token
 */
export default interface Token {
  // Generic Properties
  name: string;

  description?: string;

  // classification

  type: TokenType;

  // /**
  //  * This is based on the assumption, contexts are generic. Hence they aren't,
  //  * e.g. better to be divided into color-scheme and contrast (to match their
  //  * css media query counterparts). Overall, that should be expressed by tags
  //  *
  //  * @deprecated
  //  */
  // context: string;

  /**
   * The category helps token manager tools to run transforms based on that.
   *
   * @see https://amzn.github.io/style-dictionary/#/properties?id=category-type-item
   * @see https://github.com/salesforce-ux/theo#supported-categories
   */
  category?: string;

  // context

  /**
   * Given the category is a color, then color scheme becomes relevant.
   * Since OS more and more adopting light and dark mode, there is also support
   * coming from browsers to detect for it and provide switchting mechanisms
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
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

  // Value Properties

  /** Any  */
  reference?: string;

  value?: string;

  color?: {
    r: number;
    g: number;
    b: number;
    a: number;
    visible: boolean;
  };
}
