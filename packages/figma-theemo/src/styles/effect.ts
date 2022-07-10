import { copyEffectStyle, createOrFindStyle } from './utils';
import StyleAdapter from './adapter';
import BaseStyleAdapter from './base';
import { StyleTypes } from './types';

export class EffectStyleAdapter extends BaseStyleAdapter implements StyleAdapter {
  type: StyleTypes.Effect = StyleTypes.Effect;
  collection: 'effect' = 'effect';

  local?: EffectStyle;
  from?: EffectStyle;
  to?: EffectStyle;
  context?: EffectStyle;

  getPool() {
    return figma.getLocalEffectStyles();
  }

  // --- UI commands

  linkOrigin(name: string) {
    const style = figma.getLocalEffectStyles().find(style => style.name === name);
    if (style) {
      this.node.effectStyleId = style.id;
      this.local = style;
    }
  }

  migrateOrigin(targetId: string) {
    this.from = figma.getStyleById(targetId) as EffectStyle;
    copyEffectStyle(this.from, this.to);
    this.node.effectStyleId = this.to.id;
  }

  unlinkOrigin() {
    this.node.effectStyleId = '';
    this.local = undefined;
  }

  createReference(from, name) {
    const origin = figma.getStyleById(from) as EffectStyle;
    const to = createOrFindStyle(name, 'effect') as EffectStyle;
    copyEffectStyle(origin, to);

    this.node.effectStyleId = to.id;
    this.local = to;

    this.from = origin;
    this.to = to;
  }

  unlinkReference() {
    this.node.effectStyleId = this.from.id;
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

    copyEffectStyle(this.from, this.to);
  }

  // --- helper

  private createOrFindContextStyle() {
    if (!this.context && this.to) {
      this.context = createOrFindStyle(this.getContextFreeName(), this.collection) as EffectStyle;
    }

    return this.context;
  }

  protected updateContextStyle() {
    const contextFree = this.createOrFindContextStyle();
    if (contextFree) {
      contextFree.name = this.getContextFreeName();
      copyEffectStyle(this.to, contextFree);
    }
  }
}