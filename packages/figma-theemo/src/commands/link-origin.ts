import Command from './command';
import { RefNode } from '../nodes/types';

export default class LinkOriginCommand extends Command {
  NAME = 'link-origin';

  execute(data) {
    if (data.node.id) {
      const node = figma.getNodeById(data.node.id);

      if (!node) {
        return;
      }

      const handler = this.container.registry.get(node as RefNode);
      handler.linkOrigin(data);

      if (handler.hasReference(data.style)) {
        handler.migrateOrigin({ ...data, target: handler.data.styles[data.style].local.id });
      }

      this.emitter.sendEvent('origin-linked', { style: data.style, data: handler.data.styles[data.style] });
    }
  }
}