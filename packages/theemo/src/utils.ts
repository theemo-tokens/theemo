import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

export async function readModule(file: string): Promise<object> {
  const filepath = path.join(process.cwd(), file);

  if (!fs.existsSync(filepath)) {
    throw new Error(`Cannot find file: ${filepath}`);
  }

  return await import(filepath);
}

export function readJson(file: string) {
  return JSON.parse(fs.readFileSync(file, { encoding: 'utf-8' }));
}

export function set(
  object: Record<string, unknown>,
  keyPath: string[],
  value: unknown
): void {
  const lastKeyIndex = keyPath.length - 1;

  for (let i = 0; i < lastKeyIndex; ++i) {
    const key = keyPath[i] as keyof Record<string, unknown>;

    if (!(key in object)) {
      // eslint-disable-next-line no-param-reassign
      object[key] = {};
    }

    // eslint-disable-next-line no-param-reassign
    object = object[key] as Record<string, unknown>;
  }

  if (typeof object[keyPath[lastKeyIndex]] !== 'object') {
    // eslint-disable-next-line no-param-reassign
    object[keyPath[lastKeyIndex]] = value;
  }
}
