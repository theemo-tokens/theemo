import Command from './command';

export default class NotifyCommand extends Command {
  NAME = 'notify';

  execute(message) {
    figma.notify(message);
  }
}