import type { TransformedToken } from 'style-dictionary';

export function toTransformedToken(token: Partial<TransformedToken>): TransformedToken {
  const name = token.name ?? 'token.name';
  const t = {
    name,
    path: name.split('.'),
    isSource: true,
    filePath: 'path/to/file.json',
    ...token
  };

  return {
    ...t,
    original: t
  };
}
