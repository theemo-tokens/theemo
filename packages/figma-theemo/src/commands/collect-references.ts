import Command from './command';
import { STYLES } from '../styles/types';
import { NAMESPACE } from '../config';

export default class CollectReferencesCommand extends Command {
  NAME = 'collect-references';

  execute() {
    const nodes = [];

    this.container.references.each((node) => {
      const handler = this.container.registry.get(node);
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

    figma.root.setSharedPluginData(NAMESPACE, 'references-data', JSON.stringify(data));
    this.emitter.sendEvent('references-collected', data);
  }

  filter(styles) {
    const filtered = {};

    for (const style of STYLES) {
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