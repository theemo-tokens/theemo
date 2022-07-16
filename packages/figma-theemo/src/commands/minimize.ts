import Command from './command';

export default class MinimizeCommand extends Command {
  NAME = 'minimize';

  execute() {
    figma.ui.resize(380, 40);
  }
}