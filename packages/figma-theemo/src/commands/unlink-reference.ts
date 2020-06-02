import Command from './command';
import NodeManager, { RefNode } from '../manager/node-manager';

export default class UnlinkReferenceCommand extends Command {
  NAME = 'unlink-reference';

  execute(data) {
    if (data.node.id) {
      const node = figma.getNodeById(data.node.id);

      if (!node) {
        return;
      }

      const manager = new NodeManager(node as RefNode);
      manager.unlinkReference(data);

      this.emitter.sendEvent('reference-unlinked', { style: data.style, data: manager.data.styles[data.style] });
    }
  }
}