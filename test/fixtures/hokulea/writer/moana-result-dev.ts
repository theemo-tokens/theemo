import { EXPECTED_FILES as EXPECTED_FILES_PROD } from './moana-result-prod';

export const EXPECTED_FILES = [
  ...EXPECTED_FILES_PROD,
  'color/text.json',
  'color/palette.json'
];

export const SAMPLES = [
  {
    file: 'color/intent/action.json',
    path: 'color.intent.action.fill.base.background',
    properties: {
      value: '{color.palette.brand2.value}'
    }
  },
  {
    file: 'color/intent/action.json',
    path: 'color.intent.action.fill.base.text',
    properties: {
      value: '{color.text.dark.normal.value}'
    }
  },
  {
    file: 'color/intent/action.json',
    path: 'color.intent.action.subtle.disabled.background',
    properties: {
      value: '{color.layout.background.value}'
    }
  },
  {
    file: 'color/intent/action.json',
    path: 'color.intent.action.subtle.disabled.border',
    properties: {
      value: '{color.layout.reduced.value}'
    }
  },
  {
    file: 'color/intent/action.light.json',
    path: 'color.intent.action.fill.disabled.text',
    properties: {
      value: '{color.text.dark.reduced.value}',
      colorScheme: 'light'
    }
  },
  {
    file: 'color/intent/action.dark.json',
    path: 'color.intent.action.fill.disabled.text',
    properties: {
      value: '{color.text.light.reduced.value}',
      colorScheme: 'dark'
    }
  }
];
