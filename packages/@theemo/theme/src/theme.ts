export type Scope = string;

export interface Theme {
  name: string;
  features?: Record<string, string[]>;
  scopes?: Scope[];
}
