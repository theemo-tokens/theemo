import { Tools } from '../tools/tool';

/**
 * The build config for theemo.
 *
 * Theemo tries to auto-detect your environment and choose the right tool. As
 * such, you can omit the config here.
 * Only if the environment cannot reliably be detected, theemo will let you
 * know and kindly asks you to provide a configuration.
 */
export default interface BuildConfig {
  tool: Tools;
}
