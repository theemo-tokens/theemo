import type { DesignTokens, Parser } from 'style-dictionary/types';

function parse({ contents }: { contents: string }) {
  const preparedContent = (contents || '{}')
    // replace $value with value so that style dictionary recognizes it
    .replace(/"\$?value"\s*:/g, '"value":')
    // replace $type with type
    .replace(/"\$?type"\s*:/g, '"type":')
    // convert $description to comment
    .replace(/"\$?description"\s*:/g, '"comment":');

  return JSON.parse(preparedContent) as DesignTokens;
}

/**
 * The W3C parser is able to read the [W3C token
 * format](https://tr.designtokens.org/format/) and is recommended for Style
 * Dictionary v3.
 *
 * From {@link https://github.com/lukasoppermann/style-dictionary-utils}
 *
 * @example
 *
 * Usage:
 *
 * ```js
 * import StyleDictionary from 'style-dictionary';
 * import { w3cTokenJsonParser } from '@theemo/style-dictionary';
 *
 * StyleDictionary.registerParser(w3cTokenJsonParser);
 * ```
 *
 * @see [Extending Style Dictionary](https://theemo.io/sync/style-dictionary/extensions)
 * @author Lukas Oppermann
 */
export const w3cTokenJsonParser: Parser = {
  pattern: /\.json$|\.tokens\.json$|\.tokens$/,
  // @ts-expect-error for backwards compatibility
  parse,
  parser: parse
};
