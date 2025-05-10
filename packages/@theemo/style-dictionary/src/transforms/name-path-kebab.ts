import type { PlatformConfig, Transform, TransformedToken } from 'style-dictionary/types';

export function transformPathToKebapName(
  token: TransformedToken,
  config: PlatformConfig = { prefix: undefined }
): string {
  return [config.prefix, ...token.path]
    .filter((part: unknown): part is string => typeof part === 'string')
    .join('-');
}

/**
 * Transforms the name into kebap-case for usage as CSS custom properties
 *
 * @see [Extending Style Dictionary](https://theemo.io/sync/style-dictionary/extensions)
 */
export const namePathKebabTransform: Transform = {
  name: 'name/path/kebab',
  type: 'name',
  // @ts-expect-error for backwards compatibility
  transformer: transformPathToKebapName,
  transform: transformPathToKebapName
};
