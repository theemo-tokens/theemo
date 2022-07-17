import { DEFAULT_CONFIG } from '../../shared/config';

function mapToObject(map: Map<string, unknown>): Record<string, unknown> {
  const data = {};
  for (const [k,v] of map.entries()) {
    data[k] = v;
  }
  return data;
}

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

      return mapToObject(this.migrate(new Map(Object.entries({ 
        ...DEFAULT_CONFIG, 
        ...settings 
      }))));
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

  private migrate(settings: Map<string, string>): Map<string, string> {
    const migrated = this.migrateJsonbin(settings);

    this.save(mapToObject(migrated));
    
    return migrated;
  }

  private migrateJsonbin(settings: Map<string, string>) {
    if (settings.has('tools.jsonbin.url')) {
      const jsonbinUrl = settings.get('tools.jsonbin.url') as string;
      const parts = jsonbinUrl.split('/');
      const id = parts.pop();

      settings.delete('tools.jsonbin.url');
      settings.set('tools.jsonbin.id', id);
    }

    return settings;
  }
}