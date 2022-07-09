import Command from './command';


export default class UpdateStylesCommand extends Command {
  NAME = 'update-styles';

  execute() {
    this.container.references.eachWithHandler((handler) => {
      handler.updateStyles();
    });
  }
}
