import LexerConfig from './lexer/config';
import ReaderConfig from './reader/config';
import WriterConfig from './writer/config';

export default interface SyncConfig {
  reader: ReaderConfig;
  lexer: LexerConfig;
  writer: WriterConfig;
}
