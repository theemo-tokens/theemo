import Command from './command';
import NodeManager, { RefNode } from '../manager/node-manager';

export default class CreateReferenceCommand extends Command {
  NAME = 'create-reference';

  async execute(data) {
    if (data.node.id) {
      const node = figma.getNodeById(data.node.id);

      if (!node) {
        return;
      }

      const manager = new NodeManager(node as RefNode);
      await manager.createReference(data);

      this.emitter.sendEvent('reference-created', { style: data.style, data: manager.data.styles[data.style] });
    }
  }
}