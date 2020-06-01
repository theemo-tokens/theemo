import Command from './command';
import NodeManager, { RefNode } from '../manager/node-manager';
import { ALL_STYLES } from '../styles/types';

export default class ImportCommand extends Command {
  NAME = 'import';

  async execute(data) {
    let selection;
    if (figma.currentPage.selection.length > 0) {
      selection = figma.currentPage.selection[0].id;
    }

    let count = 0;
    for (const entry of data.nodes) {
      const node = figma.getNodeById(entry.node.id);
      if (node) {
        const manager = new NodeManager(node as RefNode);

        for (const style of ALL_STYLES) {
          if (entry[style]) {
            const local = figma.getLocalPaintStyles().find(local => local.name === entry[style].from.name);
            await manager.createReference({ style, from: local.id, name: entry[style].to.name });

            if (selection === entry.node.id) {
              this.emitter.sendEvent('reference-created', { style, data: manager.data.styles[style] });
            }
            count++;
          }
        }
      }
    }

    figma.notify(`${count} Reference${count !== 1 ? 's' : ''} imported`);
  }
}