import SyncConfig from './sync/config';
import GenerateConfig from './generate/config';

export default interface TheemoConfig {
  sync: SyncConfig;
  generate?: GenerateConfig;
}
