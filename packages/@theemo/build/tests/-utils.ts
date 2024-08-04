import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { glob } from 'glob';

import type { Path } from 'glob';
import type { DirectoryJSON } from 'memfs';

// Based on
// https://gist.github.com/boneskull/dd11a4d73024909299e26c95c85edc70
export async function createDirectoryJSONFromFs(dir: string) {
  // recursify dirs
  const patterns = [path.join(dir, '**')];

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const files: Path[] = await glob(patterns, {
    // we don't actually need filetypes, but we want the PathScurry objects
    withFileTypes: true,
    // don't need dirs because memfs creates dir structure from relative
    // filepaths
    nodir: true
  });

  const json: DirectoryJSON = {};

  // instead of building a JSON object, we could actually use mkdir/writeFile,
  // but that's slow
  await Promise.all(
    files.map(async (file) => {
      // yes, this should work with binaries
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const content = await readFile(file.fullpath(), 'utf8');

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      json[file.relativePosix()] = content;
    })
  );

  // console.log(json);

  return json;
}
