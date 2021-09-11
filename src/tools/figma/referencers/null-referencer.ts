import Token from '../../../token';
import { FigmaToken } from '../token';
import Referencer from './referencer';

export default class NullReferencer implements Referencer {
  async setup(): Promise<void> {
    // void implementation
  }

  find(_name: string, _type: string): string | undefined {
    // eslint-disable-next-line unicorn/no-useless-undefined
    return undefined;
  }

  findData(_name: string, _type: string): string | undefined {
    // eslint-disable-next-line unicorn/no-useless-undefined
    return undefined;
  }

  compileToken(token: FigmaToken) {
    return token as unknown as Token;
  }
}
