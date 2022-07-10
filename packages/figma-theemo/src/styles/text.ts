import { copyTextStyle, createOrFindStyle } from './utils';
import StyleAdapter from './adapter';
import BaseStyleAdapter from './base';
import { StyleTypes } from './types';

export class TextStyleAdapter extends BaseStyleAdapter implements StyleAdapter {
  type: StyleTypes.Text = StyleTypes.Text;
  collection: 'text' = 'text';
  node: TextNode;

  local?: TextStyle;
  from?: TextStyle;
  to?: TextStyle;
  context?: TextStyle;

  getPool() {
    return figma.getLocalTextStyles();
  }

  // --- UI commands

  linkOrigin(name) {
    const style = figma.getLocalTextStyles().find(style => style.name === name);
    if (style) {
      this.node.textStyleId = style.id;
      this.local = style;
    }
  }

  migrateOrigin(target) {
    this.from = figma.getStyleById(target) as TextStyle;
    copyTextStyle(this.from, this.to);
    this.node.textStyleId = this.to.id;
  }

  unlinkOrigin() {
    this.node.textStyleId = '';
    this.local = undefined;
  }

  createReference(from, name) {
    const origin = figma.getStyleById(from) as TextStyle;
    const to = createOrFindStyle(name, 'text') as TextStyle;
    copyTextStyle(origin, to);
    
    this.node.textStyleId = to.id;
    this.local = to;

    this.from = origin;
    this.to = to;
  }

  unlinkReference() {
    this.node.textStyleId = this.from.id;
    this.local = this.from;
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

  // --- helper

  private createOrFindContextStyle() {
    if (!this.context && this.to) {
      this.context = createOrFindStyle(this.getContextFreeName(), this.collection) as TextStyle;
    }

    return this.context;
  }

  protected updateContextStyle() {
    const contextFree = this.createOrFindContextStyle();
    if (contextFree) {
      contextFree.name = this.getContextFreeName();
      copyTextStyle(this.to, contextFree);
    }
  }
}