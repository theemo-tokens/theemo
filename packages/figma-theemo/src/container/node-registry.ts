import { RefNode } from '../nodes/types';
import NodeHandler from '../nodes/handler';
import Container from './index';

export default class NodeRegistry {
  private repo = new Map<string, NodeHandler>();

  constructor(private container: Container) {}

  get(node: RefNode): NodeHandler {
    if (!this.repo.has(node.id)) {
      this.repo.set(node.id, new NodeHandler(node, this.container));
    }

    return this.repo.get(node.id) as NodeHandler;
  }

  removeById(id: string) {
    this.repo.delete(id);
  }

  readLocalStylesRepo() {
    return {
      paint: figma.getLocalPaintStyles().map(style => { return { id: style.id, name: style.name } }),
      effect: figma.getLocalEffectStyles().map(style => { return { id: style.id, name: style.name } }),
      text: figma.getLocalTextStyles().map(style => { return { id: style.id, name: style.name } })
    };
  }
}