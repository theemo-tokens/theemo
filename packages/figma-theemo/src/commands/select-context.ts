import Command from './command';
import SettingsManager from '../settings-manager';
import { copyEffectStyle, copyGridStyle, copyPaintStyle, copyTextStyle } from '../utils';

export default class SelectContextCommand extends Command {
  NAME = 'select-context';

  execute(ctx) {
    const settings = new SettingsManager();
    settings.update('context', ctx);

    const suffix = `${settings.get('context.prefix')}${settings.get('context')}`;

    this.updateStyles(suffix);
    figma.notify(`Context ${ctx} selected`, {
      timeout: 250
    });
  }

  updateStyles(suffix) {
    const styles: BaseStyle[] = [].concat(
      figma.getLocalPaintStyles(),
      figma.getLocalEffectStyles(),
      figma.getLocalGridStyles(),
      figma.getLocalTextStyles()
    );

    for (const style of styles) {
      if (style.name.endsWith(suffix)) {
        const name = style.name.replace(suffix, '');

        switch (style.type) {
          case 'EFFECT':
            let effect = figma.getLocalEffectStyles().find(style => style.name === name);
            if (!effect) {
              effect = figma.createEffectStyle();
              effect.name = name;
            }
            copyEffectStyle(style as EffectStyle, effect);
            break;

          case 'GRID':
            let grid = figma.getLocalGridStyles().find(style => style.name === name);
            if (!grid) {
              grid = figma.createGridStyle();
              grid.name = name;
            }
            copyGridStyle(style as GridStyle, grid);
            break;

          case 'PAINT':
            let paint = figma.getLocalPaintStyles().find(style => style.name === name);
            if (!paint) {
              paint = figma.createPaintStyle();
              paint.name = name;
            }
            copyPaintStyle(style as PaintStyle, paint);
            break;

          case 'TEXT':
            let text = figma.getLocalTextStyles().find(style => style.name === name);
            if (!text) {
              text = figma.createTextStyle();
              text.name = name;
            }
            copyTextStyle(style as TextStyle, text);
            break;
        }
      }
    }
  }
}