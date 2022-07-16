import Command from './command';
import { STYLES } from '../styles/types';
import { NAMESPACE } from '../config';

export default class MigrateCommand extends Command {
  NAME = 'migrate';

  execute() {
    this.migratePluginData();
    this.migrateJsonbin();
  }

  private migratePluginData() {
    // migrate from plugin data to shared plugin data
    const nodes = figma.root.getPluginData('nodes');
    if (nodes !== '') {
      for (const nodeId of JSON.parse(nodes)) {
        const node = figma.getNodeById(nodeId);
        if (node) {
          for (const style of STYLES) {
            node.setSharedPluginData(NAMESPACE, style, node.getPluginData(style));
            node.setPluginData(style, '');
          }
        }
      }

      figma.root.setSharedPluginData(NAMESPACE, 'nodes', nodes);
      figma.root.setPluginData('nodes', '');
    }
  }

  private migrateJsonbin() {
    const jsonbinUrl = this.container.settings.get('tools.jsonbin.url') as string;

    if (jsonbinUrl) {
      const parts = jsonbinUrl.split('/');
      const id = parts.pop();

      const settings = new Map(this.container.settings.settings);
      settings.delete('tools.jsonbin.url');
      settings.set('tools.jsonbin.id', id);

      const data = {};
      for (const [k,v] of settings.entries()) {
        data[k] = v;
      }
      this.container.settings.save(data);
      this.container.commander.run('read-settings');
    }
  }
}