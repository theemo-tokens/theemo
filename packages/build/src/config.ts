import type { BuildFeature } from './features';
import type { CustomAtRules, TransformOptions } from 'lightningcss';

export interface BuildConfig {
  outDir?: string;
  files?: string[];
  features?: BuildFeature[];
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
  'output' | 'files'
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
