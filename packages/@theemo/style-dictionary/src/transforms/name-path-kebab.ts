import type StyleDictionary from 'style-dictionary';

/**
 * Transforms the name into kebap-case for usage as CSS custom properties
 *
 * @see [Extending Style Dictionary](https://theemo.io/sync/style-dictionary/extensions)
 */
export const namePathKebab: StyleDictionary.Transform = {
  type: 'name',
  transformer: (
    token: StyleDictionary.TransformedToken,
    platform?: StyleDictionary.Platform
  ): string => {
    return [platform?.prefix, ...token.path]
      .filter((part: unknown): part is string => typeof part === 'string')
      .join('-');
  }
};
