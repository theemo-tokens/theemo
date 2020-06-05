import { COLLECTION, StyleTypes } from './types';

export default interface StyleAdapter {
  collection: COLLECTION;

  read();
  load();
  save();
  compile();

  getStyle(): BaseStyle | undefined;
  getPool(): BaseStyle[];
  getType(): StyleTypes;

  // checks
  needsUnlink(): boolean;
  hasReference(): boolean;
  isContextual(): boolean;

  // UI commands
  linkOrigin(name: string);

  migrateOrigin(target: string);

  unlinkOrigin();

  createReference(from: string, name: string);

  unlinkReference();

  saveTransforms(transforms: object);

  // commands
  updateStyle();

  createContextFree();
}