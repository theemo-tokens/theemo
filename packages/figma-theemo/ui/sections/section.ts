import Messenger from '../messenger';

export default abstract class Section {
  abstract name: string;

  protected messenger: Messenger;
  protected settings: Map<string, any>;

  constructor(messenger: Messenger, settings: Map<string, any>) {
    this.messenger = messenger;
    this.settings = settings;

    this.setup();
  }

  abstract setup();

  updateSettings(settings: Map<string, any>) { }

  activate(data?: any) { }
}