import { COLLECTION } from './types';

export default interface StyleAdapter {
  collection: COLLECTION;

  read();
  load();
  save();
  compile();

  getStyle(): BaseStyle | undefined;

  // checks
  needsUnlink(): boolean;
  hasReference(): boolean;

  getPool(): BaseStyle[];

  // UI commands
  linkOrigin(name: string);

  migrateOrigin(target: string);

  unlinkOrigin();

  createReference(from: string, name: string);

  unlinkReference();

  saveTransforms(transforms: object);

  // commands
  updateStyle();
}