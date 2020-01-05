import { copyEffectStyle, createOrFindStyle } from '../utils';
import StyleAdapter from './adapter';
import BaseStyleAdapter from './base';
import { StyleTypes } from './types';

export class EffectStyleAdapter extends BaseStyleAdapter implements StyleAdapter {
  type: StyleTypes.Effect = StyleTypes.Effect;

  protected local: EffectStyle;
  protected from: EffectStyle;
  protected to: EffectStyle;

  linkOrigin(name) {
    const style = figma.getLocalEffectStyles().find(style => style.name === name);
    if (style) {
      this.node.effectStyleId = style.id;
    }
  }

  migrateOrigin(target) {
    this.from = figma.getStyleById(target) as EffectStyle;
    copyEffectStyle(this.from, this.to);
    this.node.fillStyleId = this.to.id;
  }


  unlinkOrigin() {
    this.node.effectStyleId = '';
  }

  createReference(from, name) {
    const origin = figma.getStyleById(from) as EffectStyle;
    const to = createOrFindStyle(name, 'paint') as EffectStyle;
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

  updateStyle() {
    if (!this.hasReference()) {
      return;
    }

    copyEffectStyle(this.from, this.to);
  }
}