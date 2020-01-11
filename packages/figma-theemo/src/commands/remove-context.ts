import Command from './command';
import SettingsManager from '../settings-manager';

export default class RemoveContextCommand extends Command {
  NAME = 'remove-context';

  execute(ctx) {
    const settings = new SettingsManager();
    const contexts = new Set(settings.get('contexts'));
    contexts.delete(ctx);
    settings.update('contexts', Array.from(contexts.values()));
    this.run('read-settings');
  }
}