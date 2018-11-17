import build from './commands/build';
import clean from './commands/clean';
import dev from './commands/dev';
import yargs from 'yargs';
import zip from './commands/zip';

export default yargs
  .locale('en')
  .usage('Usage: $0 <command> [options]')
  .command(build)
  .command(clean)
  .command(dev)
  .command(zip);
