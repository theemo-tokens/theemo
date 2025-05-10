import { EXPECTED_FILES as EXPECTED_FILES_PROD } from './result-prod.js';

export const EXPECTED_FILES: string[] = [
  ...EXPECTED_FILES_PROD,
  'color/text.json',
  'color/palette.json'
] as const;

export const TOKENS = [
  {
    file: 'color/intent/action.json',
    path: 'color.intent.action.fill.base.background',
    properties: {
      value: '{color.palette.brand2.value}',
      type: 'color',
      attributes: {
        category: 'color'
      }
    }
  },
  {
    file: 'color/intent/action.json',
    path: 'color.intent.action.fill.base.text',
    properties: {
      value: '{color.text.dark.normal.value}',
      type: 'color',
      attributes: {
        category: 'color'
      }
    }
  },
  {
    file: 'color/intent/action.json',
    path: 'color.intent.action.subtle.disabled.background',
    properties: {
      value: '{color.layout.background.value}',
      type: 'color',
      attributes: {
        category: 'color'
      }
    }
  },
  {
    file: 'color/intent/action.json',
    path: 'color.intent.action.subtle.disabled.border',
    properties: {
      value: '{color.layout.reduced.value}',
      type: 'color',
      attributes: {
        category: 'color'
      }
    }
  },
  {
    file: 'color/intent/action.light.json',
    path: 'color.intent.action.fill.disabled.text',
    properties: {
      value: '{color.text.dark.reduced.value}',
      type: 'color',
      attributes: {
        category: 'color'
      },
      colorScheme: 'light'
    }
  },
  {
    file: 'color/intent/action.dark.json',
    path: 'color.intent.action.fill.disabled.text',
    properties: {
      value: '{color.text.light.reduced.value}',
      type: 'color',
      attributes: {
        category: 'color'
      },
      colorScheme: 'dark'
    }
  }
] as const;
