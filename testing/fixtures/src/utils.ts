import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const FIXTURES_HOME = dirname(fileURLToPath(import.meta.url));
