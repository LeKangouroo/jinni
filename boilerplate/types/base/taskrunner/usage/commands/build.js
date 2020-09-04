import env from '../options/env.js';
import mode from '../options/mode.js';

export default {
  command: 'build',
  describe: 'Builds project distributable source code',
  builder: { env, mode }
};
