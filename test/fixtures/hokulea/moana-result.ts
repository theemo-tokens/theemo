export const CONTEXTS = {
  base: [
    'color.intent.action/fill.base.background',
    'color.intent.action/fill.base.border',
    'color.intent.action/fill.hover.background',
    'color.intent.action/fill.hover.border',
    'color.intent.action/fill.active.background',
    'color.intent.action/fill.active.border'
  ],
  light: [
    'color.intent.action/fill.disabled.background',
    'color.intent.action/fill.disabled.border',
    'color.intent.action/fill.disabled.text'
  ],
  dark: [
    'color.intent.action/fill.disabled.background',
    'color.intent.action/fill.disabled.border',
    'color.intent.action/fill.disabled.text'
  ]
};

export const BASE_VALUES = {
  'color.intent.action/fill.base.background': '#9EDFFA',
  'color.intent.action/fill.hover.background': '#55C6F7',
  'color.intent.action/fill.active.background': '#054661'
};

export const REFERENCES = {
  'color.intent.action/fill.base.background': undefined,
  'color.intent.action/fill.base.border': undefined,
  'color.intent.action/fill.base.text': 'color.text/normal.$light',
  'color.intent.action/fill.hover.background': undefined,
  'color.intent.action/fill.hover.border': undefined,
  'color.intent.action/fill.active.background': undefined,
  'color.intent.action/fill.active.border': undefined,
  'color.intent.action/fill.disabled.text.$dark': 'color.text/disabled.$dark'
};
