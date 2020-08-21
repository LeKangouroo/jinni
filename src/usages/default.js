import init from "./init.js";
import options from "./options/options.js";
import yargs from "yargs";

export default yargs.usage('Usage: $0 [options] <command> [<args>]')
  .strict()
  .recommendCommands()
  .command(init)
  .help('h')
  .alias('h', 'help')
  .option('v', options.version);
