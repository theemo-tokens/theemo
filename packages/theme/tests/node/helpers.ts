import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import type { TheemoPackage } from '../../src';
import type { PackageJson } from 'type-fest';

function loadPackage(pkgName: string) {
  // eslint-disable-next-line n/no-unsupported-features/node-builtins
  const filePath = resolve(`${import.meta.dirname}/../../node_modules/${pkgName}/package.json`);
  const contents = readFileSync(filePath, { encoding: 'utf-8' });

  return JSON.parse(contents) as PackageJson;
}

export function loadThemePackage(pkgName: string) {
  return loadPackage(pkgName) as TheemoPackage;
}
