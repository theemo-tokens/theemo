import Command from './command';
import SettingsManager from '../settings-manager';
import { copyEffectStyle, copyGridStyle, copyPaintStyle, copyTextStyle } from '../utils';
import ContextManager from '../manager/context-manager';

export default class SelectContextCommand extends Command {
  NAME = 'select-context';

  async execute(ctx) {
    const settings = new SettingsManager();
    settings.update('context', ctx);

    const contextManager = new ContextManager();
    await contextManager.selectContext(ctx);

    figma.notify(`Context ${ctx} selected`, {
      timeout: 250
    });
  }
}