export function set(object: Record<string, unknown>, keyPath: string[], value: unknown): void {
  const lastKeyIndex = keyPath.length - 1;

  for (let i = 0; i < lastKeyIndex; ++i) {
    const key = keyPath[i] as keyof Record<string, unknown>;

    if (!(key in object)) {
      // eslint-disable-next-line no-param-reassign
      object[key] = {};
    }

    // eslint-disable-next-line no-param-reassign
    object = object[key] as Record<string, unknown>;
  }

  if (typeof object[keyPath[lastKeyIndex]] !== 'object') {
    // eslint-disable-next-line no-param-reassign
    object[keyPath[lastKeyIndex]] = value;
  }
}
