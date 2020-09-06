import env from '../options/env.js';
import mode from '../options/mode.js';

export default {
  command: 'dev',
  describe: 'Starts development mode',
  builder: { env, mode }
};
