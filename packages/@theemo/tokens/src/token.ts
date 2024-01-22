import type { ReferenceValue, TokenType, ValueFor } from './token-types';

/**
 * Token, with all properties shared amongst various token types used
 * throughout theemo.
 *
 * @remarks
 *
 * Definitions for token:
 *
 * > "The single source of truth to name and store a design decision, distributed so teams can use it across design tools and coding languages." (Design Tokens Community Group)
 *
 * > "Design Tokens are a methodology. IMHO, saying "design tokens are just variables" is like saying "responsive design is just media queries". It's a technology-agnostic architecture and process for scaling design across multiple platforms and devices, including native, and more." (Jina Anne)
 *
 * > "Design Tokens, Decisions Propagated Through a System" (Nathan Curtis)
 */
export interface Token<T extends TokenType = 'unknown'> {
  /**
   * The tokens name
   *
   * @see [Design Tokens Format Module](https://tr.designtokens.org/format/#name-and-value)
   * @see [DTCG Glossary (Design Token Name)](https://www.designtokens.org/glossary/#design-token-name)
   */
  name: string;

  /**
   * The description for the token
   *
   * @see [Design Tokens Format Module](https://tr.designtokens.org/format/#description)
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
   * @see [Design Tokens Format Module](https://tr.designtokens.org/format/#types)
   * @see [DTCG Glossary (Design Token Type)](https://www.designtokens.org/glossary/#design-token-type)
   */
  type?: T | TokenType;

  /**
   * The tokens computed value
   *
   * @remarks
   *
   * References:
   *
   * @see [DTCG Glossary (Design Token Value)](https://www.designtokens.org/glossary/#design-token-value)
   */
  value?: ValueFor<T> | ReferenceValue;
}
