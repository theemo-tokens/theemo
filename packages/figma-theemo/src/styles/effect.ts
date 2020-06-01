import { copyEffectStyle, createOrFindStyle } from '../utils';
import StyleAdapter from './adapter';
import BaseStyleAdapter from './base';
import { StyleTypes } from './types';

export class EffectStyleAdapter extends BaseStyleAdapter implements StyleAdapter {
  type: StyleTypes.Effect = StyleTypes.Effect;
  collection: 'effect' = 'effect';

  protected local: EffectStyle;
  protected from: EffectStyle;
  protected to: EffectStyle;

  getPool() {
    return figma.getLocalEffectStyles();
  }

  linkOrigin(name) {
    const style = figma.getLocalEffectStyles().find(style => style.name === name);
    if (style) {
      this.node.effectStyleId = style.id;
    }
  }

  migrateOrigin(target) {
    this.from = figma.getStyleById(target) as EffectStyle;
    copyEffectStyle(this.from, this.to);
    this.node.effectStyleId = this.to.id;
  }

  unlinkOrigin() {
    this.node.effectStyleId = '';
  }

  createReference(from, name) {
    const origin = figma.getStyleById(from) as EffectStyle;
    const to = createOrFindStyle(name, 'effect') as EffectStyle;
    copyEffectStyle(origin, to);
    this.node.effectStyleId = to.id;
    this.from = origin;
    this.to = to;
  }

  unlinkReference() {
    this.node.effectStyleId = this.from.id;
    this.from = undefined;
    this.to = undefined;
  }

  saveTransforms() {}

  updateStyle() {
    if (!this.hasReference()) {
      return;
    }

    copyEffectStyle(this.from, this.to);
  }
}