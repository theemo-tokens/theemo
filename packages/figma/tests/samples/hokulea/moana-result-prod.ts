export const VALUES: Record<string, string> = {
  'color.intent.action.fill.base.background': '#9EDFFA',
  'color.intent.action.fill.base.border': '#9EDFFA',
  'color.intent.action.fill.hover.background': '#55C6F7',
  'color.intent.action.fill.hover.border': '#55C6F7',
  'color.intent.action.fill.active.background': '#054661',
  'color.intent.action.fill.active.border': '#054661',
  'color.intent.action.fill.disabled.background.$light': '#F2F2F2',
  'color.intent.action.fill.disabled.border.$light': '#F2F2F2',
  'color.intent.action.fill.disabled.text.$light': '#737373',
  'color.intent.action.fill.disabled.background.$dark': '#6E6E6E',
  'color.intent.action.fill.disabled.border.$dark': '#6E6E6E',
  'color.intent.action.fill.disabled.text.$dark': '#CECECE',
  'color.intent.action.subtle.base.background': '#FFFFFF',
  'color.intent.action.subtle.base.border': '#55C6F7',
  'color.intent.action.subtle.base.text': '#333333'
};

export const REFERENCES: Record<string, string | undefined> = {
  'color.intent.action.fill.base.background': undefined,
  'color.intent.action.fill.base.border': undefined,
  'color.intent.action.fill.base.text': undefined, // has ref in dev
  'color.intent.action.fill.hover.background': undefined,
  'color.intent.action.fill.hover.border': undefined,
  'color.intent.action.fill.active.background': undefined,
  'color.intent.action.fill.active.border': undefined,
  'color.intent.action.fill.disabled.text.$dark': undefined, // has ref in dev
  'color.intent.action.subtle.base.background': 'color.layout.background',
  'color.intent.action.subtle.disabled.border': 'color.layout.reduced'
};

export const STYLE_NAMES: Record<string, string> = {
  'color.intent.action.fill.base.background': 'intent/action/fill/base.background',
  'color.intent.action.fill.base.border': 'intent/action/fill/base.border',
  'color.intent.action.fill.base.text': 'intent/action/fill/base.text',
  'color.intent.action.fill.hover.background': 'intent/action/fill/hover.background',
  'color.intent.action.fill.hover.border': 'intent/action/fill/hover.border',
  'color.intent.action.fill.active.background': 'intent/action/fill/active.background',
  'color.intent.action.fill.active.border': 'intent/action/fill/active.border',
  'color.intent.action.fill.disabled.text.$dark': 'intent/action/fill/disabled.text.$dark',
  'color.intent.action.subtle.base.background': 'intent/action/subtle/base.background',
  'color.intent.action.subtle.disabled.border': 'intent/action/subtle/disabled.border'
};
