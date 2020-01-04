import { RefNode } from '../handler';
import { StyleTypes } from './types';
import { NAMESPACE } from '../config';

export default abstract class BaseStyleAdapter {
  abstract type: StyleTypes;

  protected node: RefNode;

  protected abstract local: BaseStyle;
  protected abstract from: BaseStyle;
  protected abstract to: BaseStyle;

  constructor(node: RefNode) {
    this.node = node;
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
  }

  needsUnlink() {
    return this.to && !this.local;
  }

  hasReference() {
    return !!this.to;
  }

  save() {
    const data: { from?: string, to?: string } = {};

    if (this.from && this.to) {
      data.from = this.from.id;
      data.to = this.to.id;
    }

    this.node.setSharedPluginData(NAMESPACE, this.type, JSON.stringify(data));
  }

  compile() {
    return {
      local: this.getStyleData(this.local),
      from: this.getStyleData(this.from),
      to: this.getStyleData(this.to)
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