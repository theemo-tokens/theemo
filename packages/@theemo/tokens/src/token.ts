import type { ReferenceValue, TokenType, ValueFor } from './token-types';

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
}
