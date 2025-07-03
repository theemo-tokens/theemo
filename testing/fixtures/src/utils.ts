import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { packageDirectorySync } from 'pkg-dir';

export const FIXTURES_HOME: string = join(
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  packageDirectorySync({ cwd: dirname(fileURLToPath(import.meta.url)) })!,
  'src'
);
