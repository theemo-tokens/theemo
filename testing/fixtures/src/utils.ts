import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { packageDirectorySync } from 'pkg-dir';

export const FIXTURES_HOME: string = join(
  packageDirectorySync({ cwd: dirname(fileURLToPath(import.meta.url)) }) as string,
  'src'
);
