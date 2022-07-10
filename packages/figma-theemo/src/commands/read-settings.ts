import Command from './command';

export default class ReadSettingsCommand extends Command {
  NAME = 'read-settings';

  execute() {
    this.container.settings.read().then(config => {
      this.emitter.sendEvent('settings-arrived', config);
    });
  }
}
