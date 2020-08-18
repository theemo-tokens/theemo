import SyncConfig from './sync/config';
import GenerateConfig from './generate/config';
import BuildConfig from './build/config';

export default interface TheemoConfig {
  sync?: SyncConfig;
  build?: BuildConfig;
  generate?: GenerateConfig;
}
