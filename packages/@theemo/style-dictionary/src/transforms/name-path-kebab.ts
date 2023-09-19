import type StyleDictionary from 'style-dictionary';

export const namePathKebab: StyleDictionary.Transform = {
  type: 'name',
  transformer: (
    token: StyleDictionary.TransformedToken,
    platform?: StyleDictionary.Platform
  ): string => {
    // console.log(token.value);

    return [platform?.prefix, ...token.path]
      .filter((part: unknown): part is string => typeof part === 'string')
      .join('-');
  }
};
