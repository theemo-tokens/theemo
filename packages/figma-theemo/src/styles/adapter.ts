export default interface StyleAdapter {
  collection: 'paint' | 'effect';

  read();
  load();
  save();
  compile();

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

  // commands
  updateStyle();
}