export const EXPECTED_FILES = [
  'color/layout.json',
  'color/layout.dark.json',
  'color/layout.light.json',
  'color/text.dark.json',
  'color/text.light.json',
  'color/text.transient.json',
  'color/structure.json',
  'color/intent/action.json',
  'color/intent/action.dark.json',
  'color/intent/action.light.json',
  'color/intent/action.transient.json',
  'structure.json'
];

export const SAMPLES = [
  {
    file: 'color/intent/action.json',
    path: 'color.intent.action.fill.base.background',
    properties: {
      value: '#9EDFFA'
    }
  },
  {
    file: 'color/intent/action.json',
    path: 'color.intent.action.fill.base.text',
    properties: {
      value: '#333333'
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
      colorScheme: 'light'
    }
  },
  {
    file: 'color/intent/action.dark.json',
    path: 'color.intent.action.fill.disabled.text',
    properties: {
      colorScheme: 'dark'
    }
  }
];
