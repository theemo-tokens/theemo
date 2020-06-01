import { copyEffectStyle, copyGridStyle, copyPaintStyle, copyTextStyle } from '../utils';
import SettingsManager from '../settings-manager';

export default class ContextManager {

  private settings = new SettingsManager();

  private get prefix() {
    return this.settings.get('context.prefix');
  }

  private get context() {
    return this.settings.get('context');
  }

  private get contexts() {
    return this.settings.get('contexts');
  }

  isContextualName(name: string) {
    return this.getContextFromName(name) !== '';
  }

  getContextFromName(name: string) {
    const ctx = name.substr(name.indexOf(this.prefix) + this.prefix.length);
    if (this.contexts.includes(ctx)) {
      return ctx;
    }
  }

  async selectActiveContext() {
    this.selectContext(this.context);
  }

  async selectContext(context: string) {
    const styles: BaseStyle[] = [].concat(
      figma.getLocalPaintStyles(),
      figma.getLocalEffectStyles(),
      figma.getLocalGridStyles(),
      figma.getLocalTextStyles()
    );

    for (const style of styles) {
      const suffix = `${this.prefix}${context}`;
      if (style.name.endsWith(suffix)) {
        await this.createContextfreeStyle(style);
      }
    }
  }

  async createContextfreeStyle(style: BaseStyle) {
    const context = this.getContextFromName(style.name);
    if (!context) {
      return;
    }

    const suffix = `${this.prefix}${context}`;
    if (style.name.endsWith(suffix)) {
      const name = style.name.replace(suffix, '');

      switch (style.type) {
        case 'EFFECT':
          let effect = figma.getLocalEffectStyles().find(style => style.name === name);
          if (!effect) {
            effect = figma.createEffectStyle();
            effect.name = name;
          }
          await copyEffectStyle(style as EffectStyle, effect);
          break;

        case 'GRID':
          let grid = figma.getLocalGridStyles().find(style => style.name === name);
          if (!grid) {
            grid = figma.createGridStyle();
            grid.name = name;
          }
          await copyGridStyle(style as GridStyle, grid);
          break;

        case 'PAINT':
          let paint = figma.getLocalPaintStyles().find(style => style.name === name);
          if (!paint) {
            paint = figma.createPaintStyle();
            paint.name = name;
          }
          await copyPaintStyle(style as PaintStyle, paint);
          break;

        case 'TEXT':
          let text = figma.getLocalTextStyles().find(style => style.name === name);
          if (!text) {
            text = figma.createTextStyle();
            text.name = name;
          }
          await copyTextStyle(style as TextStyle, text);
          break;
      }
    }
  }
}