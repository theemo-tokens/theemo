import Command from './command';

export default class SelectContextCommand extends Command {
  NAME = 'select-context';

  execute(ctx) {
    this.container.settings.update('context', ctx);
    
    this.container.references.eachWithHandler((handler) => {
      handler.createContextFree();
    })

    figma.notify(`Context ${ctx} selected`, {
      timeout: 250
    });
  }
}