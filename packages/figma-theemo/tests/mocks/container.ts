import Container from '../../src/container/index';

export class SettingsMock { 
  constructor(public settings: {}) { }
  
  get(key: string) {
    return this.settings[key];
  }
}

export const settings = new SettingsMock({
  context: 'foo',
  contexts: ['foo', 'bar'],
  'context.prefix': '.$'
});

export const container = new Container({
  settings
});