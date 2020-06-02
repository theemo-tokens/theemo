import Command from './command';
import SettingsManager from '../settings-manager';
import { selectContext } from '../manager/context-manager';

export default class SelectContextCommand extends Command {
  NAME = 'select-context';

  execute(ctx) {
    const settings = new SettingsManager();
    settings.update('context', ctx);

    selectContext(ctx);

    figma.notify(`Context ${ctx} selected`, {
      timeout: 250
    });
  }
}