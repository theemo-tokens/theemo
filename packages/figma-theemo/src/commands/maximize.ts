import Command from './command';

export default class MaximizeCommand extends Command {
  NAME = 'maximize';

  execute() {
    figma.ui.resize(380, 350);
  }
}