export default interface StyleAdapter {
  read();
  load();
  save();
  compile();

  // checks
  needsUnlink(): boolean;
  hasReference(): boolean;

  // UI commands
  linkOrigin(name: string);

  migrateOrigin(target: string);

  createReference(from: string, name: string);

  unlinkReference();

  // commands
  updateStyle();
}