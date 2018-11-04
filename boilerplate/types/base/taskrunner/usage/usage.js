import build from './commands/build';
import clean from './commands/clean';
import dev from './commands/dev';
import fs from 'fs';
import yargs from 'yargs';
import zip from './commands/zip';

/*
 * Optional commands
 */
const API_COMMAND_PATH = './commands/api';

/*
 * Base configuration
 */
const usage = yargs
  .locale('en')
  .usage('Usage: $0 <command> [options]')
  .command(build)
  .command(clean)
  .command(dev)
  .command(zip)
  .alias('help', 'h')
  .help();

/*
 * REST API feature configuration
 */
if (fs.existsSync(API_COMMAND_PATH))
{
  usage.command(require(API_COMMAND_PATH));
}

export default usage;
