import type { BuildFeature } from './features';
import type { CustomAtRules, TransformOptions } from 'lightningcss';

/**
 * Config for building a theme
 */
export interface BuildConfig {
  /**
   * Specify the output directory
   *
   * @default `dist`
   */
  outDir?: string;

  /**
   * The files that will be concatenated into the output file
   */
  files?: string[];

  /**
   * Instructions for how to build the features
   */
  features?: BuildFeature[];

  /**
   * Wrap the outputted file in a CSS `@layer`
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@layer
   */
  layerName?: string;

  /**
   * Lightning CSS is used for postprocess. You can pass options to lightning
   * css here or turn it off entirely.
   *
   * @default `true`
   */
  lightningcss?: boolean | Omit<TransformOptions<CustomAtRules>, 'code' | 'filename'>;
}

// types for optional keys
// by https://gist.github.com/eddiemoore/7873191f366675e520e802a9fb2531d8

type Undefined<T> = { [P in keyof T]: P extends undefined ? T[P] : never };

type FilterFlags<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
};

type AllowedNames<Base, Condition> = FilterFlags<Base, Condition>[keyof Base];

type SubType<Base, Condition> = Pick<Base, AllowedNames<Base, Condition>>;

type OptionalKeys<T> = Exclude<keyof T, NonNullable<keyof SubType<Undefined<T>, never>>>;

type DefaultBuildConfig = Omit<
  Required<Pick<BuildConfig, OptionalKeys<BuildConfig>>>,
  'output' | 'files' | 'layerName'
>;

export type BuildConfigWithDefaults = BuildConfig & DefaultBuildConfig;

export const DEFAULT_CONFIG: Partial<BuildConfig> = {
  outDir: 'dist',
  features: [] as BuildFeature[],
  lightningcss: true
};

export function configWithDefaults(config: BuildConfig): BuildConfigWithDefaults {
  return {
    ...DEFAULT_CONFIG,
    ...config
  } as BuildConfigWithDefaults;
}
