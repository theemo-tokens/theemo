import type { PreprocessedTokens } from 'style-dictionary';
import type { DesignToken, Preprocessor } from 'style-dictionary/types';

function copyDollarField(object: Record<string, PreprocessedTokens | DesignToken>) {
  for (const [key, value] of Object.entries(object)) {
    if (key.startsWith('$')) {
      object[key.slice(1)] = value;
    }

    if (typeof value === 'object') {
      copyDollarField(object[key]);
    }
  }
}

export const theemoTokenPreprocessor: Preprocessor = {
  name: 'theemo/token',
  preprocessor: (dictionary) => {
    copyDollarField(dictionary);

    return dictionary;
  }
};
