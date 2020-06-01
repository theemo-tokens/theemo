import AddContextCommand from './commands/add-context';
import CollectReferencesCommand from './commands/collect-references';
import Command from './commands/command';
import CreateReferenceCommand from './commands/create-reference';
import ImportCommand from './commands/import';
import LinkOriginCommand from './commands/link-origin';
import MigrateCommand from './commands/migrate';
import MigrateOriginCommand from './commands/migrate-origin';
import NotifyCommand from './commands/notify';
import ReadSettingsCommand from './commands/read-settings';
import RemoveContextCommand from './commands/remove-context';
import SaveSettingsCommand from './commands/save-settings';
import SaveTransformsCommand from './commands/save-transforms';
import SelectContextCommand from './commands/select-context';
import UnlinkOriginCommand from './commands/unlink-origin';
import UnlinkReferenceCommand from './commands/unlink-reference';
import UpdateStylesCommand from './commands/update-styles';
import Emitter from './emitter';


export default class Commander {
  private commands: Map<string, Command> = new Map();

  constructor(emitter: Emitter) {
    // node commands
    this.registerCommand(new CreateReferenceCommand(this, emitter));
    this.registerCommand(new LinkOriginCommand(this, emitter));
    this.registerCommand(new MigrateOriginCommand(this, emitter));
    this.registerCommand(new UnlinkOriginCommand(this, emitter));
    this.registerCommand(new UnlinkReferenceCommand(this, emitter));
    this.registerCommand(new SaveTransformsCommand(this, emitter));

    // tools
    this.registerCommand(new UpdateStylesCommand(this, emitter));
    this.registerCommand(new CollectReferencesCommand(this, emitter));
    this.registerCommand(new AddContextCommand(this, emitter));
    this.registerCommand(new RemoveContextCommand(this, emitter));
    this.registerCommand(new SelectContextCommand(this, emitter));
    this.registerCommand(new ImportCommand(this, emitter));

    // utils
    this.registerCommand(new NotifyCommand(this, emitter));

    // internal
    this.registerCommand(new MigrateCommand(this, emitter));
    this.registerCommand(new ReadSettingsCommand(this, emitter));
    this.registerCommand(new SaveSettingsCommand(this, emitter));

    this.listen();
  }

  private registerCommand(command: Command) {
    this.commands.set(command.NAME, command);
  }

  async run(name: string, data?: any) {
    if (this.commands.has(name)) {
      await this.commands.get(name).execute(data);
    }
  }

  listen() {
    figma.ui.onmessage = async msg => {
      if (this.commands.has(msg.command)) {
        await this.commands.get(msg.command).execute(msg.data);
      }
    };
  }

}