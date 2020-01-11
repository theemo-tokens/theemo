import { NAMESPACE } from '../config';
import { RefNode } from './node-manager';

export default class ReferencesManager {
  readNodes(): Set<string> {
    return new Set<string>(Array.from(JSON.parse(figma.root.getSharedPluginData(NAMESPACE, 'nodes') || '[]')));
  }

  storeNodes(nodes: Set<string>) {
    figma.root.setSharedPluginData(NAMESPACE, 'nodes', JSON.stringify(Array.from(nodes.values())));
  }

  each(callback: (node: RefNode) => void) {
    const nodes = this.readNodes();
    for (const id of nodes.values()) {
      const node = figma.getNodeById(id) as RefNode;
      if (node) {
        callback(node);
      } else {
        nodes.delete(id);
      }
    }
    this.storeNodes(nodes);
  }

  addNode(node: BaseNode) {
    const nodes = this.readNodes();
    nodes.add(node.id);
    this.storeNodes(nodes);
  }

  deleteNode(node: BaseNode) {
    const nodes = this.readNodes();
    nodes.delete(node.id);
    this.storeNodes(nodes);
  }
}