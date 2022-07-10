import ContextManager from './context-manager';
import NodeRegistry from './node-registry';
import ReferencesManager from './references-manager';
import SettingsManager from './settings-manager';
import Emitter from './emitter';
import Commander from './commander';

export default class Container {
  emitter: Emitter;
  commander: Commander;
  settings: SettingsManager;
  registry: NodeRegistry;
  references: ReferencesManager;
  contexts: ContextManager;

  constructor(containers = {}) {
    for (const [key, value] of Object.entries(containers)) {
      this[key] = value;
    }
    this.emitter = this.emitter ?? new Emitter();
    this.commander = this.commander ?? new Commander(this);
    this.settings = this.settings ?? new SettingsManager();
    this.registry = this.registry ?? new NodeRegistry(this);
    this.references = this.references ?? new ReferencesManager(this);
    this.contexts = this.contexts ?? new ContextManager(this);
  }
}