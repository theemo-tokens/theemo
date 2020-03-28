export default interface Referencer {
  setup(): Promise<void>;

  /**
   * Find reference for given name and style
   *
   * @param name
   * @param type
   */
  find(name: string, type: string): string | undefined;
}
