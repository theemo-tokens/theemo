export interface SchemeConfig {
  file?: string;
  auto: boolean;
  manual: boolean;
  selector?: string;
}

export default interface GenerateConfig {
  input: string;
  output?: string;
  base?: string;
  auto: boolean;
  defaultColorScheme?: string;
  colorSchemes?: {
    [key: string]: SchemeConfig;
  };
}
