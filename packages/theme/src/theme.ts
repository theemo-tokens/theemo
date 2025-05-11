import { type Feature, validateFeature } from './features';

import type { ValidationResult } from './validation';

// export type Scope = string;

/**
 * Describes a theme with its name and features
 *
 * @example
 *
 * Used in `package.json`:
 *
 * ```jsonc
 * // package.json
 * {
 *   "name": "your-package",
 *   "theemo": {
 *     // your theme described here
 *   }
 * }
 * ```
 */
export interface Theme {
  name: string;
  features?: Feature[];
  // scopes?: Scope[];
}

/**
 * Validates a theme for being correct
 *
 * @example
 *
 * Check for a valid theme:
 *
 * ```ts
 * const validation = validateTheme(myTheme);
 *
 * if (validation.success) {
 *   // proceed with valid theme
 * } else {
 *   console.log(validation.errors);
 * }
 * ```
 *
 *
 * @param pkg the given theme
 * @returns the validation result
 */
export function validateTheme(theme: Theme): ValidationResult {
  const errors: string[] = [];

  if (!theme.name) {
    errors.push(`Theme requires 'name'`);
  }

  for (const feature of theme.features ?? []) {
    errors.push(...validateFeature(feature).errors);
  }

  return {
    success: errors.length === 0,
    errors
  };
}
