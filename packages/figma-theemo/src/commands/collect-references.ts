import Command from './command';
import ReferencesManager from '../manager/references-manager';
import NodeManager from '../manager/node-manager';

export default class CollectReferencesCommand extends Command {
  NAME = 'collect-references';

  execute() {
    const manager = new ReferencesManager();
    const data = [];

    manager.each((node) => {
      const handler = new NodeManager(node);
      data.push({ node: node.id, ...handler.data.styles });
    });

    this.emitter.sendEvent('references-collected', data);
  }
}