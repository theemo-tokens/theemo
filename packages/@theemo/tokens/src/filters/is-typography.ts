import type { Token } from '..';

export function isTypography(token: Token) {
  return token.type === 'typography';
}
