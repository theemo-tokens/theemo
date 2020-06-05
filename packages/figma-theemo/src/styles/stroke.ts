import { copyPaintStyle, createOrFindStyle, applyPaintTransforms } from './utils';
import StyleAdapter from './adapter';
import BaseStyleAdapter from './base';
import { StyleTypes } from './types';

export class StrokeStyleAdapter extends BaseStyleAdapter implements StyleAdapter {
  type: StyleTypes.Stroke = StyleTypes.Stroke;
  collection: 'paint' = 'paint';

  protected local: PaintStyle;
  protected from: PaintStyle;
  protected to: PaintStyle;
  private contextFree?: PaintStyle;

  getPool() {
    return figma.getLocalPaintStyles();
  }

  // --- UI commands

  linkOrigin(name) {
    const style = figma.getLocalPaintStyles().find(style => style.name === name);
    if (style) {
      this.node.strokeStyleId = style.id;
    }
  }

  migrateOrigin(target) {
    this.from = figma.getStyleById(target) as PaintStyle;
    copyPaintStyle(this.from, this.to);
    this.applyTransforms();
    this.node.strokeStyleId = this.to.id;
  }

  unlinkOrigin() {
    this.node.strokeStyleId = '';
  }

  createReference(from, name) {
    const origin = figma.getStyleById(from) as PaintStyle;
    const to = createOrFindStyle(name, 'paint') as PaintStyle;
    copyPaintStyle(origin, to);
    this.applyTransforms();
    this.node.strokeStyleId = to.id;
    this.from = origin;
    this.to = to;
  }

  unlinkReference() {
    this.node.strokeStyleId = this.from.id;
    this.from = undefined;
    this.to = undefined;
  }

  saveTransforms(transforms) {
    this.transforms = transforms;
  }

  // --- commands

  updateStyle() {
    if (!this.hasReference()) {
      return;
    }

    copyPaintStyle(this.from, this.to);
    this.applyTransforms();
  }

  createContextFree() {
    if (!this.isContextual()) {
      return;
    }

    const contextFree = this.getContextFreeStyle();
    if (contextFree) {
      copyPaintStyle(this.to, contextFree);
    }
  }

  // --- helper

  private applyTransforms() {
    if (this.to && this.to.paints.length === 1 && this.transforms) {
      this.to.paints = [applyPaintTransforms(this.to.paints[0] as SolidPaint, this.transforms)];
    }
  }

  private getContextFreeStyle() {
    if (!this.contextFree && this.to) {
      this.contextFree = createOrFindStyle(this.getContextFreeName(), this.collection) as PaintStyle;
    }

    return this.contextFree;
  }
}