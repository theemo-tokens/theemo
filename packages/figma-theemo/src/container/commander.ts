import AddContextCommand from '../commands/add-context';
import CollectReferencesCommand from '../commands/collect-references';
import CollectStatsCommand from '../commands/collect-stats';
import Command from '../commands/command';
import CreateReferenceCommand from '../commands/create-reference';
import ImportCommand from '../commands/import';
import LinkOriginCommand from '../commands/link-origin';
import MaximizeCommand from '../commands/maximize';
import MigrateCommand from '../commands/migrate';
import MigrateOriginCommand from '../commands/migrate-origin';
import MinimizeCommand from '../commands/minimize';
import NotifyCommand from '../commands/notify';
import ReadSettingsCommand from '../commands/read-settings';
import RemoveContextCommand from '../commands/remove-context';
import SaveSettingsCommand from '../commands/save-settings';
import SaveTransformsCommand from '../commands/save-transforms';
import SelectContextCommand from '../commands/select-context';
import UnlinkOriginCommand from '../commands/unlink-origin';
import UnlinkReferenceCommand from '../commands/unlink-reference';
import UpdateStylesCommand from '../commands/update-styles';
import Container from './index';

export default class Commander {
  private commands: Map<string, Command> = new Map();

  constructor(container: Container) {
    // node commands
    this.registerCommand(new CreateReferenceCommand(this, container));
    this.registerCommand(new LinkOriginCommand(this, container));
    this.registerCommand(new MigrateOriginCommand(this, container));
    this.registerCommand(new UnlinkOriginCommand(this, container));
    this.registerCommand(new UnlinkReferenceCommand(this, container));
    this.registerCommand(new SaveTransformsCommand(this, container));

    // tools
    this.registerCommand(new UpdateStylesCommand(this, container));
    this.registerCommand(new CollectReferencesCommand(this, container));
    this.registerCommand(new AddContextCommand(this, container));
    this.registerCommand(new RemoveContextCommand(this, container));
    this.registerCommand(new SelectContextCommand(this, container));
    this.registerCommand(new ImportCommand(this, container));
    this.registerCommand(new CollectStatsCommand(this, container));

    // ui
    this.registerCommand(new MinimizeCommand(this, container));
    this.registerCommand(new MaximizeCommand(this, container));

    // utils
    this.registerCommand(new NotifyCommand(this, container));

    // internal
    this.registerCommand(new MigrateCommand(this, container));
    this.registerCommand(new ReadSettingsCommand(this, container));
    this.registerCommand(new SaveSettingsCommand(this, container));

    this.listen();
  }

  private registerCommand(command: Command) {
    this.commands.set(command.NAME, command);
  }

  run(name: string, data?: any) {
    if (this.commands.has(name)) {
      this.commands.get(name).execute(data);
    }
  }

  listen() {
    figma.ui.onmessage = msg => {
      if (this.commands.has(msg.command)) {
        this.commands.get(msg.command).execute(msg.data);
      }
    };
  }
}