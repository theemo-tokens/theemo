import StyleAdapter from '../styles/adapter';
import { ALL_STYLES, StyleTypes } from '../styles/types';
import StyleFactory from '../styles/factory';
import ReferencesManager from './references-manager';
import ContextManager from './context-manager';


// there is a mismatch between types and documentation
// according to docs: `GroupNode` has styles
// according to types: `GroupNode` does NOT have styles
// type RefNode = GroupNode | ComponentNode | InstanceNode | VectorNode | StarNode | LineNode | EllipseNode | PolygonNode | RectangleNode | TextNode;
export type RefNode = ComponentNode | InstanceNode | VectorNode | StarNode | LineNode | EllipseNode | PolygonNode | RectangleNode | TextNode;

export default class NodeManager {
  private node: RefNode;
  private adapters: Map<string, StyleAdapter> = new Map();
  private references = new ReferencesManager();
  private contextManager = new ContextManager();

  constructor(node: RefNode) {
    this.node = node;

    const styles = new Set(ALL_STYLES);
    if (node.type !== 'TEXT') {
      styles.delete(StyleTypes.Text);
    }

    for (const style of styles) {
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
        effect: figma.getLocalEffectStyles().map(style => { return { id: style.id, name: style.name } }),
        text: figma.getLocalTextStyles().map(style => { return { id: style.id, name: style.name } })
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

  async migrateOrigin({ style, target }: { style: StyleTypes, target: string }) {
    const adapter = this.adapters.get(style);
    if (adapter) {
      await adapter.migrateOrigin(target);
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

  async createReference({ from, name, style }: { from: string, name: string, style: StyleTypes }) {
    const adapter = this.adapters.get(style);
    if (adapter) {
      await adapter.createReference(from, name);
      adapter.save();
      adapter.read();

      const style = adapter.getStyle();
      if (style) {
        await this.contextManager.createContextfreeStyle(style);
      }
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

  saveTransforms({ style, transforms }: { style: StyleTypes, transforms: object }) {
    const adapter = this.adapters.get(style);
    if (adapter) {
      adapter.saveTransforms(transforms);
      adapter.save();
      adapter.read();
    }
  }

  private storeNode() {
    this.references.addNode(this.node);
  }

  private deleteNode() {
    this.references.deleteNode(this.node);
  }

  async updateStyles() {
    for (const adapter of this.adapters.values()) {
      await adapter.updateStyle();
    }

    await this.contextManager.selectActiveContext();
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