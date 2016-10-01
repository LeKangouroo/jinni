var yargs = require('yargs');

var usage = yargs.usage('Usage: $0 [options] <command> [<args>]')
  .strict()
  .command('init', 'Creates a new project')
  .demand(1)
  .help('h')
  .alias('h', 'help');

module.exports = usage;
