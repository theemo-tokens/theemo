import {
  REFERENCES as PROD_REFERENCES,
  VALUES as PROD_VALUES
} from './moana-result-prod';

export const VALUES = {
  ...PROD_VALUES,
  'color.intent.action.fill.base.background': '#9EDFFA',
  'color.intent.action.fill.hover.background': '#55C6F7',
  'color.intent.action.fill.active.background': '#054661'
};

export const REFERENCES = {
  ...PROD_REFERENCES,
  'color.intent.action.fill.base.background': 'color.palette.brand2',
  'color.intent.action.fill.base.border': 'color.palette.brand2',
  'color.intent.action.fill.base.text': 'color.text.dark.normal',
  'color.intent.action.fill.hover.background': 'color.palette.brand1',
  'color.intent.action.fill.hover.border': 'color.palette.brand1',
  'color.intent.action.fill.active.background': 'color.palette.brand-2',
  'color.intent.action.fill.active.border': 'color.palette.brand-2',
  'color.intent.action.fill.disabled.text.$dark': 'color.text.light.reduced'
};

export const TRANSFORMS = {
  'color.palette.brand-2': {
    lightness: -30
  },
  'color.palette.brand-1': {
    lightness: -15
  },
  'color.palette.brand1': {
    lightness: 15
  },
  'color.palette.brand2': {
    lightness: 30
  },
  'color.palette.adjacent-2': {
    lightness: -30
  },
  'color.palette.adjacent-1': {
    lightness: -15
  },
  'color.palette.adjacent1': {
    lightness: 15
  },
  'color.palette.adjacent2': {
    lightness: 30
  },
  'color.palette.accent-2': {
    lightness: -30
  },
  'color.palette.accent-1': {
    lightness: -15
  },
  'color.palette.accent1': {
    lightness: 15
  },
  'color.palette.accent2': {
    lightness: 30
  }
};
