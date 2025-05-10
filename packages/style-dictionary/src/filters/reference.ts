import { usesReferences } from 'style-dictionary/utils';

import type { TransformedToken } from 'style-dictionary';

export function isReferenceToken(token: TransformedToken): boolean {
  return usesReferences(token.original.value);
}

export function isNoReferenceToken(token: TransformedToken): boolean {
  return !isReferenceToken(token);
}
