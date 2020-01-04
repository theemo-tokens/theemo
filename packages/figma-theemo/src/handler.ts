import StyleFactory from './styles/factory';
import StyleAdapter from './styles/adapter';
import { StyleTypes, ALL_STYLES } from './styles/types';
import { readNodes, storeNodes } from './utils';

// there is a mismatch between types and documentation
// according to docs: `GroupNode` has styles
// according to types: `GroupNode` does NOT have styles
// type RefNode = GroupNode | ComponentNode | InstanceNode | VectorNode | StarNode | LineNode | EllipseNode | PolygonNode | RectangleNode | TextNode;
export type RefNode = ComponentNode | InstanceNode | VectorNode | StarNode | LineNode | EllipseNode | PolygonNode | RectangleNode | TextNode;

export default class Handler {
  private node: RefNode;
  private adapters: Map<string, StyleAdapter> = new Map();

  constructor(node: RefNode) {
    this.node = node;

    for (const style of ALL_STYLES) {
      // if there is a nice check whether the this.node[`${style}StyleId`]
      // property exists, then there can be a dynamical exploration of which
      // styles are available to the given node (ie. for adding typo and grid
      // styles)
      const adapter = StyleFactory.create(style, node);

      adapter.read();
      adapter.load();

      this.adapters.set(style, adapter);

      if (adapter.needsUnlink()) {
        this.unlinkReference({ style });
      }
    }
  }

  get data() {
    const data = {
      node: {
        id: this.node.id
      },
      styles: {},
      paintStyles: figma.getLocalPaintStyles().map(style => { return { id: style.id, name: style.name } }),
      effectStyles: figma.getLocalEffectStyles().map(style => { return { id: style.id, name: style.name } })
    };

    for (const [style, adapter] of this.adapters.entries()) {
      data.styles[style] = adapter.compile();
    }

    return data;
  }

  //
  // Commands
  //

  createReference({ from, name, style }: { from: string, name: string, style: StyleTypes }) {
    const adapter = this.adapters.get(style);
    if (adapter) {
      adapter.createReference(from, name);
      adapter.save();
      adapter.read();
    }

    // store node in document
    this.storeNode();
  }

  unlinkReference({ style }: { style: StyleTypes }) {
    const adapter = this.adapters.get(style);
    if (adapter) {
      adapter.unlinkReference();
      adapter.save();
      adapter.read();
    }

    const hasReferences = Array.from(this.adapters.values()).some(adapter => adapter.hasReference());
    if (!hasReferences) {
      this.deleteNode();
    }
  }

  migrateOrigin({ style, target }: { style: StyleTypes, target: string }) {
    const adapter = this.adapters.get(style);
    if (adapter) {
      adapter.migrateOrigin(target);
      adapter.save();
      adapter.read();
    }
  }

  linkOrigin({ style, name }: { style: StyleTypes, name: string }) {
    const adapter = this.adapters.get(style);
    if (adapter) {
      adapter.linkOrigin(name);
      adapter.read();
    }
  }

  private storeNode() {
    const nodes = readNodes();
    nodes.add(this.node.id);
    storeNodes(nodes);
  }

  private deleteNode() {
    const nodes = readNodes();
    nodes.delete(this.node.id);
    storeNodes(nodes);
  }

  updateStyles() {
    for (const adapter of this.adapters.values()) {
      adapter.updateStyle();
    }
  }
}