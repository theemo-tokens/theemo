import ContextManager from './context-manager';
import NodeRegistry from './node-registry';
import ReferencesManager from './references-manager';
import SettingsManager from './settings-manager';
import Emitter from './emitter';
import Commander from './commander';

export default class Container {
  emitter = new Emitter();
  commander = new Commander(this);
  settings = new SettingsManager();
  registry = new NodeRegistry(this);
  references = new ReferencesManager(this);
  contexts = new ContextManager(this);
}