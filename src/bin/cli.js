#!/usr/bin/env node
const usage = require('../usages/default');
const argv = usage.argv;
const cmd = (typeof argv._[0] === 'string') ? argv._[0] : null;
const pkg = require('../../package.json');

if (argv.version)
{
  console.log(`${pkg.name} v${pkg.version}`);
  process.exit(0);
}
if (!cmd)
{
  usage.showHelp();
  process.exit(1);
}
require(`../scripts/${cmd}`);
