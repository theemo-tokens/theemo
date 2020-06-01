import { copyPaintStyle, createOrFindStyle, applyPaintTransforms } from '../utils';
import StyleAdapter from './adapter';
import BaseStyleAdapter from './base';
import { StyleTypes } from './types';

export class FillStyleAdapter extends BaseStyleAdapter implements StyleAdapter {
  type: StyleTypes.Fill = StyleTypes.Fill;
  collection: 'paint' = 'paint';

  protected local: PaintStyle;
  protected from: PaintStyle;
  protected to: PaintStyle;

  getPool() {
    return figma.getLocalPaintStyles();
  }

  linkOrigin(name) {
    const style = figma.getLocalPaintStyles().find(style => style.name === name);
    if (style) {
      this.node.fillStyleId = style.id;
    }
  }

  migrateOrigin(target) {
    this.from = figma.getStyleById(target) as PaintStyle;
    copyPaintStyle(this.from, this.to);
    this.applyTransforms();
    this.node.fillStyleId = this.to.id;
  }

  unlinkOrigin() {
    this.node.fillStyleId = '';
  }

  createReference(from, name) {
    const origin = figma.getStyleById(from) as PaintStyle;
    const to = createOrFindStyle(name, 'paint') as PaintStyle;
    copyPaintStyle(origin, to);
    this.applyTransforms();
    this.from = origin;
    this.to = to;
    this.node.fillStyleId = to.id;
  }

  unlinkReference() {
    this.node.fillStyleId = this.from.id;
    this.from = undefined;
    this.to = undefined;
  }

  saveTransforms(transforms) {
    this.transforms = transforms;
  }

  updateStyle() {
    if (!this.hasReference()) {
      return;
    }

    copyPaintStyle(this.from, this.to);
    this.applyTransforms();
  }

  private applyTransforms() {
    if (this.to && this.to.paints.length === 1 && this.transforms) {
      this.to.paints = [applyPaintTransforms(this.to.paints[0] as SolidPaint, this.transforms)];
    }
  }
}