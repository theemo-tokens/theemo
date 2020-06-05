import Command from './command';


export default class SaveSettingsCommand extends Command {
  NAME = 'save-settings';

  execute(data) {
    (async () => {
      try {
        this.emitter.sendEvent('settings-arrived', await this.container.settings.save(data));
        figma.notify('Style Reference settings saved');
      } catch (e) {
        console.warn(e);
      }
    })();
  }
}
