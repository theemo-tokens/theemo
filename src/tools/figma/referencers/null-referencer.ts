import Token from '../../../token';
import { FigmaToken } from '../token';
import Referencer from './referencer';

export default class NullReferencer implements Referencer {
  async setup() {
    // void implementation
  }

  find(_name: string, _type: string): string | undefined {
    return undefined;
  }

  findData(_name: string, _type: string): string | undefined {
    return undefined;
  }

  compileToken(token: FigmaToken) {
    return token as Token;
  }
}
