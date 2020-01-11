import Command from './command';
import NodeManager, { RefNode } from '../manager/node-manager';

export default class MigrateOriginCommand extends Command {
  NAME = 'migrate-origin';

  execute(data) {
    if (data.node.id) {
      const node = figma.getNodeById(data.node.id);

      if (!node) {
        return;
      }

      const manager = new NodeManager(node as RefNode);
      manager.migrateOrigin(data);

      this.emitter.sendEvent('origin-migrated', { style: data.style, data: manager.data.styles[data.style] });
    }
  }
}