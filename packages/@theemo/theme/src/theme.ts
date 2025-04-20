import { type Feature, validateFeature } from './features';

import type { ValidationResult } from './validation';

// export type Scope = string;

export interface Theme {
  name: string;
  file: string;
  features?: Feature[];
  // scopes?: Scope[];
}

export function validateTheme(theme: Theme): ValidationResult {
  const errors: string[] = [];

  if (!theme.name) {
    errors.push(`Theme requires 'name'`);
  }

  if (!theme.file) {
    errors.push(`Theme '${theme.name}' requires 'file'`);
  }

  for (const feature of theme.features ?? []) {
    errors.push(...validateFeature(feature).errors);
  }

  return {
    success: errors.length === 0,
    errors
  };
}
