import TokenCollection from '../../token-collection';

export default interface ReaderAdapter {
  read(): Promise<TokenCollection>;
}
