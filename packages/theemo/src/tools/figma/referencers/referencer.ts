import type Token from '../../../token.js';
import type { FigmaToken } from '../token.js';

export default interface Referencer {
  setup(): Promise<void>;

  /**
   * Find reference for given name and style
   *
   * @param name
   * @param type
   */
  find(name: string, type: string): string | undefined;

  findData(name: string, type: string): unknown;

  getProperties(token: FigmaToken): Partial<Token>;
}
