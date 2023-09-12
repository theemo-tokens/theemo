import type { ReferenceValue, TokenType, ValueFor } from './token-types.js';

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
export enum TokenTier {
  /**
   * The default token type is unknown, until classified by you
   */
  Unknown = 'unknown',

  /**
   * A very low-level token tier, e.g. a color of your palette
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
  Specific = 'specific'
}

/**
 * The base token, with all properties shared amongst various token types used
 * throughout theemo.
 *
 * @remarks
 *
 * That is, figma is subclassing this with its own token and specific
 * figma-related properties.
 */
export interface Token<T extends TokenType = 'unknown'> {
  // Generic Properties

  /**
   * The tokens name
   *
   * @remarks
   *
   * References:
   *
   * - {@link https://tr.designtokens.org/format/#name-and-value| Design Tokens Format Module}
   *
   * - {@link https://www.designtokens.org/glossary/#design-token-name | DTCG Glossary (Design Token Name)}
   */
  name: string;

  /**
   * The description for the token
   *
   * @remarks
   *
   * References:
   *
   * - {@link https://tr.designtokens.org/format/#description | Design Tokens Format Module}
   *
   */
  description?: string;

  // classification

  /**
   * The type helps token translation tools to generate the respective value in
   * the appropriate format.
   *
   * @remarks
   *
   * Resources:
   *
   * - {@link https://tr.designtokens.org/format/#types | Design Tokens Format Module}
   * - {@link https://www.designtokens.org/glossary/#design-token-type | DTCG Glossary (Design Token Type)}
   * - {@link https://amzn.github.io/style-dictionary/#/tokens?id=category-type-item | Style-Dictionary}
   * - {@link https://github.com/salesforce-ux/theo#supported-categories | Theo}
   */
  type?: T | TokenType;

  /**
   * The tokens computed value
   *
   * @remarks
   *
   * References:
   *
   * - {@link https://www.designtokens.org/glossary/#design-token-value  | DTCG Glossary (Design Token Value)}
   */
  value?: ValueFor<T> | ReferenceValue;

  /**
   * The name of the reference this token points to
   */
  reference?: string;

  /**
   * The tier describes the usage level of a token
   */
  tier?: TokenTier;

  /**
   * Optional transforms to run on the reference token
   */
  transforms?: Partial<Record<'hue' | 'saturation' | 'lightness' | 'opacity', number>>;
}
