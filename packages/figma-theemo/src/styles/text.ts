import { copyTextStyle, createOrFindStyle } from '../utils';
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

  getPool() {
    return figma.getLocalTextStyles();
  }

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

  saveTransforms() {}

  updateStyle() {
    if (!this.hasReference()) {
      return;
    }

    copyTextStyle(this.from, this.to);
  }
}