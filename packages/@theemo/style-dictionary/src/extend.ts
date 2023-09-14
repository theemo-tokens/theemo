import { w3cTokenJsonParser } from './parsers/w3c-token-json-parser';

import type StyleDictionary from 'style-dictionary';

export const registerTheemo = (styleDictionary: StyleDictionary.Core) => {
  styleDictionary.registerParser(w3cTokenJsonParser);
};
