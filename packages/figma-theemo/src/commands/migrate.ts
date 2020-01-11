import Command from './command';
import { ALL_STYLES } from '../styles/types';
import { NAMESPACE } from '../config';

export default class MigrateCommand extends Command {
  NAME = 'migrate';

  execute() {
    // migrate from plugin data to shared plugin data
    const nodes = figma.root.getPluginData('nodes');
    if (nodes !== '') {
      for (const nodeId of JSON.parse(nodes)) {
        const node = figma.getNodeById(nodeId);
        if (node) {
          for (const style of ALL_STYLES) {
            node.setSharedPluginData(NAMESPACE, style, node.getPluginData(style));
            node.setPluginData(style, '');
          }
        }
      }

      figma.root.setSharedPluginData(NAMESPACE, 'nodes', nodes);
      figma.root.setPluginData('nodes', '');
    }
  }
}