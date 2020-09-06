import yargs from 'yargs';
import build from './commands/build.js';
import clean from './commands/clean.js';
import dev from './commands/dev.js';
import zip from './commands/zip.js';

export default yargs
  .locale('en')
  .usage('Usage: $0 <command> [options]')
  .command(build)
  .command(clean)
  .command(dev)
  .command(zip);
