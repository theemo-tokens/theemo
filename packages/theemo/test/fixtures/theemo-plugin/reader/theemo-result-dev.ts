import {
  REFERENCES as PROD_REFERENCES,
  VALUES as PROD_VALUES
} from './theemo-result-prod';

export const VALUES = {
  ...PROD_VALUES,
  'palette/brand/100': '#08102B',
  'palette/brand/200': '#112055',
  'palette/brand/300': '#193080',
  'palette/brand/400': '#2240AA',
  'palette/brand/500': '#2A50D5',
  'palette/brand/600': '#5573DD',
  'palette/brand/700': '#7F96E6',
  'palette/brand/800': '#AAB9EE',
  'palette/brand/900': '#D4DCF7',
  'palette/adjacent/100': '#092A25',
  'palette/adjacent/200': '#12544A',
  'palette/adjacent/300': '#1A7F70',
  'palette/adjacent/400': '#23A995',
  'palette/adjacent/500': '#2CD3BA',
  'palette/adjacent/600': '#56DCC8',
  'palette/adjacent/700': '#80E5D6',
  'palette/adjacent/800': '#ABEDE3',
  'palette/adjacent/900': '#D5F6F1'
};

export const REFERENCES = {
  ...PROD_REFERENCES,
  'action/background': 'palette/brand/500',
  'action/border': 'palette/brand/300',
  'action/text': 'palette/brand/900',
  'hero/background': 'action/background',
  'hero/border': 'action/border',
  'hero/text': 'action/text',
  'alternative/background.$light': 'palette/adjacent/200',
  'alternative/border.$light': 'palette/adjacent/100',
  'alternative/text.$light': 'palette/adjacent/900',
  'alternative/background.$dark': 'palette/adjacent/700',
  'alternative/border.$dark': 'palette/adjacent/600',
  'alternative/text.$dark': 'palette/adjacent/200',
  'palette/brand/100': 'palette/brand/500',
  'palette/brand/200': 'palette/brand/500',
  'palette/brand/300': 'palette/brand/500',
  'palette/brand/400': 'palette/brand/500',
  'palette/brand/600': 'palette/brand/500',
  'palette/brand/700': 'palette/brand/500',
  'palette/brand/800': 'palette/brand/500',
  'palette/brand/900': 'palette/brand/500',
  'palette/adjacent/100': 'palette/adjacent/500',
  'palette/adjacent/200': 'palette/adjacent/500',
  'palette/adjacent/300': 'palette/adjacent/500',
  'palette/adjacent/400': 'palette/adjacent/500',
  'palette/adjacent/600': 'palette/adjacent/500',
  'palette/adjacent/700': 'palette/adjacent/500',
  'palette/adjacent/800': 'palette/adjacent/500',
  'palette/adjacent/900': 'palette/adjacent/500'
};

export const TRANSFORMS = {
  'palette/brand/100': {
    lightness: -40
  },
  'palette/brand/200': {
    lightness: -30
  },
  'palette/brand/300': {
    lightness: -20
  },
  'palette/brand/400': {
    lightness: -10
  },
  'palette/brand/600': {
    lightness: 10
  },
  'palette/brand/700': {
    lightness: 20
  },
  'palette/brand/800': {
    lightness: 30
  },
  'palette/brand/900': {
    lightness: 40
  },
  'palette/adjacent/100': {
    lightness: -40
  },
  'palette/adjacent/200': {
    lightness: -30
  },
  'palette/adjacent/300': {
    lightness: -20
  },
  'palette/adjacent/400': {
    lightness: -10
  },
  'palette/adjacent/600': {
    lightness: 10
  },
  'palette/adjacent/700': {
    lightness: 20
  },
  'palette/adjacent/800': {
    lightness: 30
  },
  'palette/adjacent/900': {
    lightness: 40
  }
};
