import fs from 'fs';
import path from 'path';

export function requireFile(file: string) {
  const filepath = path.join(process.cwd(), file);

  if (!fs.existsSync(filepath)) {
    process.exit(1);
  }

  return require(filepath);
}

export function set(
  object: Record<string, unknown>,
  keyPath: string[],
  value: unknown
) {
  const lastKeyIndex = keyPath.length - 1;
  for (let i = 0; i < lastKeyIndex; ++i) {
    const key = keyPath[i] as keyof Record<string, unknown>;
    if (!(key in object)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      object[key] = {};
    }
    // eslint-disable-next-line no-param-reassign
    object = object[key] as Record<string, unknown>;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  if (typeof object[keyPath[lastKeyIndex]] !== 'object') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    // eslint-disable-next-line no-param-reassign
    object[keyPath[lastKeyIndex]] = value;
  }
}
