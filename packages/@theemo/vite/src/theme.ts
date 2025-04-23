import fs from 'node:fs';

import {
  isTheemoPackage,
  type TheemoPackage,
  type Theme,
  validateTheemoPackage
} from '@theemo/theme';

import type { LoggingFunction } from 'rollup';
import type { PackageJson } from 'type-fest';

export type Resolve = (source: string) => Promise<string | null>;

export interface ResolvedTheme extends Theme {
  filePath?: string;
}

export type ResolvedTheemoPackage = TheemoPackage & {
  theemo?: ResolvedTheme;
};

export function readFile(filePath: string): string {
  return fs.readFileSync(filePath, { encoding: 'utf-8' });
}

function readFileAsJSON(filePath: string) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return JSON.parse(readFile(filePath));
}

export function findRootPackage(root: string) {
  return readFileAsJSON(`${root}/package.json`) as TheemoPackage;
}

export function getThemeFilePath(pkg: TheemoPackage) {
  return `${pkg.name as string}/${pkg.theemo.file}`;
}

export async function getThemeFileContents(
  pkg: TheemoPackage,
  resolve: Resolve
): Promise<string | undefined> {
  const file = await resolve(getThemeFilePath(pkg));

  if (file) {
    return readFile(file);
  }

  return undefined;
}

async function loadTheme(pkg: TheemoPackage, resolve: Resolve) {
  const filePath = getThemeFilePath(pkg);

  if (filePath) {
    const resolvedFilePath = await resolve(filePath);

    pkg.theemo = {
      ...pkg.theemo,
      filePath: resolvedFilePath as string
    } as ResolvedTheme;
  }

  return pkg as ResolvedTheemoPackage;
}

export async function findThemePackages(
  pkg: PackageJson,
  resolve: Resolve,
  log: LoggingFunction
): Promise<TheemoPackage[]> {
  const { dependencies = {}, devDependencies = {} } = pkg;

  const packages = [];
  const deps = [...Object.keys(dependencies), ...Object.keys(devDependencies)];

  for (const name of deps) {
    try {
      const filePath = await resolve(`${name}/package.json`);

      if (filePath) {
        packages.push(readFileAsJSON(filePath) as PackageJson);
      }
    } catch {
      /**/
    }
  }

  const themePackages = packages.filter(Boolean).filter(isTheemoPackage);

  let resolvedPackages = [];

  for (const themePkg of themePackages) {
    const validation = validateTheemoPackage(themePkg);

    if (validation.success) {
      resolvedPackages.push(await loadTheme(themePkg, resolve));
    } else {
      log(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/restrict-template-expressions
        `[Theemo] Ignoring Theme '${themePkg.name as string}' due to validation errors: \n\n  - ${validation.errors.join('\n  - ')}\n`
      );
    }
  }

  return resolvedPackages;
}
