import Command from './command';

export default class SelectContextCommand extends Command {
  NAME = 'select-context';

  execute(context) {
    this.container.settings.update('context', context);
    
    this.container.references.eachWithHandler((handler) => {
      handler.applyForContext(context);
    });

    figma.notify(`Context ${context} selected`, {
      timeout: 250
    });
  }
}