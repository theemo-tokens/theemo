import type { Theme } from './theme';
import type { PackageJson } from 'type-fest';

/**
 * A `package.json` file with `theemo` object
 */
export type TheemoPackage = PackageJson & {
  theemo: Theme;
};

const KEYWORD = 'theemo-theme';

export function isTheemoPackage(pkg: PackageJson): pkg is TheemoPackage {
  return (pkg.keywords ?? []).includes(KEYWORD) && Boolean(pkg.theemo);
}

export function validateTheemoPackage(pkg: TheemoPackage): true | string[] {
  const { theemo } = pkg;

  const errors = [];

  if (!theemo.name) {
    errors.push(`Cannot find a theme name in ${pkg.name as string}. No "theemo.name" was given.`);
  }

  if (!theemo.file) {
    errors.push(`Cannot find theme file in ${pkg.name as string}. No "theemo.file" was given.`);
  }

  return errors.length > 0 ? errors : true;
}
