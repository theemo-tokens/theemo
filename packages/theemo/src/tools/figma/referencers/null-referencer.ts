import type { FigmaToken } from '../token.js';
import type Referencer from './referencer.js';

export default class NullReferencer implements Referencer {
  async setup(): Promise<void> {
    // void implementation
  }

  find(_name: string, _type: string): string | undefined {
    return undefined;
  }

  findData(_name: string, _type: string): string | undefined {
    return undefined;
  }

  getProperties(_token: FigmaToken) {
    return {};
  }
}
