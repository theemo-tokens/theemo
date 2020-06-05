import Command from './command';

export default class CollectStatsCommand extends Command {
  NAME = 'collect-stats';

  execute() {
    const counter = {
      total: 0,
      text: 0,
      fill: 0,
      stroke: 0,
      effect: 0,
      contexts: 0
    };

    this.container.references.each((node) => {
      const handler = this.container.registry.get(node);
      handler.each((adapter) => {
        if (adapter.hasReference()) {
          counter.total++;
          counter[adapter.getType()]++;

          if (adapter.isContextual()) {
            counter.contexts++;
          }
        }
      });
    });

    this.emitter.sendEvent('stats-collected', counter);
  }
}