const init = require('./init'),
      options = require('./options/options'),
      yargs = require('yargs');

const usage = yargs.usage('Usage: $0 [options] <command> [<args>]')
  .strict()
  .recommendCommands()
  .command(init)
  .help('h')
  .alias('h', 'help')
  .option('v', options.version);

module.exports = usage;
