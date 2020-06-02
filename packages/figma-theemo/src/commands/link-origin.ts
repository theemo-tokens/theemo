import Command from './command';
import NodeManager, { RefNode } from '../manager/node-manager';

export default class LinkOriginCommand extends Command {
  NAME = 'link-origin';

  execute(data) {
    if (data.node.id) {
      const node = figma.getNodeById(data.node.id);

      if (!node) {
        return;
      }

      const manager = new NodeManager(node as RefNode);
      manager.linkOrigin(data);

      if (manager.hasReference(data.style)) {
        manager.migrateOrigin({ ...data, target: manager.data.styles[data.style].local.id });
      }

      this.emitter.sendEvent('origin-linked', { style: data.style, data: manager.data.styles[data.style] });
    }
  }
}