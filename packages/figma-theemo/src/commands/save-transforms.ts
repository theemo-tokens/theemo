import Command from './command';
import NodeManager, { RefNode } from '../manager/node-manager';

export default class SaveTransformsCommand extends Command {
  NAME = 'save-transforms';

  execute(data) {
    if (data.node.id) {
      const node = figma.getNodeById(data.node.id);

      if (!node) {
        return;
      }

      const manager = new NodeManager(node as RefNode);
      manager.saveTransforms(data);

      this.emitter.sendEvent('transforms-saved', { style: data.style, data: manager.data.styles[data.style] });
    }
  }
}