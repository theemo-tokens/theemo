import StyleAdapter from '../styles/adapter';
import { ALL_STYLES, StyleTypes } from '../styles/types';
import StyleFactory from '../styles/factory';
import ReferencesManager from './references-manager';


// there is a mismatch between types and documentation
// according to docs: `GroupNode` has styles
// according to types: `GroupNode` does NOT have styles
// type RefNode = GroupNode | ComponentNode | InstanceNode | VectorNode | StarNode | LineNode | EllipseNode | PolygonNode | RectangleNode | TextNode;
export type RefNode = ComponentNode | InstanceNode | VectorNode | StarNode | LineNode | EllipseNode | PolygonNode | RectangleNode | TextNode;

export default class NodeManager {
  private node: RefNode;
  private adapters: Map<string, StyleAdapter> = new Map();
  private references = new ReferencesManager();

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
      collection: {},
      repo: {
        paint: figma.getLocalPaintStyles().map(style => { return { id: style.id, name: style.name } }),
        effect: figma.getLocalEffectStyles().map(style => { return { id: style.id, name: style.name } })
      }
    };

    for (const [style, adapter] of this.adapters.entries()) {
      data.styles[style] = adapter.compile();
      data.collection[style] = adapter.collection;
    }

    return data;
  }

  hasReference(style: string) {
    const adapter = this.adapters.get(style);
    if (adapter) {
      return adapter.hasReference();
    }

    return false;
  }

  //
  // Commands
  //

  linkOrigin({ style, name }: { style: StyleTypes, name: string }) {
    const adapter = this.adapters.get(style);
    if (adapter) {
      adapter.linkOrigin(name);
      adapter.read();
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

  unlinkOrigin({ style }: { style: StyleTypes }) {
    const adapter = this.adapters.get(style);
    if (adapter && !adapter.hasReference()) {
      adapter.unlinkOrigin();
      adapter.read();
    }
  }

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

  private storeNode() {
    this.references.addNode(this.node);
  }

  private deleteNode() {
    this.references.deleteNode(this.node);
  }

  updateStyles() {
    for (const adapter of this.adapters.values()) {
      adapter.updateStyle();
    }
  }

  static canHandleNode(node: SceneNode) {
    return node.type === 'GROUP' ||
      node.type === 'COMPONENT' ||
      node.type === 'INSTANCE' ||
      node.type === 'VECTOR' ||
      node.type === 'STAR' ||
      node.type === 'LINE' ||
      node.type === 'ELLIPSE' ||
      node.type === 'POLYGON' ||
      node.type === 'RECTANGLE' ||
      node.type === 'TEXT';
  }
}