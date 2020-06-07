import { NAMESPACE } from '../config';
import Container from '../container/index';
import { RefNode } from '../nodes/types';
import { StyleTypes } from './types';

export default abstract class BaseStyleAdapter {
  abstract type: StyleTypes;

  protected node: RefNode;
  protected container: Container;

  local?: BaseStyle;
  from?: BaseStyle;
  to?: BaseStyle;
  context?: BaseStyle;
  protected transforms: object;

  constructor(node: RefNode, container: Container) {
    this.node = node;
    this.container = container;
  }

  read() {
    this.local = this.node[`${this.type}StyleId`] ? figma.getStyleById(this.node[`${this.type}StyleId`]) : undefined;
  }

  load() {
    const data = JSON.parse(this.node.getSharedPluginData(NAMESPACE, this.type) || '{}');
    
    if (data.from) {
      this.from = figma.getStyleById(data.from);
    }

    if (data.to) {
      this.to = figma.getStyleById(data.to);
    }

    this.transforms = data.transforms;
  }

  needsUnlink() {
    return this.to && !this.local;
  }

  hasReference() {
    return !!this.to;
  }

  // --- context: any

  isContextual(context: string) {
    if (this.to) {
      return this.container.contexts.getContextFromName(this.to.name) === context;
    }

    return false;
  }

  applyForContext(context: string) {
    if (!this.isContextual(context)) {
      this.context = undefined;
      return;
    }

    this.updateContextStyle();
  }

  protected abstract updateContextStyle();

  protected getContextFreeName() {
    if (this.to) {
      const prefix = this.container.settings.get('context.prefix');
      return this.to.name.substr(0, this.to.name.indexOf(prefix));
    }
  }

  save() {
    const data: { from?: string, to?: string, transforms?: object } = {};

    if (this.from && this.to) {
      data.from = this.from.id;
      data.to = this.to.id;
    }

    data.transforms = this.transforms;

    this.node.setSharedPluginData(NAMESPACE, this.type, JSON.stringify(data));
  }

  compile() {
    return {
      local: this.getStyleData(this.local),
      from: this.getStyleData(this.from),
      to: this.getStyleData(this.to),
      transforms: this.transforms
    }
  }

  private getStyleData(style: { id: string, name: string }) {
    if (style) {
      return {
        id: style.id,
        name: style.name
      }
    }

    return null;
  }
}