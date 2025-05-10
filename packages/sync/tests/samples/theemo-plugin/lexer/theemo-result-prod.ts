export const TOKENS = [
  {
    name: 'action/background',
    value: '#2A50D5'
  },
  {
    name: 'hero/background',
    reference: 'action/background'
  },
  {
    name: 'alternative/background',
    colorScheme: 'light',
    value: '#12544A'
  },
  {
    name: 'alternative/background',
    colorScheme: 'dark',
    value: '#80E5D6'
  }
] as const;
