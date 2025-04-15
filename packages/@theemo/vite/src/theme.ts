import fs from 'node:fs';

import type { TheemoPackage } from './types';
import type { PackageJson } from 'type-fest';

export type Resolve = (source: string) => Promise<string | null>;

export function readFile(filePath: string) {
  return fs.readFileSync(filePath, { encoding: 'utf-8' });
}

function readFileAsJSON(filePath: string) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return JSON.parse(readFile(filePath));
}

export function findRootPackage(root: string) {
  return readFileAsJSON(`${root}/package.json`) as TheemoPackage;
}

const KEYWORD = 'theemo-theme';

function isTheemoPackage(pkg: PackageJson) {
  return pkg.keywords?.includes(KEYWORD);
}

function validateTheemoPackage(pkg: TheemoPackage) {
  const { theemo } = pkg;

  if (!theemo?.file && !pkg.main) {
    console.warn(
      `Cannot find theme file in ${pkg.name as string}. Neither "main" nor "theemo.file" was given.`
    );

    return false;
  }

  if (!(theemo?.name || pkg.name)) {
    console.warn(
      `Cannot find a theme name in ${pkg.name as string}. Neither "name" nor "theemo.name" was given.`
    );
  }

  return true;
}

export function getThemeName(pkg: TheemoPackage): string {
  return (pkg.theemo?.name ?? pkg.name) as string;
}

export function getThemeFile(pkg: TheemoPackage): string {
  return (pkg.theemo?.file ?? pkg.main) as string;
}

export function getThemeFilePath(pkg: TheemoPackage) {
  const file = getThemeFile(pkg);

  return (file ? `${pkg.name as string}/${file}` : pkg.name) as string;
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
    };
  }

  return pkg;
}

export async function findThemePackages(
  pkg: PackageJson,
  resolve: Resolve
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

  const themePackages = Promise.all(
    packages
      .filter(Boolean)
      .filter(isTheemoPackage)
      .filter(validateTheemoPackage)
      .map((themePkg) => loadTheme(themePkg, resolve))
  );

  return themePackages;
}
