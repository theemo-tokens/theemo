import Command from './command';
import ReferencesManager from '../manager/references-manager';
import NodeManager from '../manager/node-manager';
import { ALL_STYLES } from '../styles/types';
import { isContextualName } from '../manager/context-manager';


export default class CollectStatsCommand extends Command {
  NAME = 'collect-stats';

  execute() {
    const manager = new ReferencesManager();
    const counter = {
      total: 0,
      text: 0,
      fill: 0,
      stroke: 0,
      effect: 0,
      contexts: 0
    };

    manager.each((node) => {
      const handler = new NodeManager(node);
      for (const style of ALL_STYLES) {
        if (handler.styles[style] && handler.styles[style].to && handler.styles[style].from) {
          counter[style]++;
          counter.total++;

          if (isContextualName(handler.styles[style].to.name)) {
            counter.contexts++;
          }
        }
      }
    });
    this.emitter.sendEvent('stats-collected', counter);
  }
}