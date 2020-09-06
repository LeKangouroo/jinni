export default {
  alias: 'e',
  choices: ['development', 'preproduction', 'production'],
  default: 'development',
  describe: 'Sets current environment.',
  type: 'string'
};
