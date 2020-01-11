import Command from './command';
import SettingsManager from '../settings-manager';

export default class AddContextCommand extends Command {
  NAME = 'add-context';

  execute(ctx) {
    const settings = new SettingsManager();
    const contexts = new Set(settings.get('contexts'));
    contexts.add(ctx);
    settings.update('contexts', Array.from(contexts.values()));
    this.run('read-settings');
  }
}