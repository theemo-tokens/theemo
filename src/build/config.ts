export interface SchemeConfig {
  file?: string;
  activation: 'auto' | 'manual';
  manual: boolean;
}

export default interface BuildConfig {
  enabled: boolean;
  input: string;
  output: string;
  base?: string;
  activation: 'auto' | 'manual';
  defaultColorScheme?: string;
  colorSchemes?: {
    [key: string]: SchemeConfig;
  };
}
