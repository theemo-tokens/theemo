export const EXPECTED_FILES = [
  'action.json',
  'alternative.dark.json',
  'alternative.light.json',
  'hero.json',
  'palette.json'
] as const;

// export const TOKENS = [
//   {
//     name: 'action/background',
//     reference: 'palette/brand/500'
//   },
//   {
//     name: 'hero/background',
//     reference: 'action/background'
//   },
//   {
//     name: 'alternative/background',
//     colorScheme: 'light',
//     reference: 'palette/adjacent/200'
//   },
//   {
//     name: 'alternative/background',
//     colorScheme: 'dark',
//     reference: 'palette/adjacent/700'
//   }
// ];

export const TOKENS = [
  {
    file: 'action.json',
    path: 'action.background',
    properties: {
      value: '{palette.brand.500.value}'
    }
  },
  {
    file: 'action.json',
    path: 'action.border',
    properties: {
      value: '{palette.brand.300.value}'
    }
  },
  {
    file: 'alternative.light.json',
    path: 'alternative.background',
    properties: {
      colorScheme: 'light',
      value: '{palette.adjacent.200.value}'
    }
  },
  {
    file: 'alternative.dark.json',
    path: 'alternative.background',
    properties: {
      colorScheme: 'dark',
      value: '{palette.adjacent.700.value}'
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
