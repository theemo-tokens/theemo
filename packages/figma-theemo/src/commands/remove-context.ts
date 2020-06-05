import Command from './command';


export default class RemoveContextCommand extends Command {
  NAME = 'remove-context';

  execute(ctx) {
    const settings = this.container.settings;
    const contexts = new Set(settings.get('contexts'));
    contexts.delete(ctx);
    settings.update('contexts', Array.from(contexts.values()));
    this.run('read-settings');
  }
}