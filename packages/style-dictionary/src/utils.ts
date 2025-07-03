export function set(object: Record<string, unknown>, keyPath: string[], value: unknown): void {
  const lastKeyIndex = keyPath.length - 1;

  for (let i = 0; i < lastKeyIndex; ++i) {
    const key = keyPath[i];

    if (!(key in object)) {
      object[key] = {};
    }

    object = object[key] as Record<string, unknown>;
  }

  if (typeof object[keyPath[lastKeyIndex]] !== 'object') {
    object[keyPath[lastKeyIndex]] = value;
  }
}
