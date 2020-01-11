import { copyPaintStyle, createOrFindStyle } from '../utils';
import StyleAdapter from './adapter';
import BaseStyleAdapter from './base';
import { StyleTypes } from './types';

export class StrokeStyleAdapter extends BaseStyleAdapter implements StyleAdapter {
  type: StyleTypes.Stroke = StyleTypes.Stroke;
  collection: 'paint' = 'paint';

  protected local: PaintStyle;
  protected from: PaintStyle;
  protected to: PaintStyle;

  linkOrigin(name) {
    const style = figma.getLocalPaintStyles().find(style => style.name === name);
    if (style) {
      this.node.strokeStyleId = style.id;
    }
  }

  migrateOrigin(target) {
    this.from = figma.getStyleById(target) as PaintStyle;
    copyPaintStyle(this.from, this.to);
    this.node.strokeStyleId = this.to.id;
  }

  unlinkOrigin() {
    this.node.strokeStyleId = '';
  }

  createReference(from, name) {
    const origin = figma.getStyleById(from) as PaintStyle;
    const to = createOrFindStyle(name, 'paint') as PaintStyle;
    copyPaintStyle(origin, to);
    this.node.strokeStyleId = to.id;
    this.from = origin;
    this.to = to;
  }

  unlinkReference() {
    this.node.strokeStyleId = this.from.id;
    this.from = undefined;
    this.to = undefined;
  }

  updateStyle() {
    if (!this.hasReference()) {
      return;
    }

    copyPaintStyle(this.from, this.to);
  }
}