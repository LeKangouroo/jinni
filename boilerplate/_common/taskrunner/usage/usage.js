import api from './commands/api';
import build from './commands/build';
import clean from './commands/clean';
import dev from './commands/dev';
import instrumentedTests from "./commands/instrumented-tests";
import unitTests from "./commands/unit-tests";
import yargs from 'yargs';
import zip from './commands/zip';

const usage = yargs
  .locale('en')
  .usage('Usage: $0 <command> [options]')
  .command(api)
  .command(build)
  .command(clean)
  .command(dev)
  .command(instrumentedTests)
  .command(unitTests)
  .command(zip)
  .alias('help', 'h')
  .help();

export default usage;
