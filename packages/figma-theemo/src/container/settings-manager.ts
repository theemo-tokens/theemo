import { DEFAULT_CONFIG } from '../../shared/config';

export default class SettingsManager {

  private cache: Map<string, any>;

  private readPluginData() {
    return JSON.parse(figma.root.getPluginData('settings') || '{}');
  }

  private savePluginData(data) {
    figma.root.setPluginData('settings', JSON.stringify(data));
  }

  get settings() {
    if (!this.cache) {
      this.cache = new Map(Object.entries({ ...DEFAULT_CONFIG, ...this.readPluginData() }));
    }
    return this.cache;
  }

  async read() {
    try {
      const settings = this.readPluginData();
      settings['tools.jsonbin.key'] = await figma.clientStorage.getAsync('jsonBinApiKey') ?? '';

      return { ...DEFAULT_CONFIG, ...settings };
    } catch (e) {
      console.warn(e);
    }
  }

  async save(data) {
    try {
      const key = data['tools.jsonbin.key'];
      delete data['tools.jsonbin.key'];

      this.savePluginData(data);
      await figma.clientStorage.setAsync('jsonBinApiKey', key);

      data['tools.jsonbin.key'] = key;
      return data;
    } catch (e) {
      console.warn(e);
    }
  }

  get(key: string) {
    if (this.settings.has(key)) {
      return this.settings.get(key);
    }
  }

  update(key: string, value: any) {
    this.settings.set(key, value);

    const settings = {};
    for (const [key, value] of this.settings) {
      settings[key] = value;
    }

    this.savePluginData(settings);
  }
}