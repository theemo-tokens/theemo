import { type Theme, validateTheme } from './theme';

import type { ValidationResult } from './validation';
import type { PackageJson } from 'type-fest';

/**
 * A theme described in your `package.json`:
 *
 * @example
 *
 * Theme in your `package.json`
 *
 * ```json
 * {
 *   "name": "@scope/ocean-theme",
 *   "theemo": {
 *     "name": "ocean",
 *     "file": "dist/ocean-theme.css"
 *   }
 * }
 * ```
 */
export interface PackageTheme extends Theme {
  /** Path to the CSS file, that will be loaded in the browser */
  file: string;
}

/**
 * A `package.json` file with `theemo` object
 */
export type TheemoPackage = PackageJson & {
  theemo: PackageTheme;
};

/**
 * The keyword to look for in a `package.json` file
 */
const KEYWORD = 'theemo-theme';

/**
 * Checks if the given package is a Theemo package
 *
 * @param pkg the given package
 * @returns `true` if it is a Theemo package, otherwise `false`
 */
export function isTheemoPackage(pkg: PackageJson): pkg is TheemoPackage {
  return (pkg.keywords ?? []).includes(KEYWORD);
}

/**
 * Validates a package for being correct
 *
 * @example
 *
 * Check for a valid package:
 *
 * ```ts
 * const validation = validateTheemoPackage(myPkg);
 *
 * if (validation.success) {
 *   // proceed with valid package
 * } else {
 *   console.log(validation.errors);
 * }
 * ```
 *
 * @param pkg the given package
 * @returns the validation result
 */
export function validateTheemoPackage(pkg: TheemoPackage): ValidationResult {
  const errors = [];

  if (!isTheemoPackage(pkg)) {
    errors.push(`Package '${(pkg as PackageJson).name as string}' requires keyword '${KEYWORD}'`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!pkg.theemo) {
    errors.push(`Package '${pkg.name as string}' requires 'theemo' field`);
  } else {
    const themeValidation = validateTheme(pkg.theemo);

    if (!pkg.theemo.file) {
      errors.push(`Theemo in package '${pkg.name as string}' requires 'file'`);
    }

    errors.push(...themeValidation.errors);
  }

  return {
    success: errors.length === 0,
    errors
  };
}
