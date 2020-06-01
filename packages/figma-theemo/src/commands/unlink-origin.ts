import Command from './command';
import NodeManager, { RefNode } from '../manager/node-manager';

export default class UnlinkOriginCommand extends Command {
  NAME = 'unlink-origin';

  async execute(data) {
    if (data.node.id) {
      const node = figma.getNodeById(data.node.id);

      if (!node) {
        return;
      }

      const manager = new NodeManager(node as RefNode);
      await manager.unlinkOrigin(data);

      this.emitter.sendEvent('origin-unlinked', { style: data.style, data: manager.data.styles[data.style] });
    }
  }
}