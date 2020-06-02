import Command from './command';
import SettingsManager from '../settings-manager';



export default class ReadSettingsCommand extends Command {
  NAME = 'read-settings';

  execute() {
    (() => {
      const manager = new SettingsManager();
      this.emitter.sendEvent('settings-arrived', manager.read());
    })();
  }
}
