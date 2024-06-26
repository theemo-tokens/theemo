import type { DesignTokens } from 'style-dictionary';
import type StyleDictionary from 'style-dictionary';

/**
 * Parses json and replace `$value` with `value` and `$description`
 * with `comment` to make it work with style dictionary
 *
 * From {@link https://github.com/lukasoppermann/style-dictionary-utils}
 *
 * @see [Extending Style Dictionary](https://theemo.io/sync/style-dictionary/extensions)
 * @author Lukas Oppermann
 */
export const w3cTokenJsonParser: StyleDictionary.Parser = {
  pattern: /\.json$|\.tokens\.json$|\.tokens$/,
  parse: ({ contents }: { contents: string }) => {
    const preparedContent = (contents || '{}')
      // replace $value with value so that style dictionary recognizes it
      .replace(/"\$?value"\s*:/g, '"value":')
      // replace $type with type
      .replace(/"\$?type"\s*:/g, '"type":')
      // convert $description to comment
      .replace(/"\$?description"\s*:/g, '"comment":');

    return JSON.parse(preparedContent) as DesignTokens;
  }
};
