import path from 'path';
import fs from 'fs';

export function requireFile(file: string) {
  const filepath = path.join(process.cwd(), file);

  if (!fs.existsSync(filepath)) {
    process.exit(1);
  }

  return require(filepath);
}

export function set(object: object, keyPath: string[], value: unknown) {
  const lastKeyIndex = keyPath.length - 1;
  for (let i = 0; i < lastKeyIndex; ++i) {
    const key = keyPath[i] as keyof object;
    if (!(key in object)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      object[key] = {};
    }
    // eslint-disable-next-line no-param-reassign
    object = object[key];
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
