export const EXPECTED_FILES = [
  'action.json',
  'alternative.dark.json',
  'alternative.light.json',
  'hero.json'
] as const;

export const TOKENS = [
  {
    file: 'action.json',
    path: 'action.background',
    properties: {
      value: '#2A50D5'
    }
  },
  {
    file: 'action.json',
    path: 'action.border',
    properties: {
      value: '#193080'
    }
  },
  {
    file: 'hero.json',
    path: 'hero.background',
    properties: {
      value: '{action.background.value}'
    }
  },
  {
    file: 'hero.json',
    path: 'hero.border',
    properties: {
      value: '{action.border.value}'
    }
  }
] as const;
