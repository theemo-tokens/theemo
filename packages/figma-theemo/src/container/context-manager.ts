import { copyEffectStyle, copyGridStyle, copyPaintStyle, copyTextStyle } from '../styles/utils';
import Container from './index';

export default class ContextManager { 
  private settings;

  constructor(container: Container) {
    this.settings = container.settings;
  }

  get prefix() {
    return this.settings.get('context.prefix');
  }

  get context() {
    return this.settings.get('context');
  }

  get contexts() {
    return this.settings.get('contexts');
  }

  nameBelongsToContext(name: string, context: string) {
    return this.getContextFromName(name) === context;
  }

  nameBelongsToActiveContext(name: string) {
    return this.nameBelongsToContext(name, this.context);
  }

  isContextualName(name: string) {
    return this.getContextFromName(name) !== undefined;
  }

  getContextFromName(name: string) {
    if (!name.includes(this.prefix)) {
      return;
    }
  
    const ctx = name.substr(name.indexOf(this.prefix) + this.prefix.length);
    // @ts-ignore
    if (this.contexts.includes(ctx)) {
      return ctx;
    }
  }
}