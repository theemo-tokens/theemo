import { type Theme, validateTheme } from './theme';

import type { ValidationResult } from './validation';
import type { PackageJson } from 'type-fest';

/**
 * A `package.json` file with `theemo` object
 */
export type TheemoPackage = PackageJson & {
  theemo: Theme;
};

const KEYWORD = 'theemo-theme';

export function isTheemoPackage(pkg: PackageJson): pkg is TheemoPackage {
  return (pkg.keywords ?? []).includes(KEYWORD);
}

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

    errors.push(...themeValidation.errors);
  }

  return {
    success: errors.length === 0,
    errors
  };
}
