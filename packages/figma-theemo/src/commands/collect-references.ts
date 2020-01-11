import Command from './command';
import ReferencesManager from '../manager/references-manager';
import NodeManager from '../manager/node-manager';
import { ALL_STYLES } from '../styles/types';

export default class CollectReferencesCommand extends Command {
  NAME = 'collect-references';

  execute() {
    const manager = new ReferencesManager();
    const nodes = [];

    manager.each((node) => {
      const handler = new NodeManager(node);
      nodes.push({
        node: {
          id: node.id
        }, ...this.filter(handler.data.styles)
      });
    });

    const data = {
      document: {
        id: figma.root.id,
        name: figma.root.name
      },
      nodes
    };

    this.emitter.sendEvent('references-collected', data);
  }

  filter(styles) {
    const filtered = {};

    for (const style of ALL_STYLES) {
      if (styles[style]) {
        if (styles[style].from && styles[style].to) {
          filtered[style] = styles[style];
          delete filtered[style].local;
        }
      }
    }

    return filtered;
  }
}