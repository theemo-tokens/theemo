import { makeConstrainedFilter } from './filters/make-constrained-filter';
import { w3cTokenJsonParser } from './parsers/w3c-token-json-parser';
import { namePathKebab } from './transforms/name-path-kebab';
import { theemoAttributesTransform } from './transforms/theemo-attributes';
import { theemoColorValueTransform } from './transforms/theemo-transform-color';
import { theemoValueTransform } from './transforms/theemo-value';
import { typographyCssTransform } from './transforms/typography-css';

import type StyleDictionary from 'style-dictionary';

export {
  makeConstrainedFilter,
  namePathKebab,
  theemoAttributesTransform,
  theemoColorValueTransform,
  theemoValueTransform,
  typographyCssTransform
};

export const registerTheemo = (styleDictionary: StyleDictionary.Core) => {
  styleDictionary.registerParser(w3cTokenJsonParser);

  styleDictionary.registerTransform({
    name: 'theemo/attributes',
    ...theemoAttributesTransform
  });

  styleDictionary.registerTransform({
    name: 'theemo/value',
    ...theemoValueTransform
  });

  styleDictionary.registerTransform({
    name: 'name/path/kebab',
    ...namePathKebab
  });

  styleDictionary.registerTransform({
    name: 'typography/css',
    ...typographyCssTransform
  });

  styleDictionary.registerTransform({
    name: 'theemo/transform',
    ...theemoColorValueTransform
  });
};
