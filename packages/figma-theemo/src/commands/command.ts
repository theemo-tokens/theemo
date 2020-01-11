import Emitter from '../emitter';
import Commander from '../commander';

export default abstract class Command {
  NAME: string;

  private commander: Commander;
  protected emitter: Emitter;

  constructor(commander: Commander, emitter: Emitter) {
    this.commander = commander;
    this.emitter = emitter;
  }

  abstract execute(data?: any);

  protected nodeExists(id: string) {
    return !!figma.getNodeById(id);
  }

  protected run(name: string) {
    this.commander.run(name);
  }
}