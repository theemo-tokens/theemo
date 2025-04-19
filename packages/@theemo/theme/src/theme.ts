import type { Feature } from './features';

export type Scope = string;

export interface Theme {
  name: string;
  file: string;
  features?: Feature[];
  // scopes?: Scope[];
}
