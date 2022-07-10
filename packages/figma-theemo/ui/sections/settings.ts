import Section from './section';

export default class SettingsSection extends Section {
  name = 'settings';

  private sections: SubSection[];

  setup() {
    this.sections = [];
    this.sections.push(new SettingsContextSection(this.settings));
    this.sections.push(new SettingsToolsSection(this.settings));

    document.getElementById('settings.save').addEventListener('click', () => {
      this.save();
    }, false);
  }

  updateSettings(settings: Map<string, any>) {
    for (const sub of this.sections) {
      sub.updateSettings(settings);
    }
  }

  private save() {
    const settings = {};
    for (let [key, value] of this.settings) {
      settings[key] = value;
    }

    this.messenger.send('save-settings', settings);
  }
}

interface SubSection {
  updateSettings(settings: Map<string, any>);
}

class SettingsContextSection implements SubSection {

  private prefix: HTMLInputElement;

  private from: HTMLElement;
  private to: HTMLElement;

  private settings: Map<string, any>;

  constructor(settings: Map<string, any>) {
    this.settings = settings;
    this.setup();
    this.updatePreview();
  }

  setup() {
    this.from = document.getElementById('context.from');
    this.to = document.getElementById('context.to');
    this.prefix = document.getElementById('context.prefix') as HTMLInputElement;

    this.prefix.addEventListener('input', (e) => {
      this.settings.set('context.prefix', this.prefix.value);
      this.updatePreview();
    }, false);
  }

  updateSettings(settings: Map<string, any>) {
    this.settings = settings;
    this.prefix.value = settings.get('context.prefix');
    this.updatePreview();
  }

  updatePreview() {
    this.from.innerHTML = `foo/bar${this.settings.get('context.prefix')}${this.settings.get('context')}`;
    this.to.innerHTML = `foo/bar`;
  }
}

class SettingsToolsSection implements SubSection {

  private key: HTMLInputElement;
  private url: HTMLInputElement;

  private settings: Map<string, any>;

  constructor(settings: Map<string, any>) {
    this.settings = settings;
    this.setup();
  }

  setup() {
    this.key = document.getElementById('tools.key') as HTMLInputElement;
    this.url = document.getElementById('tools.url') as HTMLInputElement;

    this.key.addEventListener('input', () => {
      this.settings.set('tools.jsonbin.key', this.key.value);
    });

    this.url.addEventListener('input', () => {
      this.settings.set('tools.jsonbin.url', this.url.value);
    });
  }

  updateSettings(settings: Map<string, any>) {
    this.settings = settings;

    this.key.value = settings.get('tools.jsonbin.key');
    this.url.value = settings.get('tools.jsonbin.url');
  }
}
