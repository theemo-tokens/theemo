import Command from './command';
export default class AddContextCommand extends Command {
  NAME = 'add-context';

  execute(ctx) {
    const contexts = new Set(this.container.settings.get('contexts'));
    contexts.add(ctx);
    this.container.settings.update('contexts', Array.from(contexts.values()));
    this.run('read-settings');
  }
}