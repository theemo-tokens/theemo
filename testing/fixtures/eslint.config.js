import { configs } from '@gossi/config-eslint';

export default configs.node(import.meta.dirname);

// module.exports = {
//   ...config,
//   overrides: [
//     ...config.overrides,
//     {
//       files: ['**/*.ts'],
//       rules: {
//         'n/no-missing-import': 0
//       }
//     }
//   ]
// };
