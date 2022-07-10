import Emitter from '../container/emitter';
import Container from '../container/index';
import Commander from '../container/commander';

export default abstract class Command {
  NAME: string;

  private commander: Commander;
  protected container: Container;
  protected emitter: Emitter;

  constructor(commander: Commander, container: Container) {
    this.commander = commander;
    this.container = container;
    this.emitter = container.emitter;
  }

  abstract execute(data?: any);

  protected nodeExists(id: string) {
    return !!figma.getNodeById(id);
  }

  protected run(name: string) {
    this.commander.run(name);
  }
}