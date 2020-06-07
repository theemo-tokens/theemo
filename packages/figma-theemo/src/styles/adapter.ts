import { COLLECTION, StyleTypes } from './types';

export default interface StyleAdapter {
  type: StyleTypes;
  collection: COLLECTION;

  local?: BaseStyle;
  from?: BaseStyle;
  to?: BaseStyle;

  /**
   * If the style is contextual, this is the reference to the context free
   * style
   */
  context?: BaseStyle;

  read();
  load();
  save();
  compile();

  getPool(): BaseStyle[];

  // checks
  needsUnlink(): boolean;
  hasReference(): boolean;
  isContextual(context: string): boolean;

  // UI commands
  linkOrigin(name: string);
  migrateOrigin(target: string);
  unlinkOrigin();
  createReference(fromId: string, name: string);
  unlinkReference();
  saveTransforms(transforms: object);

  // commands
  updateStyle();
  // createContextFree();
  // createContextFreeInActiveContext();

  applyForContext(context);
}