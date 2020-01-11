import Command from './command';
import SettingsManager from '../settings-manager';

export default class SaveSettingsCommand extends Command {
  NAME = 'save-settings';

  execute(data) {
    (async () => {
      try {
        const manager = new SettingsManager();
        this.emitter.sendEvent('settings-arrived', await manager.save(data));
        figma.notify('Style Reference settings saved');
      } catch (e) {
        console.warn(e);
      }
    })();
  }
}
