import { copyTextStyle, createOrFindStyle } from './utils';
import StyleAdapter from './adapter';
import BaseStyleAdapter from './base';
import { StyleTypes } from './types';

export class TextStyleAdapter extends BaseStyleAdapter implements StyleAdapter {
  type: StyleTypes.Text = StyleTypes.Text;
  collection: 'text' = 'text';
  node: TextNode;

  protected local: TextStyle;
  protected from: TextStyle;
  protected to: TextStyle;
  private contextFree?: TextStyle;

  getPool() {
    return figma.getLocalTextStyles();
  }

  // --- UI commands

  linkOrigin(name) {
    const style = figma.getLocalTextStyles().find(style => style.name === name);
    if (style) {
      this.node.textStyleId = style.id;
    }
  }

  migrateOrigin(target) {
    this.from = figma.getStyleById(target) as TextStyle;
    copyTextStyle(this.from, this.to);
    this.node.textStyleId = this.to.id;
  }

  unlinkOrigin() {
    this.node.textStyleId = '';
  }

  createReference(from, name) {
    const origin = figma.getStyleById(from) as TextStyle;
    const to = createOrFindStyle(name, 'text') as TextStyle;
    copyTextStyle(origin, to);
    this.from = origin;
    this.to = to;
    this.node.textStyleId = to.id;
  }

  unlinkReference() {
    this.node.textStyleId = this.from.id;
    this.from = undefined;
    this.to = undefined;
  }

  saveTransforms() { }
  
  // --- commands

  updateStyle() {
    if (!this.hasReference()) {
      return;
    }

    copyTextStyle(this.from, this.to);
  }

  createContextFree() {
    if (!this.isContextual()) {
      return;
    }

    const contextFree = this.getContextFreeStyle();
    if (contextFree) {
      copyTextStyle(this.to, contextFree);
    }
  }

  // --- helper

  private getContextFreeStyle() {
    if (!this.contextFree && this.to) {
      this.contextFree = createOrFindStyle(this.getContextFreeName(), this.collection) as TextStyle;
    }

    return this.contextFree;
  }
}